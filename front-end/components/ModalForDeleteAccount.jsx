import axios from 'axios';
import React, {useContext, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import AuthContext from '../src/context/authContext';

const ModalForDeleteAccount = ({deletemodalVisible, setdeleteModalVisible}) => {
  const authcontext = useContext(AuthContext);
  const deleteUser = async () => {
    const response = await axios.delete(
      `http://192.168.1.3:5000/api/users/remove-user`,
      {
        headers: {
          Authorization: `Bearer ${authcontext.userToken}`,
        },
      },
    );

    if (response.status == 200) {
      authcontext.signOut();
    }
  };

  const handleDelete = () => {
    console.log('delete clicked..');
    deleteUser();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deletemodalVisible}
        onRequestClose={() => {
          setdeleteModalVisible(!deletemodalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to delete account ?
            </Text>
            {/* //!Below for close modal */}

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonDelete, {marginRight: 40}]}
                onPress={() => {
                  handleDelete();
                  setdeleteModalVisible(!deletemodalVisible);
                }}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, {marginLeft: 40}]}
                onPress={() => {
                  setdeleteModalVisible(!deletemodalVisible);
                }}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonDelete: {
    backgroundColor: 'rgba(95, 22, 22, 1)',
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
    borderWidth: 0,
    margin: 20,
    backgroundColor: 'rgba(20, 111, 67, 0.69)',
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

export default ModalForDeleteAccount;
