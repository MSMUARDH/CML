import {
  ImageBackground,
  Switch,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';

import Entypo from 'react-native-vector-icons/Entypo';
import ModalForDeleteAccount from '../../../components/ModalForDeleteAccount';
import ModalForUpload from '../../../components/ModalForUpload';
import ModalForResetPassword from '../../../components/ModalForResetPassword';
import {Button, TextInput} from 'react-native-paper';
import RoundedButton from '../../../components/RoundedButton';
import AuthContext from '../../context/authContext';
import SettingContext from '../../context/SettingContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ModalForThemes from '../../../components/ModalForThemes';
import config from '../../../config';

import {useBackground} from '../../context/backgroundContext';

import axios from 'axios';
import {useTheme} from '../../../components/context/ThemeContext';

const SettingScreen = () => {
  const authcontext = useContext(AuthContext);
  const {theme, updateTheme, background, updateBackground} = useTheme();

  console.log('back from context (settings)', background.backgroundImage);

  // const {backgroundImage, updateBackgroundImage} = useBackground();

  // useEffect( () => {
  //   // Access the backgroundImage state

  //   // console.log('Background Image:', backgroundImage);
  // }, [backgroundImage]);

  const [deletemodalVisible, setdeleteModalVisible] = useState(false);
  const [uploadModalVisible, setuploadModalVisible] = useState(false);
  const [passwordModalVisible, setpasswordModalVisible] = useState(false);
  const [themedModalVisible, setThemeModalVisible] = useState(false);

  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isAppNotifyEnabled, setIsAppNotifyEnabled] = useState(false);
  const [isSMSEnabled, setIsSMSEnabled] = useState(false);
  const [isCommentsEnabled, setIsCommentsEnabled] = useState(false);

  const [numberOfView, setNumberOfView] = useState(null);
  const [numberOfPhotos, setNumberOfPhotos] = useState(null);

  const [success, setSuccess] = useState(false);
  const [bg, setBg] = useState('');
  const [bgSuccess, setBgSuccess] = useState(false);

  // const [rqr, setRqr] = useState(require('../../../assets/images/bg-1.jpg'));

  // useEffect(() => {
  //   const getBg = async () => {
  //     const storedBackgroundImage = await AsyncStorage.getItem(
  //       'backgroundImage',
  //     );

  //     setBg(storedBackgroundImage);
  //     console.log('storedBackgroundImage', storedBackgroundImage);

  //     if (storedBackgroundImage == null) {
  //       setBg(require('../../../assets/images/bg-1.jpg'));
  //     } else {
  //       setBg({uri: storedBackgroundImage});
  //     }
  //   };

  //   getBg();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      // settingContext.getSettings(authcontext.userToken);
      console.log('update called me..');

      const getSettings = async () => {
        const response = await axios.get(
          `${config.baseURL}/api/settings/get-single-user-settings`,
          {
            headers: {
              Authorization: `Bearer ${authcontext.userToken}`,
            },
          },
        );

        setNumberOfView(response.data.settings.preferences.numberOfItemsView);
        setNumberOfPhotos(response.data.settings.preferences.numberOfPhotos);
        setIsEmailEnabled(response.data.settings.notifications.email);
        setIsAppNotifyEnabled(
          response.data.settings.notifications.notification,
        );
        setIsSMSEnabled(response.data.settings.notifications.sms);
        setIsCommentsEnabled(
          response.data.settings.preferences.commentEnabling,
        );
      };

      getSettings();

      const getBg = async () => {
        const storedBackgroundImage = await AsyncStorage.getItem(
          'backgroundImage',
        );

        setBg(storedBackgroundImage);
        console.log('storedBackgroundImage', storedBackgroundImage);

        // if (storedBackgroundImage == null) {
        //   setBg(require('../../../assets/images/bg-1.jpg'));

        // } else {
        setBg({uri: storedBackgroundImage});

        // }
      };

      getBg();
    }, [success]),
  );

  const toggleSwitch1 = () =>
    setIsEmailEnabled(previousState => !previousState);

  const toggleSwitch2 = () =>
    setIsAppNotifyEnabled(previousState => !previousState);

  const toggleSwitch3 = () => setIsSMSEnabled(previousState => !previousState);

  const toggleSwitch4 = () =>
    setIsCommentsEnabled(previousState => !previousState);

  const data = {
    preferences: {
      numberOfItemsView: numberOfView,
      commentEnabling: isCommentsEnabled,
      numberOfPhotos: numberOfPhotos,
    },
    notifications: {
      email: isEmailEnabled,
      notification: isAppNotifyEnabled,
      sms: isSMSEnabled,
    },
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${config.baseURL}/api/settings/update-settings`,
        data,
        {
          headers: {
            Authorization: `Bearer ${authcontext.userToken}`,
          },
        },
      );

      if (response.status == 200) {
        console.log('successfully updated....');
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }

    // console.log(data);
  };

  // const getBackgroundImageSource = () => {
  //   if (backgroundImage) {
  //     return { uri: backgroundImage };
  //   } else {
  //     // If backgroundImage is not available, use the default image
  //      require('../../../assets/images/bg-1.jpg');
  //   }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{uri: background.backgroundImage}}
        // source={require('../../../assets/images/bg-1.jpg')}
        // source={
        //   bg != "" ? `${bg}` : require('../../../assets/images/bg-1.jpg')
        // }
        // defaultSource={require('../../../assets/images/bg-1.jpg')}
        // source={}
        // source={{ bg == null ?
        //   uri: bg,
        // }}
        // AsyncStorage.getItem('backgroundImage')
        resizeMode="cover"
        style={styles.bgImage}>
        <ScrollView>
          <Text
            style={{
              marginTop: 40,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '900',
              color: `${theme.textColor}`,
            }}>
            Settings
          </Text>
          {/* //! modal */}
          {deletemodalVisible && (
            <ModalForDeleteAccount
              deletemodalVisible={deletemodalVisible}
              setdeleteModalVisible={setdeleteModalVisible}
            />
          )}
          {uploadModalVisible && (
            <ModalForUpload
              uploadModalVisible={uploadModalVisible}
              setuploadModalVisible={setuploadModalVisible}
            />
          )}
          {passwordModalVisible && (
            <ModalForResetPassword
              passwordModalVisible={passwordModalVisible}
              setpasswordModalVisible={setpasswordModalVisible}
            />
          )}

          {themedModalVisible && (
            <ModalForThemes
              themedModalVisible={themedModalVisible}
              setThemeModalVisible={setThemeModalVisible}
            />
          )}

          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: 50,
            }}>
            {/* <Text style={styles.items}>Notifications</Text> */}
            <View style={styles.items}>
              <Text style={[styles.text, {color: `${theme.textColor}`}]}>
                Email Notification
              </Text>
              <TouchableOpacity>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEmailEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch1}
                  value={isEmailEnabled}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.items}>
              <Text style={[styles.text, {color: `${theme.textColor}`}]}>
                App Notification
              </Text>
              <TouchableOpacity>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isAppNotifyEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch2}
                  value={isAppNotifyEnabled}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.items}>
              <Text style={[styles.text, {color: `${theme.textColor}`}]}>
                SMS{' '}
              </Text>
              <TouchableOpacity>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isSMSEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch3}
                  value={isSMSEnabled}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.items}>
              <Text style={[styles.text, {color: `${theme.textColor}`}]}>
                Change the background
              </Text>

              <Entypo
                onPress={() => setuploadModalVisible(true)}
                name="circle-with-plus"
                size={35}
                color="#049A5B"
              />
            </View>

            <View style={styles.items}>
              <Text style={[styles.text, {color: `${theme.textColor}`}]}>
                Reset password
              </Text>

              <Entypo
                onPress={() => setpasswordModalVisible(true)}
                name="circle-with-plus"
                size={35}
                color="#049A5B"
              />
            </View>

            <View style={styles.items}>
              <Text style={[styles.text, {color: `${theme.textColor}`}]}>
                Delete my account
              </Text>

              <Entypo
                onPress={() => setdeleteModalVisible(true)}
                name="circle-with-plus"
                size={35}
                color="#049A5B"
              />
            </View>

            <View style={styles.items}>
              <Text style={[styles.text, {color: `${theme.textColor}`}]}>
                Themes
              </Text>

              <Entypo
                onPress={() => setThemeModalVisible(true)}
                name="circle-with-plus"
                size={35}
                color="#049A5B"
              />
            </View>

            <View style={styles.items}>
              <Text style={[styles.text, {color: `${theme.textColor}`}]}>
                Comments{' '}
              </Text>
              <TouchableOpacity>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isCommentsEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch4}
                  value={isCommentsEnabled}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.items}>
              <Text style={[styles.text, {color: `${theme.textColor}`}]}>
                Number of items view
              </Text>

              <TextInput
                style={{
                  color: 'red',
                  height: 40,
                  width: 70,
                  borderColor: 'gray',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                }}
                placeholderTextColor="rgba(19, 176, 100, 0.55)"
                keyboardType="numeric"
                value={numberOfView !== null ? numberOfView.toString() : ''}
                onChangeText={num => setNumberOfView(num)}
                defaultValue={
                  numberOfView !== null ? numberOfView.toString() : ''
                }
              />
            </View>

            <View style={styles.items}>
              <Text style={[styles.text, {color: `${theme.textColor}`}]}>
                Number of photos
              </Text>

              <TextInput
                style={{
                  color: 'red',
                  height: 40,
                  width: 70,
                  borderColor: 'gray',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                }}
                placeholderTextColor="rgba(19, 176, 100, 0.55)"
                keyboardType="numeric"
                defaultValue={
                  numberOfPhotos !== null ? numberOfPhotos.toString() : ''
                }
                value={numberOfPhotos !== null ? numberOfPhotos.toString() : ''}
                onChangeText={num => setNumberOfPhotos(num)}
              />
            </View>
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '10px',
            }}>
            <RoundedButton
              onPress={handleUpdate}
              // onPress={changeTheme}
              text="Update"
            />
          </View>

          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '10px',
            }}>
            <RoundedButton
              onPress={() => {
                console.log('Logout Prssed');
                authcontext.signOut();
              }}
              text="Logout"
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    fontSize: 16,
    // color: `${theme.textColor}`,
    fontWeight: 'bold',
  },

  items: {
    marginHorizontal: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // color: 'red',
    color: 'lightgreen',
    fontSize: 20,
    marginBottom: 20,
    alignItems: 'center',
  },

  bgImage: {
    flex: 1,
  },
});
