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

const LocationPermissionAndroid = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  useEffect(() => {
    if (!isPermissionGranted) {
      requestLocationPermission();
    }
    console.log(isPermissionGranted);
  }, [isPermissionGranted]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Clean My Land App location Permission',
          message:
            'Clean My Land App  needs access to your Location ' +
            'so you can take live location details.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsPermissionGranted(true);
        console.log('You can use the location');
      } else {
        setIsPermissionGranted(false);
        console.log('you cant use the location');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.item}>Try permissions</Text>
      <Button title="request permissions" onPress={requestLocationPermission} />
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

export default LocationPermissionAndroid;
