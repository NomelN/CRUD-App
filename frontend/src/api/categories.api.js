import axios from 'axios';

const categoriesApi = axios.create({
    baseURL: 'http://localhost:8000/products/api/v1/categories/'
});

export const getAllCategories = () => categoriesApi.get('/');
export const getCategory = (id) => categoriesApi.get(`/${id}/`);
export const createCategory = (category) => categoriesApi.post('/', category);
export const deleteCategory = (id) => categoriesApi.delete(`/${id}/`);
export const updateCategory = (id, category) => categoriesApi.put(`/${id}/`, category);
