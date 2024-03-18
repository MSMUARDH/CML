import {
  Button,
  PermissionsAndroid,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  DevSettings,
  RefreshControl,
  View,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommunityGeolocation from './CommunityGeolocation';

const HomeTest = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [error, setError] = useState('');

  const onRefresh = () => {
    DevSettings.reload();
  };

  useEffect(() => {
    if (!isPermissionGranted) {
      requestLocationPermission();
    }
  }, [isPermissionGranted]);

  console.log('permission granted', isPermissionGranted);

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

      console.log('granted', granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsPermissionGranted(true);
        console.log('You can use the location');
      } else {
        setIsPermissionGranted(false);
        console.log("you can't use the location");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} />}>
      <View>{isPermissionGranted && <CommunityGeolocation />}</View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        {!isPermissionGranted && (
          <Text style={{color: 'red'}}>enable the location permission</Text>
        )}
      </View>
      {error && <Text style={{color: 'red'}}>{error}</Text>}
    </ScrollView>
  );
};

export default HomeTest;

const styles = StyleSheet.create({});
