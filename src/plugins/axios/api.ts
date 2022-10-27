import axios, { AxiosInstance }  from 'axios';
import Cookies from "js-cookie";

 const api = axios.create({
    baseURL : "http://185.244.172.108:8081/",
});

export default api