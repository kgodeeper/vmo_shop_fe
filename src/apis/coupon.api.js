import axios from "axios";
import { getCookie } from "../utils/cookie.util";
axios.defaults.withCredentials = true;
export const getCurrentCouponApi = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "http://localhost:8888/api/v1/coupons/current?page=1&limit=20",
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const saveCouponApi = async (code) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "accessToken"
  )}`;
  try {
    const response = await axios({
      method: "PUT",
      url: `http://localhost:8888/api/v1/customer-coupons/save/${code}`,
    });
    return response;
  } catch (error) {
    return error;
  }
};
