import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor for adding token and handling errors
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors like 401 Unauthorized
        if (error.response?.status === 401) {
            // Clear authentication data
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('auth-storage');

            // Redirect to login page
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
