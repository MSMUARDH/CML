import {
  ImageBackground,
  Switch,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Button,
  DevSettings,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import {TextInput} from 'react-native-paper';

import DocumentPicker from 'react-native-document-picker';
import Geolocation from '@react-native-community/geolocation';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import AuthContext from '../context/authContext';
import {Platform} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import config from '../../config';
import {useTheme} from '../../components/context/ThemeContext';

const ManualUploadScreen = ({navigation}) => {
  const authcontext = useContext(AuthContext);
  const {theme, updateTheme, background, updateBackground} = useTheme();

  console.log('bg from context (upload)', background);

  const [pickedImage, setPickedImage] = useState('');
  const [uri, setUri] = useState('');
  const [location, setLocation] = useState('');
  const [locationName, setLocationName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // !
  const [photo, setPhoto] = React.useState(null);

  // ! Refresh
  const [refreshing, setRefreshing] = useState(false);

  // Function to simulate a data refresh
  const onRefresh = () => {
    setRefreshing(true);
    DevSettings.reload();

    // Perform data refresh or any necessary operations here
    // You can replace the setTimeout with an API request, for example.
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    // Request permissions and configure the library
    Geolocation.setRNConfiguration({
      // skipPermissionRequests: true,
      authorizationLevel: 'always',
    });
  }, []);

  useEffect(() => {
    // Obtain the location details using the library
    Geolocation.getCurrentPosition(
      position => {
        setLoading(true);
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        // console.log(latitude);
        // console.log(longitude);
        setLoading(false);
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
    setLoading(true);
    await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=c9738b5ab1d74c1c9ea978e0bc0cd3b8`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // console.log(result.features[0]);r
        setLocationName(`${result.features[0].properties.city}`);
        setLoading(false);
        // setLocationName(
        //   `${result.features[0].properties.country},${result.features[0].properties.state},${result.features[0].properties.county},${result.features[0].properties.street},${result.features[0].properties.city}`,
        // );
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

  const createFormData = (photo, body = {}) => {
    const data = new FormData();

    // console.log('file name', photo.assets[0].uri);

    photo.assets.map(item => {
      // console.log(item);
      data.append('photo', {
        name: item.fileName,
        type: item.type,
        uri: Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.uri,
      });
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    // console.log('from form data', data._parts);

    return data;
  };

  // ?? //

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true, selectionLimit: 5}, response => {
      // console.log(response);
      if (response && !response.didCancel) {
        console.log(response);
        setPhoto(response);
        setPickedImage('...Image selected');
      }

      if (response.didCancel) {
        setPickedImage('');
      }
    });
  };

  const handleUploadPhoto = () => {
    console.log('photo to upload');
    createFormData(photo);
    console.log('from form inside upload', createFormData(photo)._parts);

    fetch(`${config.baseURL}/api/location/add-post`, {
      method: 'POST',
      body: createFormData(photo, {
        name: locationName,
        imageDescription: 'NEW Image Description 1',
        description: 'NEWWW description',
      }),

      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authcontext.userToken}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });
      // console.log(doc[0].uri);
      console.log(doc);

      setUri(doc[0].uri);
      setPickedImage('...Images Selected');
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User Cancelled the upload', error);
      } else {
        console.log(error);
      }
    }
  };

  const handleSubmit = () => {
    const postImageDetails = async imageUri => {
      const response = await axios.post(
        `${config.baseURL}/api/location/add-post`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authcontext.userToken}`,
          },
        },
      );

      if (response.status == 200) {
        setPickedImage(null);
      }
    };

    postImageDetails(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        // source={require('../../assets/images/bg-1.jpg')}
        source={{uri: background.backgroundImage}}
        resizeMode="cover"
        style={styles.bgImage}>
        {loading && <ActivityIndicator style={{marginTop: 40}} />}

        <View style={styles.centeredView}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, {color: `${theme.textColor}`}]}>
                Select photo to upload
              </Text>

              <TouchableOpacity
                style={styles.uploadcontainer}
                onPress={handleChoosePhoto}>
                <Entypo name="images" size={35} color="#049A5B" />

                {pickedImage ? (
                  <Text style={{color: 'red'}}>{pickedImage}</Text>
                ) : (
                  <Text style={{color: 'black'}}>Upload a file</Text>
                )}
              </TouchableOpacity>

              <View style={styles.inputContainer}>
                <TextInput
                  style={{borderColor: 'green', borderWidth: 1, width: 200}}
                  placeholderTextColor="#5f5555"
                  placeholder={
                    locationName ? `${locationName}` : 'Please Scroll Down'
                  }
                  disabled
                  value={locationName ? `${locationName}` : ''}
                />
              </View>
              {/* //!!! */}
              <Text style={{color: 'red'}}>
                {error ? 'Please turn on the location' : ''}
              </Text>

              <View style={{marginTop: 20, width: 200}}>
                <Button
                  onPress={handleUploadPhoto}
                  title="Upload"
                  color={`${theme.buttonColor}`}
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ManualUploadScreen;

const styles = StyleSheet.create({
  inputContainer: {
    // position: 'relative',
    // right: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#0C747A',
    textAlign: 'center',
    fontSize: 15,
  },
  container: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bgImage: {
    flex: 1,
  },

  uploadcontainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 200,
    borderStyle: 'dashed',
    backgroundColor: 'white',
    marginBottom: 10,
    borderColor: 'rgba(0, 0, 0, 0.59)',
    borderWidth: 2,
  },

  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
  modalText: {
    color: 'green',
    fontWeight: '900',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 17,
  },
});
