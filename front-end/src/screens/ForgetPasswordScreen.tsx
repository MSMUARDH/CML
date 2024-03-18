import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

// navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import RoundedButton from '../../components/RoundedButton';
import {Snackbar} from 'react-native-paper';

const ForgetPasswordScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [emailValidationError, setEmailValidationError] = useState('');
  const [Isvalid, setIsValid] = useState(false);

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  // Example usage:
  const isValidEmail = emailRegex.test(email); // Replace with the email you want to validate

  const handleReset = () => {
    if (email == '') {
      setErrorEmail('Email is required');
    } else {
      setErrorEmail('');
      if (isValidEmail) {
        setIsValid(true);
        setVisible(true);
        setEmailValidationError('');
        setEmail('');
      } else {
        setEmailValidationError('Provided Email is not valid');
      }
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg-1.jpg')}
        resizeMode="cover"
        style={styles.image}>
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
              value={email}
              style={styles.input}
              placeholderTextColor="rgba(19, 176, 100, 0.55)"
              placeholder="Enter email here to reset password"
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
          <RoundedButton onPress={handleReset} text="Reset" />
          {Isvalid && (
            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: 'Cancel',
                onPress: () => {
                  setVisible(false);
                },
              }}>
              Recovery email has been sent
            </Snackbar>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default ForgetPasswordScreen;

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
