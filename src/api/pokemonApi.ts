import axios from "axios";

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = 'https://take-time-ms.onrender.com/api/v2';

const pokemonApi = axios.create({
  baseURL: baseURL,
});

pokemonApi.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ` + localStorage.getItem("token");
  return config;
});

export default pokemonApi;