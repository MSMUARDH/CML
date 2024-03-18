import {Text, View} from 'react-native';

// import Location from "react-native/Location";

import React, {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {ActivityIndicator} from 'react-native-paper';

function CommunityGeolocation() {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Request permissions and configure the library
    Geolocation.setRNConfiguration({
      // skipPermissionRequests: true,
      authorizationLevel: 'always',
    });
  }, []);

  // 7.056931666666666 80.570735

  useEffect(() => {
    // Obtain the location details using the library
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        console.log(latitude);
        console.log(longitude);
      },
      error => {
        setError(error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const getLocationDetails = async () => {
    var requestOptions = {
      method: 'GET',
    };

    await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=c9738b5ab1d74c1c9ea978e0bc0cd3b8`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.features[0]);
        setLocationName(
          `${result.features[0].properties.country},${result.features[0].properties.state},${result.features[0].properties.county},${result.features[0].properties.street},${result.features[0].properties.city}`,
        );
      })
      .catch(error => {
        setError(error.message);
      });
  };

  useEffect(() => {
    if (location) {
      getLocationDetails();
    }
  }, [location]);

  // const showAlert = error =>
  //   Alert.alert('Please enable the location and refresh', `${error}`, [
  //     {
  //       text: 'Cancel',
  //       onPress: () => Alert.alert('Cancel Pressed'),
  //       style: 'cancel',
  //     },
  //   ]);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
      }}>
      <View>
        {locationName ? (
          <View>
            <Text style={{color: 'red'}}>Location Name: {locationName}</Text>
          </View>
        ) : error != '' ? (
          <Text>{error}</Text>
        ) : !locationName ? (
          <Text style={{color: 'red', marginTop: 100}}>
            <ActivityIndicator size="large" />
          </Text>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    </View>
  );
}

export default CommunityGeolocation;
