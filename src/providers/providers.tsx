'use client';

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api";
import { PropsWithChildren } from "react";
import { NotificationProvider } from "@/providers/notification/ui/NotificationProvider";

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <NotificationProvider>
            <QueryClientProvider client={queryClient}>
                { children }
            </QueryClientProvider>
        </NotificationProvider>
    )
}
