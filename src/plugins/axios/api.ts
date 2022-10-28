import axios from 'axios';

const api = axios.create({
  baseURL: 'http://185.244.172.108:8081/',
});

export default api;
