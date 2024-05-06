import axios from "axios";
import authStore from "../store/UserStore/authStore";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7084/api",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = authStore.getState().token;
    console.log("token from store", jwtToken);
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Response interceptor to handle token expiration and refresh
// axiosInstance.interceptors.response.use(
//     response => {
//       // Do something with response data
//       return response;
//     },
//     error => {
//       // Handle error responses
//       return Promise.reject(error);
//     }
//   );

export default axiosInstance;
