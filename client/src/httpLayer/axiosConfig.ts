import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';
import { authTokenKey } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const newConfig: InternalAxiosRequestConfig = config;
  const authToken = sessionStorage.getItem(authTokenKey);
  if (authToken) {
    newConfig.headers = new AxiosHeaders({ Authorization: `Bearer ${authToken}`, ...config.headers });
  }
  return newConfig;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error('Interceptor caught: ', error);
    window.alert('An error has occured please try again later!');
  }
);

export default axiosInstance;
