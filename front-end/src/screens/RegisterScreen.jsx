import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import RoundedButton from '../../components/RoundedButton';

// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, Snackbar} from 'react-native-paper';
import axios from 'axios';
import SuccessToast from 'react-native-toast-message';

import config from '../../config';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorPasswordmatch, setErrorPasswordMatch] = useState('');

  const [emailValidationError, setEmailValidationError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Example usage:
  const isValidEmail = emailRegex.test(email); // Replace with the email you want to validate

  const showToast = () => {
    SuccessToast.show({
      type: 'success',
      text1: 'Registration Successful',
      visibilityTime: 3000, // 3 seconds
      autoHide: true,
    });
  };

  const postRegisterDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${config.baseURL}/api/users/register-user`,
        {
          name: `${firstName} ${lastName}`,
          email: email.toLocaleLowerCase(),
          password,
        },
      );

      if (response.status == 200) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        Alert.alert('Success Alert', 'Registration Successful ', [
          {text: 'OK', onPress: () => navigation.navigate('Login')},
        ]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    if (firstName == '') {
      setErrorFirstName('First Name is required');
    } else {
      setErrorFirstName('');
    }

    if (lastName == '') {
      setErrorLastName('Last Name is required');
    } else {
      setErrorLastName('');
    }

    if (email == '') {
      setErrorEmail('Provide a valid email');
    } else {
      setErrorEmail('');
      if (isValidEmail) {
        setEmailValidationError('');
      } else {
        setEmailValidationError('Provided Email is not valid');
      }
    }

    if (password == '') {
      setErrorPassword('Please enter a valid password');
    } else {
      setErrorPassword('');
    }
    if (confirmPassword == '') {
      setErrorConfirmPassword('Please enter a password');
    } else {
      setErrorConfirmPassword('');
    }

    if (password !== confirmPassword) {
      setErrorPasswordMatch('Conflicting password');
      setVisible(true);
    }

    if (
      firstName != '' &&
      lastName != '' &&
      email != '' &&
      emailValidationError == '' &&
      password != '' &&
      confirmPassword != '' &&
      password == confirmPassword
    ) {
      console.log('ready to go');
      postRegisterDetails();
    }
  };

  if (visible) {
    setTimeout(() => {
      setVisible(false);
    }, 5000); // Adjust the duration as needed
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg-1.jpg')}
        resizeMode="cover"
        style={styles.image}>
        <SuccessToast />
        <View style={{flex: 1, alignItems: 'center', marginTop: 50}}>
          {isLoading && <ActivityIndicator color="red" size="large" />}

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

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="rgba(19, 176, 100, 0.55)"
                placeholder="Enter your first name"
                onChangeText={text => setFirstName(text)}
                value={firstName}
              />
              <Text style={styles.errorText}>
                {errorFirstName && errorFirstName}
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="rgba(19, 176, 100, 0.55)"
                placeholder="Enter your  last name"
                onChangeText={text => setLastName(text)}
                value={lastName}
              />
              <Text style={styles.errorText}>{errorLastName}</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="rgba(19, 176, 100, 0.55)"
                placeholder="Enter your email"
                onChangeText={text => setEmail(text)}
                value={email}
              />
              <Text style={styles.errorText}>
                {errorEmail
                  ? errorEmail
                  : emailValidationError
                  ? emailValidationError
                  : null}
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="rgba(19, 176, 100, 0.55)"
                placeholder="Enter password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
              />
              <Text style={styles.errorText}>{errorPassword}</Text>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="rgba(19, 176, 100, 0.55)"
                placeholder="Confirm Password"
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={true}
              />

              <Text style={styles.errorText}>{errorConfirmPassword}</Text>
            </View>

            <Text style={styles.term}>
              By creating my account, I accept the General Terms of Use
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <RoundedButton onPress={handleSignup} text="Sign Up" />
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

            <Text style={{color: 'black'}}>
              Do you have account already?Login
            </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  term: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
    textDecorationLine: 'underline', // Add underline to text
  },
  inputContainer: {
    flexDirection: 'column', // Horizontal layout
    alignItems: 'flex-start', // Align items at the start (left)
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
    color: 'green',
    width: 325,
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

export default RegisterScreen;
