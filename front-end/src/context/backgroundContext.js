// BackgroundContext.js
import React, {createContext, useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from '../../config';

const BackgroundContext = createContext();

export const BackgroundProvider = ({children}) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  const updateBackgroundImage = newImage => {
    const {photo, token} = newImage;

    const createFormData = (photo, body = {}) => {
      const data = new FormData();

      photo.assets.map(item => {
        // console.log(item);
        data.append('photo', {
          name: item.fileName,
          type: item.type,
          uri:
            Platform.OS === 'ios' ? item.uri.replace('file://', '') : item.uri,
        });
      });

      Object.keys(body).forEach(key => {
        data.append(key, body[key]);
      });

      return data;
    };

    //!

    const fetchRequest = async () => {
      await fetch(`${config.baseURL}/api/settings/update-background-image`, {
        method: 'POST',
        body: createFormData(photo, {
          imageDescription: 'NEW Image Description 1',
          description: 'NEWWW description',
        }),

        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(async response => {
          console.log(
            'response',
            response.updatedSetting.themes.backgroundImage,
          );
          
          await AsyncStorage.setItem(
            'backgroundImage',
            response.updatedSetting.themes.backgroundImage,
          );

          setBackgroundImage(response.updatedSetting.themes.backgroundImage);

          if (response.status === 200) {
            console.log('response', response);
            // setBackgroundImage(response.updatedSetting.themes.backgroundImage);
            // setBackgroundImage(response.updatedSetting.themes.backgroundImage);
      

  
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    };

    fetchRequest();

    //   !old code
    // setBackgroundImage(newImage);
  };

  return (
    <BackgroundContext.Provider
      value={{
        backgroundImage,
        updateBackgroundImage,
      }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  return useContext(BackgroundContext);
};
