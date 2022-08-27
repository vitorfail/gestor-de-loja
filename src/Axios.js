import axios from "axios";
import Server from "./Servidor";
const Axios = axios.create({
  baseURL: Server
});

Axios.interceptors.request.use(async config => {
  if (localStorage.getItem('token_jwt')) {
    config.headers.Authorization = 'Bearer '+localStorage.getItem('token_jwt');
  }
  return config;
});

export default Axios;

