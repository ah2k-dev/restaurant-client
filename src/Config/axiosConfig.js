import Axios from "axios";

export const base_url = "http://localhost:8001";
export const publicAPI = Axios.create({ baseURL: base_url });
export const privateAPI = Axios.create({ baseURL: base_url });
export const attachToken = async () => {
  const jwt = localStorage.getItem("token");
  privateAPI.defaults.headers.common.Authorization = jwt;
  //console.log("Token Attached");
};