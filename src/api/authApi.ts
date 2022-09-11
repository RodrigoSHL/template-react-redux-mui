import axios from "axios";
const baseURL = process.env.REACT_APP_LOCAL_URL

const authApi = axios.create({
    baseURL: baseURL
})

//Todo: interceptors

export default authApi