'use server';

import { IOrder } from "@/entities/order";
import { useServerSession } from "@/entities/session/server";

const createDate = (date: Date) => {
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
}

interface INotParsedOrder {
    id: number
    email: string
    name: string,
    cargo: 'anything' | 'marketplace',
    warehouse: 'Яндекс маркет' | 'Ozon' | 'AliExpress' | 'Lamoda' | 'Wildberries',
    what_to_deliver: string,
    packing: 'box' | 'palette',
    dimensions: string,
    time_to_take: string,
    time_to_deliver: string,
    addr_to: string,
    addr_from: string,
    comment: string,
    status: 'active' | 'disabled',
    cost: number,
    count: string,
    sender_phone: string,
    recipient_phone: string,
    courier_status: 'В пути' | 'Поиск курьера',
    tariff: 'day' | 'night',
    auction: boolean,
    timestamp: string,
    driver_email: string,
    current: boolean
}

export const useCurrentOrder = async () => {
    const session = useServerSession()

    const data = await fetch(
        `https://postavan.com/api/order/current?token=${session?.token}`,
        { cache: 'no-cache', next: { tags: ['current_orders'] } }
    )

    const order: IOrder | null = await data.json()

    console.log('order')

    return order
}


export const useOrders = async () => {
    const session = useServerSession()

    const data = await fetch(
        'https://postavan.com/api/orders/all?admin_token=secret',
        { cache: 'no-cache', next: { tags: ['orders'] } }
    )

    const notSortedOrders: INotParsedOrder[] = await data.json()

    notSortedOrders.map(o => console.log(o.driver_email, o.id, o.courier_status))

    const newNotSortedOrders: IOrder[] = notSortedOrders.map(o => {
        const date = new Date(Date.parse(o.timestamp));

        return {
            ...o,
            timestamp: date
        }
    })

    const orders = newNotSortedOrders.reverse()

    const activeOrders = orders.filter(o => (
        (o.courier_status === 'Поиск курьера' || o.courier_status === null) && (o.status !== 'disabled')
    ) && o.driver_email !== session?.email)

    const now = createDate(new Date())

    const todayOrders = activeOrders.filter(order => {
        const date = order.time_to_take.replace(/\s.*/, "");

        return now === date
    })

    const plannedOrders = activeOrders.filter(order => {
        const date = order.time_to_take.replace(/\s.*/, "");
        return now !== date
    })

    const extractDateTime = (time_to_take: string): Date | null => {
        const dateMatch = time_to_take.match(/(\d{2})\.(\d{2})\.(\d{4}) с (\d{2}):(\d{2})/);
        if (dateMatch) {
            const [_, day, month, year, hour, minute] = dateMatch;
            return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
        }
        return null;
    };

    todayOrders.sort((a, b) => {
        const isASooner = a.time_to_take.includes("как можно быстрее");
        const isBSooner = b.time_to_take.includes("как можно быстрее");

        if (isASooner && !isBSooner) {
            return -1; // a выше
        } else if (!isASooner && isBSooner) {
            return 1; // b выше
        } else if (!isASooner && !isBSooner) {
            const dateA = extractDateTime(a.time_to_take);
            const dateB = extractDateTime(b.time_to_take);

            if (dateA && dateB) {
                return dateA.getTime() - dateB.getTime();
            }
        }
        return 0;
    });

    plannedOrders.sort((a, b) => {
        const isASooner = a.time_to_take.includes("как можно быстрее");
        const isBSooner = b.time_to_take.includes("как можно быстрее");

        if (isASooner && !isBSooner) {
            return -1; // a выше
        } else if (!isASooner && isBSooner) {
            return 1; // b выше
        } else if (!isASooner && !isBSooner) {
            const dateA = extractDateTime(a.time_to_take);
            const dateB = extractDateTime(b.time_to_take);

            if (dateA && dateB) {
                return dateA.getTime() - dateB.getTime();
            }
        }
        return 0;
    });

    const myOrders = orders.filter(o => o.driver_email === session?.email && o.status !== 'disabled' && o.courier_status !== 'Заказ выполнен').sort((a, b) => {
        if (a.current && !b.current) return -1;
        if (!a.current && b.current) return 1;
        return 0;
    });

    const completedOrders = orders.filter(o => o.driver_email === session?.email && o.status === 'disabled' && o.courier_status === 'Заказ выполнен').sort((a, b) => {
        if (a.current && !b.current) return -1;
        if (!a.current && b.current) return 1;
        return 0;
    });

    return {
        orders: activeOrders,
        todayOrders,
        plannedOrders,
        myOrders: myOrders,
        completedOrders
    }
}

