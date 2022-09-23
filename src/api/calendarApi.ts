import axios from "axios";
const baseURL = process.env.REACT_APP_LOCAL_URL;

const calendarApi = axios.create({
  baseURL: baseURL,
});

calendarApi.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ` + localStorage.getItem("token");
  return config;
});

export default calendarApi;
