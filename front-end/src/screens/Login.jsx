import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';

// navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {useNavigation} from '@react-navigation/native';
import RoundedButton from '../../components/RoundedButton';
import {Snackbar} from 'react-native-paper';
import AuthContext from '../context/authContext';
import axios from 'axios';
import SuccessToast from 'react-native-toast-message';

const Login = ({navigation}) => {
  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [emailValidationError, setEmailValidationError] = useState('');
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

  const handleLogIn = async () => {
    if (email == '') {
      setErrorEmail('Email is required');
    } else {
      setErrorEmail('');
      if (isValidEmail) {
        setEmailValidationError('');
      } else {
        setEmailValidationError('Provided Email is not valid');
      }
    }

    if (password == '') {
      setErrorPassword('Password is required');
    } else {
      setErrorPassword('');
    }

    if (email !== '' && password !== '' && isValidEmail !== false) {
      // userLogin({username, password});
      console.log('ok');
      authContext.signIn({email, password});
      setIsLoading(false);
      console.log('its mee', authContext);
    } else {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please fill the details!', ToastAndroid.SHORT);
        setIsLoading(false);
      } else {
        Alert.alert('Please fill the details!');
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg-1.jpg')}
        resizeMode="cover"
        style={styles.image}>
        {/* {authContext.isError == true ? (
          <View>
            {showToast()}
            <Text style={{color: 'red'}}>
              Please check your email and password
            </Text>
          </View>
        ) : null} */}

        {isLoading == true ? (
          <View>
            <Text style={{color: 'red'}}>Loading...</Text>
          </View>
        ) : null}

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: 5,
            justifyContent: 'center',
          }}>
          <Image
            style={{height: 120, width: 113, marginBottom: 30, marginTop: 50}}
            source={require('../../assets/images/user-logo.png')}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="rgba(19, 176, 100, 0.55)"
              placeholder="Enter your email"
              onChangeText={text => setEmail(text)}
            />
            <Text style={styles.errorText}>
              {' '}
              {errorEmail
                ? errorEmail
                : emailValidationError
                ? emailValidationError
                : null}
            </Text>
          </View>

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

          <Text style={{color: 'black', fontWeight: '600', marginBottom: 10}}>
            Don’t you have an account?{' '}
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{fontWeight: '900'}}>
              Sign Up
            </Text>
          </Text>
          <RoundedButton onPress={handleLogIn} text="Log in" />
          <Text onPress={() => navigation.navigate('ResetPassword')}>
            Reset Paaword
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'column', // Horizontal layout
    alignItems: 'flex-start', // Align items at the start (left)
  },
  errorText: {
    marginLeft: 17,
    marginBottom: 5,
    paddingTop: 0,
    fontSize: 11,
    color: 'maroon',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  smallText: {
    color: '#000000',
  },
  input: {
    color: 'green',
    width: 325,
    height: 40,
    // marginBottom: 15,
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
