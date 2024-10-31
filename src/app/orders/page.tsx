import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/shadcn/ui/tabs";
import { OrderDetailsModal, useCurrentOrder, useCurrentOrders } from "@/entities/order";
import { useOrders } from "@/entities/order";
import { OrdersList } from "./OrdersList";
import { OrdersRender } from "./OrdersRender";
import { UpdateOrdersWebsocket } from "@/app/orders/UpdateOrdersWebsocket";

export default async function DashboardPage() {
    const { todayOrders, plannedOrders, myOrders } = await useOrders()
    const currentOrders = await useCurrentOrders()

    return (
        <div className='flex flex-col w-full items-center justify-center pt-20 md:pt-24 px-4'>
            <UpdateOrdersWebsocket/>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Все заказы</h1>
            <Tabs defaultValue='taked' className='mt-5 sm:mt-8 w-full flex flex-col items-center'>
                <TabsList>
                    <TabsTrigger value='today' className='text-xs sm:text-sm'>На сегодня</TabsTrigger>
                    <TabsTrigger value='planned' className='text-xs sm:text-sm'>Запланированные</TabsTrigger>
                    <TabsTrigger value='taked' className='text-xs sm:text-sm'>В работе</TabsTrigger>
                </TabsList>

                <OrderDetailsModal currentOrders={currentOrders}>
                    <TabsContent value='today' className='w-full max-w-3xl'>
                        <OrdersList>
                            <OrdersRender orders={todayOrders} type='active'/>
                        </OrdersList>
                    </TabsContent>

                    <TabsContent value='planned' className='w-full max-w-3xl'>
                        <OrdersList>
                            <OrdersRender orders={plannedOrders} type='planned'/>
                        </OrdersList>
                    </TabsContent>

                    <TabsContent value='taked' className='w-full max-w-3xl'>
                        <OrdersList>
                            <OrdersRender orders={myOrders} type='taken'/>
                        </OrdersList>
                    </TabsContent>
                </OrderDetailsModal>
            </Tabs>
        </div>
    )
}
