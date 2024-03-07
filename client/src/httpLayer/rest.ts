import { authTokenKey } from '../utils/constants';
import axiosInstance from './axiosConfig';
import { userDelayedUrl, loginUrl, registerUrl, userUrl } from './endpoints';

interface LoginResp {
  status: number;
  message: string;
  token: string;
  success: boolean;
}

let controller = new AbortController();

const resetAbortController = () => {
  controller = new AbortController();
};

export const createNewUser = async (username: string, password: string) => {
  try {
    const apiResponse = await axiosInstance.post(registerUrl, {
      username: username,
      password: password
    });
    return apiResponse.status;
  } catch (err) {
    console.log('An error has occured while fetching the token: ', err);
  }
};

export const userLogin = async (username: string, password: string) => {
  try {
    const apiResponse = await axiosInstance.post<LoginResp>(loginUrl, {
      username: username,
      password: password
    });
    return apiResponse.data.token;
  } catch (err) {
    console.log('An error has occured while logging in: ', err);
  }
};

export const getUsers = async () => {
  const authenticationToken = sessionStorage.getItem(authTokenKey); //interceptor for tomorrow
  const config = {
    headers: { Authorization: `Bearer ${authenticationToken}` }
  };
  try {
    const users = await axiosInstance.get(userUrl, config);
    return users.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getSensitiveInformationDelayed = async () => {
  const authenticationToken = sessionStorage.getItem(authTokenKey);
  const config = {
    headers: { Authorization: `Bearer ${authenticationToken}` },
    signal: controller.signal
  };

  try {
    const apiResponse = await axiosInstance.get<string[]>(userDelayedUrl, config);
    return apiResponse.data;
  } catch (err) {
    console.log('An error has occured while logging in: ', err);
    return [];
  }
};

export const cancelRequest = () => {
  controller.abort();
  resetAbortController();
};
