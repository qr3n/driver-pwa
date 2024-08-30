import axios from 'axios'
import { QueryClient } from "@tanstack/react-query";

export const driverApi = axios.create({
    baseURL: 'https://postavan.com/api/driver',
    timeout: 10000,
})

export const baseApi = axios.create({
    baseURL: 'https://postavan.com/api',
    timeout: 10000,
})

export const queryClient = new QueryClient()
