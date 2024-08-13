import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
});

http.interceptors.request.use(
  config => {
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
    return Promise.reject(err);
  },
);

export default http;
