import axios from 'axios';
import {store} from '../store/store';

// 192.168.248.45
// 192.168.1.21
const http = axios.create({
  baseURL: 'http://192.168.1.21:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  config => {
    const accessToken = store.getState()?.auth?.tokens?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

http.interceptors.response.use(
  response => {
    return response.data;
  },
  err => {
    console.log('axios response error: ', err.response.data);
    return Promise.reject(err);
  },
);

export default http;
