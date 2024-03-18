import React, {useContext} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import RegisterScreen from './screens/RegisterScreen';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import ForgetPasswordScreen from './screens/ForgetPasswordScreen';
import UserScreen from './screens/UserScreen';
import AdminScreen from './screens/Admin/AdminScreen';
import LocationListScreen from './screens/Admin/LocationListScreen';
import SettingScreen from './screens/Admin/SettingScreen';
import CommunityGeolocation from './screens/CommunityGeolocation';
import CameraTest from './screens/CameraTest';
import HomeTest from './screens/HomeTest';
import RefreshTest from './screens/RefreshTest';
import nonAdminProfileScreen from './screens/NonAdminProfileScreen';
import ExplorerScreen from './screens/ExplorerScreen';
import ManualUploadScreen from './screens/ManualUploadScreen';

// import SplashScreen from './screens/SplashScreen';
import {AuthProvider} from './context/authContext';
import AuthContext from './context/authContext';


import {SettingProvider} from './context/SettingContext';

import BottomNavigator from './navigator/BottomNavigator';
import {BackgroundProvider} from '../src/context/backgroundContext';
import {ThemeProvider} from '../components/context/ThemeContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const authContext = useContext(AuthContext);
  // const authContext = useContext(AuthContext);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BackgroundProvider>
          <SettingProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{title: 'Login Screen', headerTransparent: true}}
                />
                <Stack.Screen
                  name="Register"
                  component={RegisterScreen}
                  options={{title: 'Register Screen', headerTransparent: true}}
                />
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{title: 'Home Screen', headerTransparent: true}}
                />
                <Stack.Screen
                  name="ResetPassword"
                  component={ForgetPasswordScreen}
                  options={{title: 'Reset Password', headerTransparent: true}}
                />

                <Stack.Screen
                  name="UserScreen"
                  component={BottomNavigator}
                  options={{title: 'User Screen', headerTransparent: true}}
                />
                <Stack.Screen
                  name="AdminScreen"
                  component={AdminScreen}
                  options={{title: 'Admin Screen', headerTransparent: true}}
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

                <Stack.Screen
                  name="CommunityGeolocation"
                  component={CommunityGeolocation}
                  options={{title: 'Get Location', headerTransparent: true}}
                />

                <Stack.Screen
                  name="CameraTest"
                  component={CameraTest}
                  options={{title: 'Get Camera', headerTransparent: true}}
                />

                <Stack.Screen
                  name="HomeTest"
                  component={HomeTest}
                  options={{title: 'Home Test', headerTransparent: true}}
                />

                <Stack.Screen
                  name="RefreshTest"
                  component={RefreshTest}
                  options={{title: 'Refresh Test', headerTransparent: true}}
                />

                <Stack.Screen
                  name="nonAdminProfileScreen"
                  component={nonAdminProfileScreen}
                  options={{title: 'User Profile', headerTransparent: true}}
                />

                <Stack.Screen
                  name="ExplorerScreen"
                  component={ExplorerScreen}
                  options={{title: 'Explorer Screen', headerTransparent: true}}
                />

                <Stack.Screen
                  name="ManualUploadScreen"
                  component={ManualUploadScreen}
                  options={{title: 'Upload Screen', headerTransparent: true}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SettingProvider>
        </BackgroundProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
