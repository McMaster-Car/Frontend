import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

const Axios = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' }
  });

Axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token && !config.url.includes('/login')) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    (response) => {
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default Axios;