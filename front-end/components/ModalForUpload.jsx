
import React, {useContext, useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
import SettingContext from '../src/context/SettingContext';
import {launchImageLibrary} from 'react-native-image-picker';
import {Platform} from 'react-native';
import AuthContext from '../src/context/authContext';
import {useBackground} from '../src/context/backgroundContext';
import {useTheme} from './context/ThemeContext';
import config from '../config';

const ModalForUpload = ({uploadModalVisible, setuploadModalVisible}) => {
  // const {backgroundImage, updateBackgroundImage} = useBackground();
  const settingContext = useContext(SettingContext);
  const authcontext = useContext(AuthContext);
  const {theme, updateTheme, background, updateBackground} = useTheme();

  const [pickedImage, setPickedImage] = useState('');
  const [photo, setPhoto] = useState(null);

  // useEffect(() => {
  //   // Access the backgroundImage state
  //   // console.log('Background Image:', backgroundImage);
  // }, [backgroundImage]);

  // const handleUpdateBackground = () => {
  //   // Call the updateBackgroundImage function
  //   // You need to provide the new image URL here
  //   updateBackgroundImage({photo: photo, token: authcontext.userToken});
  // };

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

  // console.log('settingContext', settingContext);

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true, selectionLimit: 1}, response => {
      // console.log(response);
      if (response && !response.didCancel) {
        // console.log(response);
        setPhoto(response);
        setPickedImage('...Image selected');
      }

      if (response.didCancel) {
        setPickedImage('');
      }
    });
  };

  const handleUploadPhoto = async () => {
    console.log('photo to upload called');
    // createFormData(photo);
    // console.log('from form inside upload', createFormData(photo)._parts);

    await fetch(`${config.baseURL}/api/settings/update-background-image`, {
      method: 'POST',
      body: createFormData(photo, {
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
        // console.log('response', response.updatedSetting.themes.backgroundImage);

        console.log('response', response.updatedSetting.themes.backgroundImage);

        const newBackground = {
          backgroundImage: response.updatedSetting.themes.backgroundImage,
        };

        console.log(newBackground);

        updateBackground(newBackground);

        setPickedImage('');

        // if (response.status === 200) {
        //   console.log('response', response);
        //   const newBackground = {
        //     backgroundImage: response.updatedSetting.themes.backgroundImage,
        //   };

        //   console.log(newBackground);

        //   updateBackground(newBackground);

        //   // setBackgroundImage(response.updatedSetting.themes.backgroundImage);
        //   // setBackgroundImage(response.updatedSetting.themes.backgroundImage);
        // }
      })
      .catch(error => {
        console.log('error', error);
      });

    // fetch(`${config.baseURL}/api/location/add-post`, {
    //   method: 'POST',
    //   body: createFormData(photo, {
    //     name: locationName,
    //     imageDescription: 'NEW Image Description 1',
    //     description: 'NEWWW description',
    //   }),

    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     Authorization: `Bearer ${authcontext.userToken}`,
    //   },
    // })
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log('response', response);
    //   })
    //   .catch(error => {
    //     console.log('error', error);
    //   });
  };

  // const selectDoc = async () => {
  //   try {
  //     const doc = await DocumentPicker.pickSingle({
  //       type: [DocumentPicker.types.images],
  //       // allowMultiSelection: false,
  //     });
  //     console.log(doc);
  //     setPickedImage(doc.name);
  //   } catch (error) {
  //     if (DocumentPicker.isCancel(error)) {
  //       console.log('User Cancelled the upload', error);
  //     } else {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={uploadModalVisible}
        onRequestClose={() => {
          setuploadModalVisible(!uploadModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select photo to upload</Text>

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

            <Pressable
              style={[styles.button, styles.buttonDelete, {marginRight: 40}]}
              onPress={handleUploadPhoto}>
              <Text style={styles.textStyle}>Upload</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonDelete: {
    backgroundColor: '#146F14',
    verticalAlign: 'middle',
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

export default ModalForUpload;




































// import React, {useContext, useState, useEffect} from 'react';
// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   Pressable,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import Entypo from 'react-native-vector-icons/Entypo';
// import DocumentPicker from 'react-native-document-picker';
// import SettingContext from '../src/context/SettingContext';
// import {launchImageLibrary} from 'react-native-image-picker';
// import {Platform} from 'react-native';
// import AuthContext from '../src/context/authContext';

// const ModalForUpload = ({uploadModalVisible, setuploadModalVisible}) => {

//   const settingContext = useContext(SettingContext);
//   const authcontext = useContext(AuthContext);
//   const [pickedImage, setPickedImage] = useState('');
//   const [photo, setPhoto] = useState(null);



//   const createFormData = (photo, body = {}) => {
//     const data = new FormData();

//     // console.log('file name', photo.assets[0].uri);

//     photo.assets.map(item => {
//       // console.log(item);
//       data.append('photo', {
//         name: item.fileName,
//         type: item.type,
//         uri: Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.uri,
//       });
//     });

//     Object.keys(body).forEach(key => {
//       data.append(key, body[key]);
//     });

//     // console.log('from form data', data._parts);

//     return data;
//   };

//   // console.log('settingContext', settingContext);

//   const handleChoosePhoto = () => {
//     launchImageLibrary({noData: true, selectionLimit: 1}, response => {
//       // console.log(response);
//       if (response && !response.didCancel) {
//         // console.log(response);
//         setPhoto(response);
//         setPickedImage('...Image selected');
//       }

//       if (response.didCancel) {
//         setPickedImage('');
//       }
//     });
//   };

//   // const selectDoc = async () => {
//   //   try {
//   //     const doc = await DocumentPicker.pickSingle({
//   //       type: [DocumentPicker.types.images],
//   //       // allowMultiSelection: false,
//   //     });
//   //     console.log(doc);
//   //     setPickedImage(doc.name);
//   //   } catch (error) {
//   //     if (DocumentPicker.isCancel(error)) {
//   //       console.log('User Cancelled the upload', error);
//   //     } else {
//   //       console.log(error);
//   //     }
//   //   }
//   // };

//   return (
//     <View style={styles.centeredView}>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={uploadModalVisible}
//         onRequestClose={() => {
//           setuploadModalVisible(!uploadModalVisible);
//         }}>
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             <Text style={styles.modalText}>Select photo to upload</Text>

//             <TouchableOpacity
//               style={styles.uploadcontainer}
//               onPress={handleChoosePhoto}>
//               <Entypo name="images" size={35} color="#049A5B" />

//               {pickedImage ? (
//                 <Text style={{color: 'red'}}>{pickedImage}</Text>
//               ) : (
//                 <Text style={{color: 'black'}}>Upload a file</Text>
//               )}
//             </TouchableOpacity>

//             <Pressable
//               style={[styles.button, styles.buttonDelete, {marginRight: 40}]}
//               onPress={handleUploadPhoto}>
//               <Text style={styles.textStyle}>Upload</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   uploadcontainer: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 150,
//     width: 200,
//     borderStyle: 'dashed',
//     backgroundColor: 'white',
//     marginBottom: 10,
//     borderColor: 'rgba(0, 0, 0, 0.59)',
//     borderWidth: 2,
//   },
//   buttonDelete: {
//     backgroundColor: '#146F14',
//     verticalAlign: 'middle',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   modalView: {
//     borderWidth: 0,
//     margin: 20,
//     backgroundColor: 'rgba(20, 111, 67, 0.69)',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     width: 100,
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#145F6F',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     color: 'white',
//     fontWeight: '900',
//     marginBottom: 15,
//     textAlign: 'center',
//     fontSize: 17,
//   },
// });

// export default ModalForUpload;
