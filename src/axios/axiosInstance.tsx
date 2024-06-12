import axios from "axios";
import authStore from "../store/UserStore/authStore";
import appStateStore from "../store/CommonStore/appStateStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVER_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { refreshAccessToken, setLoginStatus } = authStore.getState();
    const accessToken = sessionStorage.getItem("accessToken");
    appStateStore.getState().setIsLoading(true);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      setLoginStatus();
    } else {
      await refreshAccessToken();
      const newAccessToken = authStore.getState().accessToken;
      if (newAccessToken) {
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    appStateStore.getState().setIsLoading(false);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    appStateStore.getState().setIsLoading(false);

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await authStore.getState().refreshAccessToken();
      console.log("eredfdas");
      const newAccessToken = authStore.getState().accessToken;
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
