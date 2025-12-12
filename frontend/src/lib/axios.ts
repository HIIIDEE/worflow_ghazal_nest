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
        // Optional: Handle global errors like 401 Unauthorized
        if (error.response?.status === 401) {
            // Handle logout or redirect logic here if needed
            // For now, just reject
        }
        return Promise.reject(error);
    }
);
