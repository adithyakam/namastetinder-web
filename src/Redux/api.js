import axios from "axios";

const axiosServer = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: false,
});

export default axiosServer;
