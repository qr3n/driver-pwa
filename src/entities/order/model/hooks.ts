'use server';

import { IOrder } from "@/entities/order";
import { getServerSession } from "@/entities/session/server";

interface INotParsedOrder {
    id: string,
    recipient_phone: string;
    package_width: number;
    pickup_addresses: string[];
    package_length: number;
    package_height: number;
    places_count: number;
    weight: number;
    driver_id: string;
    comment: string;
    user_id: string;
    shipment_type: 'marketplace' | 'anything';
    what_to_deliver: string[];
    marketplace: 'Яндекс маркет' | 'Wildberries' | 'Ozon' | 'AliExpress' | 'Lamoda';
    cost: number;
    delivery_addresses: string[];
    packing_type: 'box' | 'palette';
    sender_phone: string;
    status: 'Поиск курьера' | 'Курьер назначен' | 'В пути' | 'На погрузке' | 'Выполняет' | 'Заказ выполнен' | 'Отменен'
    active: boolean,
    pickup_date: string,
    delivery_date: string,
    pickup_time_from: string,
    pickup_time_to: string,
    delivery_time_from: string,
    delivery_time_to: string,
    is_in_progress: boolean,
    distance: number
}

export const getCurrentOrders = async () => {
    const session = getServerSession()

    const data = await fetch(
        'https://primibox.com/api/driver/api/driver/orders',
        { cache: 'no-cache', next: { tags: ['orders'] } }
    )

    const notSortedOrders: INotParsedOrder[] = await data.json()
    const orders = notSortedOrders.reverse()

    return orders.filter(order => order.driver_id === session?.id && order.status !== 'Заказ выполнен' && order.is_in_progress && order.status !== 'Отменен')
}

// export const useCurrentOrder = async () => {
//     const session = useServerSession()
//
//     const data = await fetch(
//         `https://primibox.com/api/driver/api/order/current?token=${session?.token}`,
//         { cache: 'no-cache', next: { tags: ['current_orders'] } }
//     )
//
//     const order: IOrder | null = await data.json()
//
//     return order?.status !== 'disabled' ? order : null
// }

export const getCurrentOrder = async (id: string) => {
    const session = getServerSession()

    const data = await fetch(
        `https://primibox.com/api/driver/api/driver/orders/${id}`,
        { cache: 'no-cache', next: { tags: ['current_orders'] }, headers: { 'Authorization': `Bearer ${session?.token}`} }
    )

    const order: IOrder | null = await data.json()

    return order
}



export const getOrders = async () => {
    const session = getServerSession()

    const data = await fetch(
        'https://primibox.com/api/driver/api/driver/orders',
        { cache: 'no-cache', next: { tags: ['orders'] } }
    )

    const notSortedOrders: INotParsedOrder[] = await data.json()


    const orders = notSortedOrders.reverse()
    const activeOrders = orders.filter(o => ((o.status === 'Поиск курьера') && o.active) && o.driver_id !== session?.id)

    const now = new Date().toISOString().split('T')[0]
    const todayOrders = activeOrders.filter(order => now === order.pickup_date)
    const plannedOrders = activeOrders.filter(order => now !== order.pickup_date)

    // const myOrders = notSortedOrders.filter(order => order.driver_id === session?.id)


    //
    //
    //

    //

    //
    // const extractDateTime = (time_to_take: string): Date | null => {
    //     const dateMatch = time_to_take.match(/(\d{2})\.(\d{2})\.(\d{4}) с (\d{2}):(\d{2})/);
    //     if (dateMatch) {
    //         const [_, day, month, year, hour, minute] = dateMatch;
    //         return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
    //     }
    //     return null;
    // };
    //
    // todayOrders.sort((a, b) => {
    //     const isASooner = a.time_to_take.includes("как можно быстрее");
    //     const isBSooner = b.time_to_take.includes("как можно быстрее");
    //
    //     if (isASooner && !isBSooner) {
    //         return -1; // a выше
    //     } else if (!isASooner && isBSooner) {
    //         return 1; // b выше
    //     } else if (!isASooner && !isBSooner) {
    //         const dateA = extractDateTime(a.time_to_take);
    //         const dateB = extractDateTime(b.time_to_take);
    //
    //         if (dateA && dateB) {
    //             return dateA.getTime() - dateB.getTime();
    //         }
    //     }
    //     return 0;
    // });
    //
    // plannedOrders.sort((a, b) => {
    //     const isASooner = a.time_to_take.includes("как можно быстрее");
    //     const isBSooner = b.time_to_take.includes("как можно быстрее");
    //
    //     if (isASooner && !isBSooner) {
    //         return -1; // a выше
    //     } else if (!isASooner && isBSooner) {
    //         return 1; // b выше
    //     } else if (!isASooner && !isBSooner) {
    //         const dateA = extractDateTime(a.time_to_take);
    //         const dateB = extractDateTime(b.time_to_take);
    //
    //         if (dateA && dateB) {
    //             return dateA.getTime() - dateB.getTime();
    //         }
    //     }
    //     return 0;
    // });
    //
    const myOrders = orders.filter(o => o.driver_id === session?.id && o.active && o.status !== 'Заказ выполнен')
        // .sort((a, b) => {
        //     if (a.current && !b.current) return -1;
        //     if (!a.current && b.current) return 1;
        //     return 0;
        // });

    //
    // const completedOrders = orders.filter(o => o.driver_email === session?.email && (o.status === 'disabled' || o.courier_status === 'Заказ выполнен')).sort((a, b) => {
    //     if (a.current && !b.current) return -1;
    //     if (!a.current && b.current) return 1;
    //     return 0;
    // });

    return {
        orders: notSortedOrders,
        todayOrders,
        plannedOrders,
        completedOrders: notSortedOrders.filter(o => (o.status === 'Заказ выполнен' || o.status === 'Отменен' || !o.active) && o.driver_id === session?.id),
        myOrders,
        notSortedOrders
    }
}

