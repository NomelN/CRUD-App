import axios from 'axios'

const productsApi = axios.create({
    baseURL: 'http://localhost:8000/products/api/v1/products/'
})

productsApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAllProducts = () => productsApi.get('/');

export const getProduct = (id) => productsApi.get('/' + id + '/')

export const createProduct = (products) => productsApi.post('/', products);

export const deleteProduct = (id) => productsApi.delete('/' + id)

export const updateProduct = (id, product) => productsApi.put('/' + id + '/', product)
