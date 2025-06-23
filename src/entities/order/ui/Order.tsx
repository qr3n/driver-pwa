'use client';

import { aliIcon, lamodaIcon, ozonIcon, questionIcon, wildberriesIcon, yandexIcon } from "@/shared/assets";
import { IOrder, getCurrentOrders } from "@/entities/order";
import Image from "next/image";
import { OpenOrderDetails } from "./OpenOrderDetails";
import { OrderTakeOrDiscount } from "@/entities/order/ui/OrderTakeOrDiscount";
import { TakeOrder } from "@/features/order/take/ui/TakeOrder";
import { Button } from "@/shared/shadcn/ui/button";
import { StartOrderProgress } from "@/features/order/start-progress/ui/StartOrderProgress";
import Link from "next/link";
import { CancelOrder } from "@/features/order/cancel/ui/CancelOrder";
import { useClientSession } from "@/entities/session/client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/shadcn/ui/dialog";
import { NewChat } from "@/shared/ui/chat/ui/NewChat";
import { BsChatFill } from "react-icons/bs";
import { LeaveFeedback } from "@/features/feedback/leave/ui/LeaveFeedback";

const imagesMap = {
    'Яндекс маркет': yandexIcon,
    'Ozon': ozonIcon,
    'AliExpress': aliIcon,
    'Lamoda': lamodaIcon,
    'Wildberries': wildberriesIcon
}

export const Order = (data: IOrder) => {
    const session = useClientSession()

    return (
        <div
            className='relative shadow-2xl cursor-pointer w-full bg-[#151515] flex flex-col-reverse sm:flex-row-reverse sm:items-center gap-4 justify-between hover:bg-[#222] p-4 rounded-3xl'>
            <OrderTakeOrDiscount>
                <OpenOrderDetails {...data}/>
                <div className='flex gap-4'>
                   <div className='z-40'>
                       {!data.active && <LeaveFeedback order={data}/>}
                   </div>

                    <div className='sm:max-w-min z-20'>
                        { !data.active ? <Button>Заказ закрыт</Button> : !data.driver_id ? <TakeOrder order_id={data.id}/> : data.status === 'Заказ выполнен' ? <Button>Выполнен</Button> : data.is_in_progress ? <Link href={`/orders/active/${data.id}`}><Button>В работе</Button></Link> : <StartOrderProgress order_id={data.id}/>}
                        { data.active && data.driver_id === session?.id && <CancelOrder id={data.id} email={data.driver_id}/>}
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={'w-10 z-50 p-3  bg-zinc-700 sm:h-10  flex items-center justify-center'}>
                                <BsChatFill className='w-8 h-8'/>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Чат с клиентом</DialogTitle>
                                <DialogDescription>Вы подключены</DialogDescription>
                            </DialogHeader>
                            <NewChat
                                userType={'driver'}
                                userId={session?.id || ''}
                                targetId={data.user_id}
                                userName={''}
                                targetName={''}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </OrderTakeOrDiscount>


            <div className='flex gap-4 items-center sm:justify-center'>
                <Image
                    src={data.shipment_type === 'anything' ? questionIcon : imagesMap[data.marketplace]}
                    placeholder='blur'
                    alt={'icon'}
                    width={48}
                    height={48}
                    className='rounded-xl object-cover h-max'
                />
                <div>


                    <h1 className='font-semibold'>
                        {data.pickup_date} <span
                        className='text-zinc-300'>с</span> {`${data.pickup_time_from}`} <span
                        className='text-zinc-300'>до</span> {`${data.pickup_time_to}`}
                    </h1>
                    <p className='p-3 bg-[#333] border border-[#555] w-full max-w-[400px] rounded-xl text-[#ddd] font-medium text-sm mt-1 '>
                        {data.pickup_addresses[0].replace('г Москва,', '')}
                        <span className='font-normal text-[#aaa]'> до</span> {data.delivery_addresses[0].replace('г Москва,', '')}
                    </p>
                    <h1 className='text-center bg-blue-900  text-white font-medium text-xs px-4 py-1 mt-3 w-max rounded-full'>
                        {data.cost} руб.
                    </h1>
                </div>
            </div>
        </div>
    )
}