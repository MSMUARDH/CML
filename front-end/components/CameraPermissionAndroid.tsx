import React, {useEffect, useState} from 'react';
import {
  Button,
  PermissionsAndroid,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';

const CameraPermissionAndroid = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    if (!isPermissionGranted) {
      requestCameraPermission();
    }
    console.log(isPermissionGranted);
  }, [isPermissionGranted]);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        // {
        //   title: 'Cool Photo App Camera Permission',
        //   message:
        //     'Cool Photo App needs access to your camera ' +
        //     'so you can take awesome pictures.',
        //   buttonNeutral: 'Ask Me Later',
        //   buttonNegative: 'Cancel',
        //   buttonPositive: 'OK',
        // },
      );

      console.log(PermissionsAndroid.RESULTS);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsPermissionGranted(true);
        console.log('You can use the camera');
      } else {
        setIsPermissionGranted(false);
        console.log('you cant use the camera');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.item}>Try permissions</Text>
      <Button title="request permissions" onPress={requestCameraPermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  item: {
    color: 'black',
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CameraPermissionAndroid;



// const styles = StyleSheet.create({})

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const CameraPermissionAndroid = () => {
//   return (
//     <View>
//       <Text>CameraPermissionAndroid</Text>
//     </View>
//   )
// }

// export default CameraPermissionAndroid

// const styles = StyleSheet.create({})
