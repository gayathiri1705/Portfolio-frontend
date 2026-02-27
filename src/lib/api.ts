import axios from 'axios';

const api = axios.create({
    baseURL: 'https://portfolio-backend-lac-theta.vercel.app/api',
});

// Interceptor for Auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
