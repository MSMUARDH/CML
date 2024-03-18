// ThemeContext.js
import axios from 'axios';
import {createContext, useContext, useState, useEffect} from 'react';
import * as Keychain from 'react-native-keychain';
import config from '../../config';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState({
    textColor: '#146F43',
    buttonColor: '#146F14',
    navBarBgColor: '#146F43',
  });

  const [background, setBackground] = useState({
    backgroundImage: '',
  });

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = async () => {
    const credentials = await Keychain.getGenericPassword();
    // console.log('credentials', credentials.password);

    const response = await axios.get(
      `${config.baseURL}/api/settings/get-single-user-settings`,
      {
        headers: {
          Authorization: `Bearer ${credentials.password}`,
        },
      },
    );

    const newTheme = {
      textColor: response.data.settings.themes.textColor,
      buttonColor: response.data.settings.themes.buttonColor,
      navBarBgColor: response.data.settings.themes.bottomNavBgColor,
    };

    const newBackground = {
      backgroundImage: response.data.settings.themes.backgroundImage,
    };

    updateBackground(newBackground);

    updateTheme(newTheme);
    // console.log('response bg', response.data.settings.themes.backgroundImage);
    // console.log(response.data.settings.themes.textColor);
    // console.log(response.data.settings.themes.buttonColor);
    // console.log(response.data.settings.themes.bottomNavBgColor);
  };

  const updateTheme = newTheme => {
    setTheme(newTheme);
  };

  // !Only for Backgroun image
  const updateBackground = newBackground => {
    setBackground(newBackground);
  };

  return (
    <ThemeContext.Provider
      value={{theme, updateTheme, background, updateBackground}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
