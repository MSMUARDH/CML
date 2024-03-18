import React, {useRef, useContext, useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

import {Alert} from 'react-native/Libraries/Alert/Alert';

import RoundedButton from '../../components/RoundedButton';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Snackbar} from 'react-native-paper';
import UserRating from '../../components/UserRating';
import axios from 'axios';
import AuthContext from '../context/authContext';
import config from '../../config';
import {useTheme} from '../../components/context/ThemeContext';

const NonAdminProfileScreen = ({route}) => {
  // useEffect(() => {
  //   getUserDetails();
  //   console.log(userId, otherData);
  // }, []);
  const {theme, updateTheme, background, updateBackground} = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorName, setErrorName] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorPasswordmatch, setErrorPasswordMatch] = useState('');
  const [errorCurrentPassword, setErrorCurrentPassword] = useState('');
  const [emailValidationError, setEmailValidationError] = useState('');

  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // const {userId, otherData} = route.params;
  const [userId, setUserId] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const authcontext = useContext(AuthContext);
  const getUserDetails = async () => {
    const response = await axios.get(`${config.baseURL}/api/users/get-user`, {
      headers: {
        Authorization: `Bearer ${authcontext.userToken}`,
      },
    });
    console.log('looking for id', response.data.userData);
    setFullName(response.data.userData.Name);
    setEmail(response.data.userData.Email);
    setUserId(response.data.userData._id);
  };

  useFocusEffect(
    React.useCallback(() => {
      // Your refresh logic goes here
      setErrorName('');
      setErrorConfirmPassword('');
      setErrorPasswordMatch('');
      setErrorCurrentPassword('');

      getUserDetails();

      // console.log('Screen is focused. Refreshing...');
    }, []),
  );

  useEffect(() => {
    getUserDetails();
  }, [refresh, setRefresh]);

  // Example usage:
  const isValidEmail = emailRegex.test(email); // Replace with the email you want to validate

  const handleUpdate = () => {
    if (fullName == '') {
      setErrorName('Name is required');
    } else {
      setErrorName('');
    }

    if (currentPassword == '') {
      setErrorCurrentPassword('Please enter a valid password');
    } else {
      setErrorCurrentPassword('');
    }

    // if (password == '') {
    //   setErrorPassword('Please enter a valid password');
    // } else {
    //   setErrorPassword('');
    // }

    if (
      // errorName == '' &&
      fullName != '' &&
      // currentPassword !== '' &&
      errorCurrentPassword == ''
    ) {
      console.log('ok to go....');

      try {
        const updateUserDetails = async () => {
          const resposne = await axios.put(
            `http://192.168.1.3:5000/api/users/update-user/${userId}`,
            {
              Name: fullName,
              Password: currentPassword,
            },
          );

          if (resposne.status == 200) {
            setRefresh(true);
            setCurrentPassword('');
          }
        };
        updateUserDetails();
      } catch (error) {
        // console.log(error);
      }
    }
  };

  // console.log('inside the update', firstName);

  if (visible) {
    setTimeout(() => {
      setVisible(false);
    }, 3000); // Adjust the duration as needed
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: background.backgroundImage}}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.allInputContainer}>
          <ScrollView>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Image
                style={{height: 110, width: 105}}
                source={require('../../assets/images/user-logo.png')}
              />
            </View>

            <UserRating />

            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="rgba(19, 176, 100, 0.55)"
                  placeholder="Enter your name"
                  onChangeText={text => setFullName(text)}
                  defaultValue={fullName}
                />
                <Text style={styles.errorText}>{errorName && errorName}</Text>
              </View>

              {/* <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="rgba(19, 176, 100, 0.55)"
                  placeholder="Enter your  last name"
                  onChangeText={text => setLastName(text)}
                />
                <Text style={styles.errorText}>{errorLastName}</Text>
              </View> */}

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor="rgba(19, 176, 100, 0.55)"
                  placeholder="Enter your email"
                  onChangeText={text => setEmail(text)}
                  defaultValue={email}
                  editable={false}
                />
                <Text style={styles.errorText}>
                  {/* {errorEmail
                    ? errorEmail
                    : emailValidationError
                    ? emailValidationError
                    : null} */}
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  placeholderTextColor="rgba(19, 176, 100, 0.55)"
                  placeholder="Enter your current password"
                  onChangeText={text => setCurrentPassword(text)}
                  value={currentPassword}
                />
                <Text style={styles.errorText}>{errorCurrentPassword}</Text>
              </View>
              {/* 
              <View style={styles.inputContainer}>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  placeholderTextColor="rgba(19, 176, 100, 0.55)"
                  placeholder="Enter password"
                  onChangeText={text => setPassword(text)}
                />
                <Text style={styles.errorText}>{errorPassword}</Text>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  secureTextEntry={true}
                  style={styles.input}
                  placeholderTextColor="rgba(19, 176, 100, 0.55)"
                  placeholder="Confirm Password"
                  onChangeText={text => setConfirmPassword(text)}
                />

                <Text style={styles.errorText}>{errorConfirmPassword}</Text>
              </View> */}

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <RoundedButton onPress={handleUpdate} text="Update" />
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {/* <RoundedButton onPress={() => } text="Reset" /> */}
              </View>
            </View>

            {errorPasswordmatch && (
              <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                  label: 'Cancel',
                  onPress: () => {
                    setVisible(false);
                  },
                }}>
                {errorPasswordmatch}
              </Snackbar>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  allInputContainer: {
    // flex: 1,
    backgroundColor: 'rgba(20, 111, 67, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 50,
    // backgroundColor: 'red',
    // borderRadius: 20,
    // // height: 500,
    // width: 400,
    marginHorizontal: 10,
    paddingVertical: 5,
  },

  inputContainer: {
    flexDirection: 'column', // Horizontal layout
    alignItems: 'center', // Align items at the start (left)
    // marginHorizontal: 10,
  },

  term: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    textDecorationLine: 'underline', // Add underline to text
  },

  errorText: {
    marginLeft: 10,
    marginBottom: 5,
    paddingTop: 0,
    fontSize: 11,
    color: 'maroon',
  },

  button: {
    backgroundColor: '#146F14',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 219,
    height: 49,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  input: {
    color: 'black',
    width: 300,
    height: 40,
    // marginBottom: 10,
    borderRadius: 50,
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 10,
    fontSize: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});

export default NonAdminProfileScreen;
