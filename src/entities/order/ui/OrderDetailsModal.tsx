'use client';

import { PropsWithChildren, useEffect, useState } from "react";
import { calculateCost, calculateDistance, IOrder, OrderDetailsContext } from "@/entities/order";
import { Dialog, DialogClose, DialogContent } from "@/shared/shadcn/ui/dialog";
import { CreateOrderDiscount } from "@/features/order/discount";
import { useClientSession } from "@/entities/session/client";
import { aliIcon, lamodaIcon, ozonIcon, questionIcon, wildberriesIcon, yandexIcon } from "@/shared/assets";
import Image from "next/image";
import { useCurrentTime } from "@/shared/hooks/useCurrentTime";
import { OrderTakeOrDiscount } from "@/entities/order/ui/OrderTakeOrDiscount";

const imagesMap = {
    'Яндекс маркет': yandexIcon,
    'Ozon': ozonIcon,
    'AliExpress': aliIcon,
    'Lamoda': lamodaIcon,
    'Wildberries': wildberriesIcon
}

interface IProps extends PropsWithChildren {
    currentOrder?: IOrder | null,
    currentOrders: IOrder[]
}

export const OrderDetailsModal = ({ children, currentOrders }: IProps) => {
    const session = useClientSession()
    const [state, setState] = useState<'take' | 'discount'>('take')
    const [orderDetails, setOrderDetails] = useState<IOrder>();
    const [takeOrDiscount, setTakeOrDiscount] = useState<'take' | 'discount'>();
    const [orderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false)
    const [timeLeft, setTimeLeft] = useState(15)
    const { currentTime, isCurrentTimeLoading } = useCurrentTime()

    // useEffect(() => {
    //     if (currentTime && orderDetails) {
    //         const differenceInMilliseconds = Math.abs(currentTime.getTime() - orderDetails.timestamp.getTime());
    //         const difference = differenceInMilliseconds / 1000 / 60;
    //
    //         setTimeLeft(Math.round(difference))
    //         setState(difference < 15 ? 'discount' : 'take');
    //     }
    // }, [currentTime, orderDetails]);

    useEffect(() => {
        if (state === 'discount') {
            const interval = setInterval(() => {
                setTimeLeft(prev => (prev > 1) ? prev - 1 : prev)
            }, 1000 * 60)

            return () => clearInterval(interval)
        }
    }, [state]);


    return (
        <OrderDetailsContext.Provider value={{
            orderDetails,
            setOrderDetails,
            orderDetailsModalOpen,
            setOrderDetailsModalOpen,
            setTakeOrDiscount,
            setTimeLeft
        }}>
            <Dialog open={orderDetailsModalOpen} onOpenChange={setOrderDetailsModalOpen}>
                { children }

                <DialogContent className='bg-[#111] h-[100dvh] sm:h-[80dvh] sm:max-h-[80dvh] flex flex-col'>
                    { orderDetails && (
                        <>
                            <div className='mt-5'>
                                <div className='flex gap-4 items-center justify-center'>
                                    <Image
                                        src={orderDetails.shipment_type === 'anything' ? questionIcon : imagesMap[orderDetails.marketplace]}
                                        placeholder='blur'
                                        alt={'icon'}
                                        width={36}
                                        height={36}
                                        className='rounded-xl object-cover h-max'
                                    />
                                    <h1 className='text-3xl text-center font-semibold'>{orderDetails.cost} руб.</h1>
                                </div>
                                <h1 className='text-center text-[#999]'>{orderDetails.distance} км</h1>
                            </div>
                            <div
                                className='w-full h-full max-h-[calc(100dvh-150px)] sm:max-h-[calc(80dvh-150px)] pb-4 pt-2 overflow-y-auto px-6'>
                                <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                                <h1 className='text-xl text-[#999]  mt-4'>Откуда забрать</h1>
                                <p className='mt-1 font-medium'>{orderDetails.pickup_addresses.join(', ')}</p>
                                <h1 className='text-xl text-[#999]  mt-4'>Куда доставить</h1>
                                <p className='mt-1 font-medium'>{orderDetails.delivery_addresses.join(', ')}</p>
                                {/*{orderDetails.driver_email === session?.email && (*/}
                                {/*    <>*/}
                                {/*        <h1 className='text-xl text-[#999]  mt-4'>Номер отправителя</h1>*/}
                                {/*        <a href={`tel:+7${orderDetails.sender_phone.replace('+7', '')}`}*/}
                                {/*           className='text-blue-400 mt-1 font-medium'>+7{orderDetails.sender_phone.replace('+7', '')}</a>*/}
                                {/*        <h1 className='text-xl text-[#999]  mt-4'>Номер получателя</h1>*/}
                                {/*        <a href={`tel:+7${orderDetails.recipient_phone.replace('+7', '')}`}*/}
                                {/*           className='text-blue-400 mt-1 font-medium'>+7{orderDetails.recipient_phone.replace('+7', '')}</a>*/}
                                {/*    </>*/}
                                {/*)}*/}

                                <div className='w-full h-[1px] bg-[#444] rounded-full mt-6'/>

                                <h1 className='text-2xl text-white font-semibold mt-6'>Дата и время</h1>
                                <h1 className='text-xl text-[#999] mt-4'>Когда забрать</h1>
                                <p className='mt-1 font-medium'>{orderDetails.pickup_date} с {orderDetails.pickup_time_from} до {orderDetails.pickup_time_to}</p>
                                <h1 className='text-xl text-[#999] mt-4'>Когда доставить</h1>
                                <p className='mt-1 font-medium'>{orderDetails.delivery_date} с {orderDetails.delivery_time_from} до {orderDetails.delivery_time_to}</p>

                                <div className='w-full h-[1px] bg-[#444] rounded-full mt-6'/>

                                <h1 className='text-2xl text-white font-semibold mt-6'>Габариты</h1>
                                <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                                <p className='mt-1 font-medium'>{orderDetails.package_length}</p>
                                <h1 className='text-xl text-[#999] mt-4'>Ширина</h1>
                                <p className='mt-1 font-medium'>{orderDetails.package_width}</p>
                                <h1 className='text-xl text-[#999] mt-4'>Высота</h1>
                                <p className='mt-1 font-medium'>{orderDetails.package_height}</p>
                                <h1 className='text-xl text-[#999] mt-4'>Количество</h1>
                                <p className='mt-1 font-medium'>{orderDetails.places_count}</p>

                                <div className='w-full h-[1px] bg-[#444] rounded-full mt-6'/>

                                <h1 className='text-2xl text-white font-semibold mt-6'>Дополнительно</h1>
                                <h1 className='text-xl text-[#999] mt-4'>Комментарий</h1>
                                <p className='mt-1 font-medium'>{orderDetails.comment || 'Отсутствует'}</p>
                            </div>

                            {/*{orderDetails.driver_email === session?.email ? <></> : (takeOrDiscount === 'discount' ? <>*/}
                            {/*    <CreateOrderDiscount order_id={orderDetails.id}/><p*/}
                            {/*    className='text-center text-sm text-[#999]'>До конца аукциона осталось <span*/}
                            {/*    className='text-white'>{timeLeft} мин.</span></p></> : <DialogClose>*/}
                            {/*    <OrderTakeOrDiscount createdAt={orderDetails.timestamp}>*/}
                            {/*    <TakeOrDiscountButton currentOrders={currentOrders} order={orderDetails}/>*/}
                            {/*    </OrderTakeOrDiscount>*/}
                            {/*</DialogClose>) }*/}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </OrderDetailsContext.Provider>
    )
}