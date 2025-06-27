import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nyumbasmart.onrender.com',
  withCredentials: false,
});

export default api;