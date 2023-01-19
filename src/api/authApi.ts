import axios from "axios";

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = 'https://take-time-ms.onrender.com/api/v2';

const authApi = axios.create({
  baseURL: baseURL,
});

authApi.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ` + localStorage.getItem("token");
  return config;
});

export default authApi;
