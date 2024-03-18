// AuthContext.js
import axios from 'axios';
import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useState,
} from 'react';
import config from '../../config';

// Define your initial state
const initialState = {
  backgroundImage: '',
};

// Create the context
const SettingContext = createContext();

// Create the reducer function
const settingReducer = (prevState, action) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return {
        ...prevState,
        userToken: action.token,
      };
  }
};

// Create the AuthProvider component
export const SettingProvider = ({children}) => {
  const [state, dispatch] = useReducer(settingReducer, initialState);

  // Define the context value
  const contextValue = {
    backgroundImage: state.backgroundImage,

    // getSettings: async token => {
    //   state.isLoading = true;
    //   try {
    //     const response = await axios.get(
    //       `${config.baseURL}/api/settings/get-single-user-settings`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       },
    //     );

    //     if (response.status == 200) {
    //       state.isLoading = true;

    //       dispatch({
    //         type: 'SET_SETTINGS',
    //         payload: {
    //           themes: {
    //             textColor: response.data.settings.themes.textColor,
    //             buttonColor: response.data.settings.themes.buttonColor,
    //             bottomNavBgColor:
    //               response.data.settings.themes.bottomNavBgColor,
    //             backgroundImage: response.data.settings.themes.backgroundImage,
    //           },
    //           preferences: {
    //             numberOfItemsView:
    //               response.data.settings.preferences.numberOfItemsView,
    //             commentEnabling:
    //               response.data.settings.preferences.commentEnabling,
    //             numberOfPhotos:
    //               response.data.settings.preferences.numberOfPhotos,
    //           },
    //           notifications: {
    //             email: response.data.settings.notifications.email,
    //             notification: response.data.settings.notifications.notification,
    //             sms: response.data.settings.notifications.sms,
    //           },
    //         },
    //       });

    //       state.isLoading = false;
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     state.isLoading = false;
    //   }
    // },

    // updateSettings: async token => {
    //   try {
    //     const response = await axios.put(
    //       `${config.baseURL}/api/settings/get-single-user-settings`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       },
    //     );

    //     if (response.status == 200) {
    //       dispatch({
    //         type: 'SET_SETTINGS',
    //         payload: {
    //           backgroundImage: response.data.backgroundImage,
    //         },
    //       });
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },

    updateBackgroundImage: data => {
      const {photo, token} = data;

      // !create form data

      const createFormData = (photo, body = {}) => {
        const data = new FormData();

        photo.assets.map(item => {
          // console.log(item);
          data.append('photo', {
            name: item.fileName,
            type: item.type,
            uri:
              Platform.OS === 'ios'
                ? item.uri.replace('file://', '')
                : item.uri,
          });
        });

        Object.keys(body).forEach(key => {
          data.append(key, body[key]);
        });

        return data;
      };

      //!

      fetch(`${config.baseURL}/api/settings/update-background-image`, {
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
        .then(response => {
          // console.log(
          //   'response',
          //   response.updatedSetting.themes.backgroundImage,
          // );
          if (response.status === 200) {
            dispatch({
              type: 'SET_SETTINGS',
              payload: {
                backgroundImage: response.updatedSetting.themes.backgroundImage,
              },
            });
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    },
  };

  // Provide the context value to the components
  return (
    <SettingContext.Provider value={contextValue}>
      {children}
    </SettingContext.Provider>
  );
};

export default SettingContext;
