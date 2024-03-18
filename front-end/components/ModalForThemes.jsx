import React, {useState, useContext, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import {ColorPicker} from 'react-native-color-picker';
import {useTheme} from '../components/context/ThemeContext';
import axios from 'axios';
import AuthContext from '../src/context/authContext';
import config from '../config';

const ModalForThemes = ({themedModalVisible, setThemeModalVisible}) => {
  const authcontext = useContext(AuthContext);
  const {theme, updateTheme} = useTheme();
  const [txtColor, setTxtColor] = useState(null);
  const [btnColor, setBtnColor] = useState(null);
  const [navbgColor, setNavBgColor] = useState(null);

  // console.log('theme from context (thememodal)', theme);

  useEffect(() => {
    setTxtColor(theme.textColor);
    setBtnColor(theme.buttonColor);
    setNavBgColor(theme.navBarBgColor);
  }, []);

  const data = {
    themes: {
      textColor: txtColor,
      buttonColor: btnColor,
      bottomNavBgColor: navbgColor,
      // backgroundImage: 'image2 updated',
    },
  };

  const handleUpdate = async () => {
    try {
      if (txtColor != '' && btnColor != '' && navbgColor != '') {
        const response = await axios.put(
          `${config.baseURL}/api/settings/update-settings/themes`,
          data,
          {
            headers: {
              Authorization: `Bearer ${authcontext.userToken}`,
            },
          },
        );

        if (response.status == 200) {
          console.log('successfully updated....');
          // console.log(response.data.updatedSettings.themes.bottomNavBgColor);
          // console.log(response.data.updatedSettings.themes.buttonColor);
          // console.log(response.data.updatedSettings.themes.textColor);

          const newTheme = {
            textColor: response.data.updatedSettings.themes.textColor,
            buttonColor: response.data.updatedSettings.themes.buttonColor,
            navBarBgColor:
              response.data.updatedSettings.themes.bottomNavBgColor,
          };

          updateTheme(newTheme);
        }
      } else {
        console.log('Please Provide value');
        console.log('txtColor', txtColor);
        console.log('btnColor', btnColor);
        console.log('navbgColor', navbgColor);
      }
    } catch (error) {
      console.log(error);
    }

    // Update the global theme
    // updateTheme(newTheme);

    // console.log('theme from context in side change', theme);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={themedModalVisible}
        onRequestClose={() => {
          setThemeModalVisible(!themedModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.items}>
              <Text style={styles.text}>Text Color</Text>

              <TextInput
                style={{
                  color: 'red',
                  height: 40,
                  width: 70,
                  borderColor: 'gray',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  marginLeft: 10,
                }}
                onChangeText={value => setTxtColor(value)}
                value={txtColor}
                // defaultValue={
                //   theme.textColor !== null ? theme.textColor.toString() : ''
                // }
              />
            </View>
            <View style={styles.items}>
              <Text style={styles.text}>Button Color</Text>

              <TextInput
                style={{
                  color: 'red',
                  height: 40,
                  width: 70,
                  borderColor: 'gray',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  marginLeft: 10,
                }}
                onChangeText={value => setBtnColor(value)}
                value={btnColor}
                // value={
                //   theme.buttonColor !== null ? theme.buttonColor.toString() : ''
                // }
                // defaultValue={
                //   theme.buttonColor !== null ? theme.buttonColor.toString() : ''
                // }
              />
            </View>
            <View style={styles.items}>
              <Text style={styles.text}>Navigation background color</Text>

              <TextInput
                style={{
                  color: 'red',
                  height: 40,
                  width: 70,
                  borderColor: 'gray',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  backgroundColor: 'white',
                  marginLeft: 10,
                }}
                onChangeText={value => setNavBgColor(value)}
                value={navbgColor}
              />
            </View>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                style={[
                  styles.button,
                  {
                    backgroundColor: `${theme.buttonColor}`,
                    verticalAlign: 'middle',
                  },
                ]}
                onPress={handleUpdate}>
                <Text style={styles.textStyle}>Update</Text>
              </Pressable>
            </View>
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
    // display: 'flex',
    // justifyContent: 'center',
    borderWidth: 0,
    margin: 20,
    backgroundColor: 'rgba(20, 111, 67, 0.9)',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
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

  //!   newly added

  text: {
    fontSize: 16,
    // color: '#146F43',
    color: 'white',
    fontWeight: 'bold',
  },

  items: {
    marginHorizontal: 50,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'flex-start',
    // justifyContent: 'space-around',
    // color: 'red',
    // color: 'white',
    fontSize: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default ModalForThemes;
