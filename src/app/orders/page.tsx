import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/shadcn/ui/tabs";
import { Order, useOrders } from "@/entities/order";
import { OrdersList } from "./OrdersList";

export default async function DashboardPage() {
    const { todayOrders, plannedOrders } = await useOrders()

    return (
        <div className='flex flex-col w-full items-center justify-center pt-12 px-4'>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Открытые заказы</h1>
            <Tabs defaultValue='today' className='mt-8 w-full flex flex-col items-center'>
                <TabsList>
                    <TabsTrigger value='today'>Текущие</TabsTrigger>
                    <TabsTrigger value='planned'>Запланированные</TabsTrigger>
                    <TabsTrigger value='taked'>В работе</TabsTrigger>
                </TabsList>

                <TabsContent value='today' className='w-full max-w-3xl'>
                    <OrdersList>
                        {todayOrders.map(order => <Order key={order.id} {...order}/>)}
                    </OrdersList>
                </TabsContent>

                <TabsContent value='planned' className='w-full max-w-3xl'>
                    <OrdersList>
                        {plannedOrders.map(order => <Order key={order.id} {...order}/>)}
                    </OrdersList>
                </TabsContent>

                <TabsContent value='taked' className='w-full max-w-3xl'>
                    <OrdersList>
                        {plannedOrders.map(order => <Order key={order.id} {...order}/>)}
                    </OrdersList>
                </TabsContent>
            </Tabs>
        </div>
    )
}
