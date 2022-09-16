import { getCookie } from "../utils/cookie.util";
import axios from "axios";
axios.defaults.withCredentials = true;
export const getCaregoriesApi = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "http://localhost:8888/api/v1/categories?page=1&limit=12&sort=position:-1",
    });
    return response;
  } catch (error) {
    return error;
  }
};
