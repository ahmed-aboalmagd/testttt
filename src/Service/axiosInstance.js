import axios from "axios";

const axiosInstance = axios.create({
  method: "get",
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "57fb71a7e41a37c25c954a15f90d6e84",
  },
});

export default axiosInstance;
