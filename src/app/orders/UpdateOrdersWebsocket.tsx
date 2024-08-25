'use client';

import { useEffect } from "react";
import { revalidateTagFrontend } from "@/shared/api";

interface IWebsocketMessage {
    command: 'refresh_orders';
}

export const UpdateOrdersWebsocket = () => {
    useEffect(() => {
        const websocket = new WebSocket("wss://postavan.com/api/events");

        websocket.onmessage = (m) => {
            const data: IWebsocketMessage = JSON.parse(m.data);

            switch(data.command) {
                case 'refresh_orders':
                    revalidateTagFrontend('orders')
            }
        }
    }, []);

    return (
        <>

        </>
    )
}