import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
}, function (error) {
  // console.error("Interceptor caught: ", error);
  window.alert("An error has occured please try again later!");
});

export default axiosInstance;
