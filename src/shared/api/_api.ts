import axios from 'axios'
import { QueryClient } from "@tanstack/react-query";

export const driverApi = axios.create({
    baseURL: 'https://primibox.com/api/driver/api/driver',
    timeout: 10000,
})

export const baseApi = axios.create({
    baseURL: 'https://primibox.com/api/driver/api/driver',
    timeout: 10000,
})

export const queryClient = new QueryClient()

baseApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
