import axios from 'axios'
import { QueryClient } from "@tanstack/react-query";

export const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
})

export const queryClient = new QueryClient()
