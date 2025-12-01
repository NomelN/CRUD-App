import axios from 'axios';

const authApi = axios.create({
    baseURL: 'http://localhost:8000/products/api/v1/auth/'
});

// Add a request interceptor to inject the token
authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const login = (credentials) => authApi.post('login/', credentials);
export const register = (userData) => authApi.post('register/', userData);
export const getMe = () => authApi.get('me/');
export const refreshToken = (refresh) => authApi.post('refresh/', { refresh });

export default authApi;
