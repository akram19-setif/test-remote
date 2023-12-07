import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || 3001;

export const axiosRequest = axios.create({
  baseURL: BASE_URL,
});
