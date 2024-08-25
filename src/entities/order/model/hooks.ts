import { IOrder } from "@/entities/order";

const createDate = (date: Date) => {
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
}

export const useOrders = async () => {
    const data = await fetch(
        'https://postavan.com/api/orders/all?admin_token=secret',
        { cache: 'no-cache', next: { tags: ['orders'] } }
    )


    const notSortedOrders: IOrder[] = await data.json()

    const orders = notSortedOrders.reverse()

    const activeOrders = orders.filter(o => o.courier_status === 'Поиск курьера' || o.courier_status === null)

    const now = createDate(new Date())

    const todayOrders = activeOrders.filter(order => {
        const date = order.time_to_take.replace(/\s.*/, "");
        return now === date
    })

    const plannedOrders = activeOrders.filter(order => {
        const date = order.time_to_take.replace(/\s.*/, "");
        return now !== date
    })

    return {
        orders: activeOrders,
        todayOrders,
        plannedOrders
    }
}