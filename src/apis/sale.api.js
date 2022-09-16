import axios from "axios";
import { getCookie } from "../utils/cookie.util";
axios.defaults.withCredentials = true;
export const getCurrentSaleApi = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "http://localhost:8888/api/v1/sales/current",
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getSaleProducts = async (id) => {
  try {
    const response = await axios({
      method: "GET",
      url: `http://localhost:8888/api/v1/sale-products/${id}?page=1&limit=25`,
    });
    return response;
  } catch (error) {
    return error;
  }
};
