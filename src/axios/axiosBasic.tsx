import axios from "axios";
import appStateStore from "../store/CommonStore/appStateStore";

const axiosBasic = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  timeout: 100000,
});

axiosBasic.interceptors.request.use(
  (config) => {
    // Set loading state to true before sending the request
    appStateStore.getState().setIsLoading(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosBasic.interceptors.response.use(
  (response) => {
    // Set loading state to false after receiving the response
    appStateStore.getState().setIsLoading(false);
    return response;
  },
  (error) => {
    // Set loading state to false if there's an error
    appStateStore.getState().setIsLoading(false);
    return Promise.reject(error);
  }
);

export default axiosBasic;
