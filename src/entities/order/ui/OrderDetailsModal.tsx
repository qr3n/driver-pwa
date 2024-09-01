'use client';

import { PropsWithChildren, useEffect, useState } from "react";
import { calculateCost, calculateDistance, IOrder, OrderDetailsContext } from "@/entities/order";
import { Dialog, DialogClose, DialogContent } from "@/shared/shadcn/ui/dialog";
import { Button } from "@/shared/shadcn/ui/button";
import toast from "react-hot-toast";
import { CreateOrderDiscount } from "@/features/order/discount";
import { useClientSession } from "@/entities/session/client";
import { aliIcon, lamodaIcon, ozonIcon, questionIcon, wildberriesIcon, yandexIcon } from "@/shared/assets";
import Image from "next/image";
import { useCurrentTime } from "@/shared/hooks/useCurrentTime";

const imagesMap = {
    'Яндекс маркет': yandexIcon,
    'Ozon': ozonIcon,
    'AliExpress': aliIcon,
    'Lamoda': lamodaIcon,
    'Wildberries': wildberriesIcon
}

export const OrderDetailsModal = ({ children }: PropsWithChildren) => {
    const session = useClientSession()
    const [state, setState] = useState<'take' | 'discount'>()
    const [orderDetails, setOrderDetails] = useState<IOrder>();
    const [takeOrDiscount, setTakeOrDiscount] = useState<'take' | 'discount'>();
    const [orderDetailsModalOpen, setOrderDetailsModalOpen] = useState(false)
    const [timeLeft, setTimeLeft] = useState(15)
    const { currentTime, isCurrentTimeLoading } = useCurrentTime()

    useEffect(() => {
        if (currentTime && orderDetails) {
            const differenceInMilliseconds = Math.abs(currentTime.getTime() - orderDetails.timestamp.getTime());
            const difference = differenceInMilliseconds / 1000 / 60;

            setTimeLeft(Math.round(difference))
            setState(difference < 15 ? 'discount' : 'take');
        }
    }, [currentTime, orderDetails]);

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
                                        src={orderDetails.cargo === 'anything' ? questionIcon : imagesMap[orderDetails.warehouse]}
                                        placeholder='blur'
                                        alt={'icon'}
                                        width={36}
                                        height={36}
                                        className='rounded-xl object-cover h-max'
                                    />
                                    <h1 className='text-3xl text-center font-semibold'>{calculateCost(orderDetails.cost, orderDetails.tariff)} руб.</h1>
                                </div>
                                <h1 className='text-center text-[#999]'>~{calculateDistance(orderDetails.cost)} км</h1>
                            </div>
                            <div className='w-full h-full max-h-[calc(100dvh-150px)] sm:max-h-[calc(80dvh-150px)] pb-4 pt-2 overflow-y-auto px-6'>
                                <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                                <h1 className='text-xl text-[#999]  mt-4'>Откуда забрать</h1>
                                <p className='mt-1 font-medium'>{orderDetails.addr_from}</p>
                                <h1 className='text-xl text-[#999]  mt-4'>Куда доставить</h1>
                                <p className='mt-1 font-medium'>{orderDetails.addr_to}</p>

                                <div className='w-full h-[1px] bg-[#444] rounded-full mt-6'/>

                                <h1 className='text-2xl text-white font-semibold mt-6'>Дата и время</h1>
                                <h1 className='text-xl text-[#999] mt-4'>Когда забрать</h1>
                                <p className='mt-1 font-medium'>{orderDetails.time_to_take}</p>
                                <h1 className='text-xl text-[#999] mt-4'>Когда доставить</h1>
                                <p className='mt-1 font-medium'>{orderDetails.time_to_deliver}</p>

                                <div className='w-full h-[1px] bg-[#444] rounded-full mt-6'/>

                                <h1 className='text-2xl text-white font-semibold mt-6'>Габариты</h1>
                                <h1 className='text-xl text-[#999] mt-4'>Длина</h1>
                                <p className='mt-1 font-medium'>{orderDetails.dimensions.split(' ')[0]}</p>
                                <h1 className='text-xl text-[#999] mt-4'>Ширина</h1>
                                <p className='mt-1 font-medium'>{orderDetails.dimensions.split(' ')[1]}</p>
                                <h1 className='text-xl text-[#999] mt-4'>Высота</h1>
                                <p className='mt-1 font-medium'>{orderDetails.dimensions.split(' ')[2]}</p>
                                <h1 className='text-xl text-[#999] mt-4'>Количество</h1>
                                <p className='mt-1 font-medium'>{orderDetails.count === '0' ? '1' : orderDetails.count}</p>

                                <div className='w-full h-[1px] bg-[#444] rounded-full mt-6'/>

                                <h1 className='text-2xl text-white font-semibold mt-6'>Дополнительно</h1>
                                <h1 className='text-xl text-[#999] mt-4'>Комментарий</h1>
                                <p className='mt-1 font-medium'>{orderDetails.comment || 'Отсутствует'}</p>
                            </div>

                            {orderDetails.driver_email === session?.email ? <></> : (takeOrDiscount === 'discount' ? <>
                                <CreateOrderDiscount order_id={orderDetails.id}/><p
                                className='text-center text-sm text-[#999]'>До конца аукциона осталось <span
                                className='text-white'>{timeLeft} мин.</span></p></> : <DialogClose>
                                <Button
                                    onClick={() => {
                                        toast.success('Вы успешно взяли заказ.')
                                    }}
                                    className='text-white w-full font-semibold p-4 z-20'
                                >
                                    Забронировать
                                </Button>
                            </DialogClose>) }
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </OrderDetailsContext.Provider>
    )
}