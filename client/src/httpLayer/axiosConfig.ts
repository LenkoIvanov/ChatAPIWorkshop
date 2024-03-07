import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://chatapp.blubitoapps.com/',
  headers: {
    'Content-Type': 'application/json'
  }
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
