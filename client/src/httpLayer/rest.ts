import axiosInstance from "./axiosConfig";
import { loginUrl, registerUrl } from "./endpoints";

interface LoginResp {
  status: number;
  message: string;
  token: string;
  success: boolean;
}

export const createNewUser = async (username: string, password: string) => {
  try {
    const apiResponse = await axiosInstance.post(registerUrl, {
      username: username,
      password: password,
    });
    return apiResponse.status;
   } catch (err) {
     console.log("An error has occured while fetching the token: ", err);
   }
};

export const userLogin = async (username: string, password: string) => {
   try {
    const apiResponse = await axiosInstance.post<LoginResp>(loginUrl, {
      username: username,
      password: password,
    });
    return apiResponse.data.token;
   } catch (err) {
     console.log("An error has occured while logging in: ", err);
   }
};
