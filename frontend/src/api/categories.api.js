import axios from 'axios';

const categoriesApi = axios.create({
    baseURL: 'http://localhost:8000/products/api/v1/categories/'
});

categoriesApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllCategories = () => categoriesApi.get('/');
export const getCategory = (id) => categoriesApi.get(`/${id}/`);
export const createCategory = (category) => categoriesApi.post('/', category);
export const deleteCategory = (id) => categoriesApi.delete(`/${id}/`);
export const updateCategory = (id, category) => categoriesApi.put(`/${id}/`, category);
