import axios from "axios";
import { API_BASE_URL } from "./constants";

const api = axios.create({
    baseURL: API_BASE_URL, // Set the base URL for all requests
});

// Add a request interceptor to include the Authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Retrieve the token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;