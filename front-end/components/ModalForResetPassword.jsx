import axios from 'axios';
import React, {useContext, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import config from '../config';
import AuthContext from '../src/context/authContext';

const ModalForResetPassword = ({
  passwordModalVisible,
  setpasswordModalVisible,
}) => {
  const authcontext = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = async () => {
    console.log('newPassword', newPassword);
    console.log('confirmPassword', confirmPassword);

    if (newPassword.trim() == '' || confirmPassword.trim() == '') {
      console.log('its empty...');
    }

    if (newPassword != confirmPassword) {
      console.log('password mismatch');
    } else if (
      newPassword.trim() != '' &&
      confirmPassword.trim() != '' &&
      newPassword == confirmPassword
    ) {
      const response = await axios.post(
        `${config.baseURL}/api/users/reset-password`,
        {newPassword: newPassword, confirmPassword: confirmPassword},
        {
          headers: {
            Authorization: `Bearer ${authcontext.userToken}`,
          },
        },
      );

      if (response.status == 200) {
        console.log(response);
        authcontext.signOut();
      }
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => {
          setpasswordModalVisible(!passwordModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Change Password</Text>
            {/* //!Below for close modal */}

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="rgba(19, 176, 100, 0.55)"
                placeholder="Enter new Password"
                onChangeText={text => setNewPassword(text)}
              />
              {/* <Text style={styles.errorText}>
                {' '}
                {errorEmail
                  ? errorEmail
                  : emailValidationError
                  ? emailValidationError
                  : null}
              </Text> */}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="rgba(19, 176, 100, 0.55)"
                placeholder="Confirm Password"
                onChangeText={text => setConfirmPassword(text)}
              />
              {/* <Text style={styles.errorText}>{errorPassword}</Text> */}
            </View>

            <Pressable
              style={[styles.button, styles.buttonDelete, {marginRight: 40}]}
              onPress={handleUpdate}

              // onPress={() => setpasswordModalVisible(!passwordModalVisible)}
            >
              <Text style={styles.textStyle}>Update</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonDelete: {
    backgroundColor: '#146F14',
    verticalAlign: 'middle',
  },
  inputContainer: {
    flexDirection: 'column', // Horizontal layout
    alignItems: 'flex-start', // Align items at the start (left)
    marginBottom: 20,
  },

  input: {
    color: 'rgba(19, 176, 100, 0.55)',
    width: 300,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalView: {
    display: 'flex',
    justifyContent: 'center',

    borderWidth: 0,
    margin: 20,
    backgroundColor: 'rgba(20, 111, 67, 0.9)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 100,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#145F6F',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'white',
    fontWeight: '900',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 17,
  },
});

export default ModalForResetPassword;
