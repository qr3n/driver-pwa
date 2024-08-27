import axios from 'axios'
import { QueryClient } from "@tanstack/react-query";

export const api = axios.create({
    baseURL: 'https://stubbybot.ru',
    timeout: 10000,
})

export const queryClient = new QueryClient()
