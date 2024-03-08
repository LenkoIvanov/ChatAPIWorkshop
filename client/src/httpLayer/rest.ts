import axiosInstance from './axiosConfig';
import { userDelayedUrl, loginUrl, registerUrl, userUrl } from './endpoints';

interface LoginResp {
  status: number;
  message: string;
  token: string;
  success: string;
}

interface RegisterResp {
  message: string;
  status: number;
  success: string;
}

export interface Author {
  username: string;
  color: string;
}

let controller = new AbortController();

const resetAbortController = () => {
  controller = new AbortController();
};

export const createNewUser = async (username: string, password: string) => {
  try {
    const apiResponse = await axiosInstance.post<RegisterResp>(registerUrl, {
      username: username,
      password: password
    });
    console.log(apiResponse);
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

export const getUsers = async (): Promise<Author[]> => {
  try {
    const users = await axiosInstance.get<Author[]>(userUrl);
    return users.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getSensitiveInformationDelayed = async (): Promise<Author[]> => {
  const config = {
    signal: controller.signal
  };

  try {
    const apiResponse = await axiosInstance.get<Author[]>(userDelayedUrl, config);
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
