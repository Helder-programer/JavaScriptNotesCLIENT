import axios from "axios";
import { getAuthLocalStorage } from "../contexts/auth/utils";

const Api = axios.create({ baseURL: 'http://localhost:8000' });

// 'https://javascriptnotesapi.onrender.com'


Api.interceptors.request.use(
    (config) => {
        const auth = getAuthLocalStorage();
        config.headers['access-token'] = auth?.token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default Api;