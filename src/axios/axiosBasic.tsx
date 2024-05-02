import axios from "axios";

const axiosBasic = axios.create({
  baseURL: "https://localhost:7084/api",
  timeout: 10000,
});

export default axiosBasic;
