import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("authToken"),
  },
});

export default axiosClient;
