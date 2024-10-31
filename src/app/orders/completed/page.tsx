import { useCurrentOrder, useCurrentOrders, useOrders } from "@/entities/order";
import { OrdersList } from "@/app/orders/OrdersList";
import { OrdersRender } from "@/app/orders/OrdersRender";
import { OrderDetailsModal } from '@/entities/order'

export default async function CompletedOrdersPage() {
    const { completedOrders } = await useOrders()
    const currentOrders = await useCurrentOrders()

    return (
        <div className='flex flex-col w-full items-center justify-center pt-20 md:pt-24 px-4'>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Закрытые заказы</h1>

            <div className='sm:mt-8 flex flex-col items-center w-full max-w-3xl'>
                <OrderDetailsModal currentOrders={currentOrders}>
                    <OrdersList>
                        <OrdersRender orders={completedOrders} type='taken'/>
                    </OrdersList>
                </OrderDetailsModal>
            </div>
        </div>
    )
}