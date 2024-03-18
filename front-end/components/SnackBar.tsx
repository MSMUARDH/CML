import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Snackbar} from 'react-native-paper';

const SnackBar = ({}) => {
  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
  return (
    <>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Cancel',
          onPress: () => {
            setVisible(false);
          },
        }}>
        {}
      </Snackbar>
    </>
  );
};

export default SnackBar;

const styles = StyleSheet.create({});
