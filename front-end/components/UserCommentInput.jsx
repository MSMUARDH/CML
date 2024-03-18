import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';

const UserCommentInput = () => {
  return (
    <TextInput
      style={styles.input}
      //   onChangeText={}
      placeholder="useless placeholder"
      keyboardType="numeric"
    />
  );
};

export default UserCommentInput;

const styles = StyleSheet.create({
  input: {
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
