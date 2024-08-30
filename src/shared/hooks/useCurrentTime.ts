'use client';

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useCurrentTime = () => {
    const { data, isLoading } = useQuery({
        queryFn: async () => axios.get('https://timeapi.io/api/time/current/zone?timeZone=Europe%2FLondon'),
        queryKey: ['currentTime']
    })

    const date = data?.data.dateTime
    const currentTime = date ? new Date(Date.parse(date)) : undefined;

    if (currentTime) {
        currentTime.setHours(currentTime.getHours() - 1);
    }

    return {
        currentTime,
        isCurrentTimeLoading: isLoading,
    }
}