'use client';

import { getMessaging, getToken } from "firebase/messaging";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { notificationsService } from "@/shared/api/services/notifications/service";
import { useCookies } from "next-client-cookies";
import { useQuery } from "@tanstack/react-query";
import { app }                    from "@/shared/firebase/app";
import { Switch }                 from "@/shared/shadcn/ui/switch";
import { useClientSession }       from "@/entities/session/client";

export const SwitchNotificationsStatus = () => {
    const session = useClientSession()
    const cookies = useCookies()
    const notifications_status = cookies.get('notifications.driver')

    const [token, setToken] = useState('')
    const [enabled, setEnabled] = useState(notifications_status === 'enabled')

    const { data, isLoading, isError, refetch } = useQuery({
        queryFn: () => notificationsService.getConnection({ access_token: session?.token || '', token: token }),
        queryKey: ['connection'],
        enabled: false
    })

    useEffect(() => {
        async function getConnection() {
            const messaging = getMessaging(app)

            const permission = await Notification.requestPermission();

            if (permission === "granted") {
                const newToken = await getToken(messaging, {
                    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                });

                if (newToken) {
                    console.log('NEW TOKEN')

                    setToken(token)
                }
            }
        }

        if (notifications_status === 'enabled') {
            getConnection()
        }

    }, [notifications_status, refetch, token]);
    
    useEffect(() => {
        if (session?.token && !data && !isError) refetch()
    }, [data, isError, refetch, session?.token])
    
    useEffect(() => {
        if (data?.data) setEnabled(true)
    }, [data])

    useEffect(() => {
        refetch()
    }, [refetch, token])

    async function enableNotifications() {
        setEnabled(true)

        const messaging = getMessaging(app)

        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });

            notificationsService.addDevice({
                access_token: session?.token || '',
                token,
            })

            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .register("/firebase-messaging-sw.js")
                    .then((registration) => {
                        console.log("Service Worker registered:", registration);
                    })
                    .catch((error) => {
                        console.error("Service Worker registration failed:", error);
                    });
            }

            cookies.set('notifications.driver', 'enabled')

            toast.success('Уведомления включены!')

        } else if (permission === "denied") {
            toast.error('Уведомления запрещены.')
        }
    }

    function disableNotifications() {
        setEnabled(false)

        if ("serviceWorker" in navigator) {
            notificationsService.removeDevice({
                access_token: session?.token || '',
                id: data?.data.id
            })

            navigator.serviceWorker.getRegistration(
                "/firebase-messaging-sw.js"
            )
                .then(r => {
                    if (r) {
                        r.unregister()
                        cookies.set('notifications.driver', 'disabled')
                        toast.success('Уведомления отключены.')
                    }
                })
                .catch(() => toast.error('Ваш браузер не поддерживается.'))
        }
    }

    const onClick = () => {
        if (!enabled) enableNotifications()
        else disableNotifications()
    }

    return (
        <Switch disabled={!data} checked={enabled} onCheckedChange={onClick}/>
    )
}