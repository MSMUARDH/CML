// AuthContext.js
import axios from 'axios';
import React, {createContext, useReducer, useEffect, useMemo} from 'react';
import * as Keychain from 'react-native-keychain';
import App from '../App';
import Login from '../screens/Login';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AdminScreen from '../screens/Admin/AdminScreen';
import SplashScreen from '../screens/SplashScreen';
import UserScreen from '../screens/UserScreen';
import LocationListScreen from '../screens/Admin/LocationListScreen';
import SettingScreen from '../screens/Admin/SettingScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import NonAdminProfileScreen from '../screens/NonAdminProfileScreen';
import BottomNavigator from '../navigator/BottomNavigator';
import config from '../../config';

// Define your initial state
const initialState = {
  //   user: null,
  //   isAuthenticated: false,
  //   loading: true,
  // userId: null,
  isLoading: true,
  isSignout: false,
  userToken: null,
  isError: false,
  isAdmin: null,
};

const AuthContext = createContext();

// Create the reducer function
const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      // console.log('action', action);
      return {
        ...prevState,
        // userId:action.id,
        isSignout: false,
        userToken: action.token,
        isAdmin: action.isAdmin,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        // userId:null,
        isSignout: true,
        userToken: null,
        isAdmin: null,
      };
    case 'SET_ERROR':
      return {
        ...prevState,
        // userId:null,
        isError: true,
      };
  }
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Simulate checking if the user is already authenticated (e.g., from a token)
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        //! userToken = await SecureStore.getItemAsync('userToken');
        const credentials = await Keychain.getGenericPassword();
        // console.log(credentials);
        userToken = credentials ? credentials.password : null;

        // console.log('Token read from keychain from context:', userToken);
      } catch (e) {
        dispatch({
          type: 'SET_ERROR',
        });

        // Restoring token failed
        // console.log('this is error msg from context', e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
      if (state.userToken !== null) {
        await Keychain.setGenericPassword('authenticationToken', userToken);
      }
    };

    bootstrapAsync();
    state.isLoading = false;
  }, []);

  // Define the context value
  const contextValue = {
    // user: state.user,
    // isAuthenticated: state.isAuthenticated,
    // loading: state.loading,
    // login: userData => dispatch({type: 'SET_USER', payload: userData}),
    userId: state.userId,
    isLoading: state.isLoading,
    // isSignout: state.isSignout,
    userToken: state.userToken,
    isError: state.isError,
    isAdmin: state.isAdmin,
    // isAdmin:state.
    signIn: async data => {
      // In a production app, we need to send some data (usually username, password) to server and get a token
      // We will also need to handle errors if sign in failed
      // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
      // In the example, we'll use a dummy token
      state.isLoading = true;
      try {
        const response = await axios.post(`${config.baseURL}/api/users/login`, {
          email: data.email,
          password: data.password,
        });

        // console.log(
        //   'reponse from auth context is addminr',
        //   response.data.isAdmin,
        // );

        if (response.status == 200) {
          dispatch({
            type: 'SIGN_IN',
            token: response.data.token,
            isAdmin: response.data.isAdmin,
            // id: response.data.token,
          });
          await Keychain.setGenericPassword(
            'authenticationToken',
            response.data.token,
          );
          state.isLoading = false;
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: 'SET_ERROR',
          // id: response.data.token,
        });
        state.isLoading = false;
      }
    },
    signOut: async () => {
      dispatch({type: 'SIGN_OUT'});
      await Keychain.resetGenericPassword();
    },
  };

  // Provide the context value to the components
  const Stack = createNativeStackNavigator();
  // const role = 'user';
  return (
    // <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    <AuthContext.Provider value={contextValue}>
      <NavigationContainer initialRouteName="Home">
        <Stack.Navigator>
          {/* state.userToken == null */}
          {console.log(state.userToken)}
          {state.userToken == null && !state.isAdmin ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: 'Home Screen', headerTransparent: true}}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{title: 'Register Screen', headerTransparent: true}}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{title: 'Login Screen', headerTransparent: true}}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ForgetPasswordScreen}
                options={{title: 'Reset Password', headerTransparent: true}}
              />
            </>
          ) : state.isAdmin ? (
            <>
              <Stack.Screen
                options={{title: 'Admin', headerTransparent: true}}
                name="Home"
                component={AdminScreen}
              />
              <Stack.Screen
                name="LocationListScreen"
                component={LocationListScreen}
                options={{
                  title: 'Location Screen',
                  headerTransparent: true,
                }}
              />
              <Stack.Screen
                name="SettingScreen"
                component={SettingScreen}
                options={{headerTransparent: true}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{title: 'User', headerTransparent: true}}
                name="UserScreen"
                component={BottomNavigator}
              />
              {/* <Stack.Screen
                name="nonAdminProfileScreen"
                component={NonAdminProfileScreen}
                options={{title: 'User Profile', headerTransparent: true}}
              />

              <Stack.Screen
                name="LocationListScreen"
                component={LocationListScreen}
                options={{
                  title: 'Location Screen',
                  headerTransparent: true,
                }}
              /> */}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AuthContext;

// const AuthProvider = ({children}) => {
//   const [state, dispatch] = useReducer(
//     (prevState, action) => {
//       switch (action.type) {
//         case 'RESTORE_TOKEN':
//           return {
//             ...prevState,
//             userToken: action.token,
//             isLoading: false,
//           };
//         case 'SIGN_IN':
//           return {
//             ...prevState,
//             isSignout: false,
//             userToken: action.token,
//           };
//         case 'SIGN_OUT':
//           return {
//             ...prevState,
//             isSignout: true,
//             userToken: null,
//           };
//       }
//     },
//     {
//       isLoading: true,
//       isSignout: false,
//       userToken: null,
//     },
//   );

//   useEffect(() => {
//     const bootstrapAsync = async () => {
//       let userToken;

//       try {
//         // Restore token stored in `SecureStore` or any other encrypted storage
//         // userToken = await SecureStore.getItemAsync('userToken');
//       } catch (e) {
//         // Restoring token failed
//       }

//       dispatch({type: 'RESTORE_TOKEN', token: userToken});
//     };

//     bootstrapAsync();
//   }, []);

//   const authContext = useMemo(
//     () => ({
//       signIn: async data => {
//         // In a production app, send some data (usually username, password) to the server and get a token
//         dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
//       },
//       signOut: () => dispatch({type: 'SIGN_OUT'}),
//       signUp: async data => {
//         // In a production app, send user data to the server and get a token
//         dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
//       },
//     }),
//     [],
//   );

//   return (
//     <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
//   );
// };

// export {AuthContext, AuthProvider};

// !2nd old code
// import tourAPI from '../api/api';
// import CreateDataContext from './CreateDataContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AuthReducer = (state, action) => {
//   switch (action.type) {
//     case 'login':
//       return {...state, LoginData: action.payload};
//     case 'login_status':
//       return {...state, LoginStatus: action.payload};
//     case 'clear_login_status':
//       return {...state, LoginStatus: ''};
//     default:
//       return state;
//   }
// };

// const config = {
//   headers: {
//     'Content-Type': 'application/json; charset=utf-8',
//   },
// };

// const userLogin =
//   dispatch =>
//   async ({username, password}) => {
//     var qs = require('qs');
//     var data = qs.stringify({
//       UserName: username,
//       Password: password,
//       // Grant_type: 'password',
//     });

//     try {
//       const response = await tourAPI.post('/Token', data, config);
//       console.log('response status', response.status);
//       dispatch({type: 'login_status', payload: response.status});
//       dispatch({type: 'login', payload: response.data.access_token});
//     } catch (err) {
//       console.log(err.message);
//       dispatch({type: 'login_status', payload: 400});
//     }
//   };

// const clearLoginStatus = dispatch => () => {
//   dispatch({type: 'clear_login_status'});
// };

// const userLogout = dispatch => async () => {
//   await AsyncStorage.removeItem('token');
//   //navigate('Auth');
// };

// export const {Provider, Context} = CreateDataContext(
//   AuthReducer,
//   {
//     userLogin,
//     clearLoginStatus,
//     userLogout,
//   },
//   {
//     LoginData: [],
//     LoginStatus: '',
//     errorMessage: '',
//   },
// );

// !old code
// import React, {createContext, useState} from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [isLoading, setIsloading] = useState(true);
//   const [userToken, setUserToken] = useState(null);

//   const login = () => {
//     setUserToken('absgdhhyeirkfl1wer22r1ww');
//     setIsloading(false);
//   };

//   const logout = () => {
//     setUserToken(null);
//     setIsloading(false);
//   };

//   return (
//     <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
