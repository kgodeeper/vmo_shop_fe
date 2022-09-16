import axios from "axios";
import { getCookie } from "../utils/cookie.util";

axios.defaults.withCredentials = true;

export const loginApi = async (account, password) => {
  try {
    const response = await axios({
      method: "POST",
      url: `http://localhost:8888/api/v1/auths/login`,
      data: {
        account,
        password,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const registerApi = async (username, password, email) => {
  try {
    const response = await axios({
      method: "POST",
      url: "http://localhost:8888/api/v1/auths/register",
      data: {
        username,
        password,
        email,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const resendApi = async (account) => {
  try {
    const response = await axios({
      method: "POST",
      url: "http://localhost:8888/api/v1/accounts/resend-verify-code",
      data: {
        account,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const activeApi = async (account, code) => {
  try {
    const response = await axios({
      method: "PATCH",
      url: "http://localhost:8888/api/v1/accounts/active",
      data: {
        account,
        code,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const checkAuthApi = async (accessToken) => {
  try {
    const response = await axios({
      method: "GET",
      url: "http://localhost:8888/api/v1/auths",
      headers: `Bearer ${accessToken}`,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const refresh = async () => {
  const refreshToken = getCookie("refreshToken");
  try {
    const response = await axios({
      method: "POST",
      url: "http://localhost:8888/api/v1/auths/refresh",
      data: {
        refreshToken,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
