import axios from 'axios';
import {store} from '../store/store';
import {renewTokens} from '../apis/auth';
import {logout, renewTokens as renew} from '../store/slices/auth';
import {navigationRef} from '../navigations/RootNavigation';

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
  async err => {
    const original = err.config;

    console.log(err.response.data.message, err.response.status);
    if (
      err.response.data.message === 'jwt expired' &&
      err.response.status === 401
    ) {
      const refreshToken = store.getState()?.auth?.tokens.refreshToken;

      const response = await renewTokens({refreshToken});
      console.log(response);
      store.dispatch(renew(response.data));

      original.headers.authorization = `Bearer ${response.data.accessToken}`;
      return await http(original);
    } else if (err.response.status === 403) {
      store.dispatch(logout());
      navigationRef.reset({
        index: 0,
        routes: [{name: 'login'}],
      });
    }

    return Promise.reject(err.response.data);
  },
);

export default http;
