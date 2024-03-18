import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://16.170.230.120/',
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `bearer ${token}`;
    } else {
      console.log('Token not found');
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);
export default instance;
