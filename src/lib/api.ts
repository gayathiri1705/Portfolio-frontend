import axios from 'axios';

const api = axios.create({
<<<<<<< HEAD
    baseURL: 'https://portfolio-backend-lac-theta.vercel.app/',
=======
    baseURL:'https://portfolio-backend-lac-theta.vercel.app/',
>>>>>>> ba803270c43f0a0364657c484eae83ce370bafb8
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
