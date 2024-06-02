import axios from "axios";
import authStore from "../store/UserStore/authStore";
import appStateStore from "../store/CommonStore/appStateStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = authStore.getState().token;
    appStateStore.getState().setIsLoading(true);

    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and refresh
axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with response data
    appStateStore.getState().setIsLoading(false);
    return response;
  },
  (error) => {
    // Handle error responses
    appStateStore.getState().setIsLoading(false);
    return Promise.reject(error);
  }
);

export default axiosInstance;
