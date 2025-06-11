import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Change if your backend URL is different
});

export default api;
