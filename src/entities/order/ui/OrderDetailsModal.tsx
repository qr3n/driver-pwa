'use client';

import { PropsWithChildren, useState } from "react";
import { calculateCost, calculateDistance, IOrder, OrderDetailsContext } from "@/entities/order";
import { Dialog, DialogContent } from "@/shared/shadcn/ui/dialog";
import { Button } from "@/shared/shadcn/ui/button";

export const OrderDetailsModal = ({ children }: PropsWithChildren) => {
    const [orderDetails, setOrderDetails] = useState<IOrder>();

    return (
        <OrderDetailsContext.Provider value={{
            orderDetails,
            setOrderDetails,
        }}>
            <Dialog>
                { children }

                <DialogContent className='bg-[#161616] h-[100dvh] sm:h-[80dvh] sm:max-h-[80dvh] flex flex-col'>
                    { orderDetails && (
                        <>
                            <div className='mt-5'>
                                <h1 className='text-3xl text-center font-semibold'>{calculateCost(orderDetails.cost, orderDetails.tariff)} руб.</h1>
                                <h1 className='text-center text-[#999]'>~{calculateDistance(orderDetails.cost)} км</h1>
                            </div>
                            <div className='w-full h-full max-h-[calc(80dvh-150px)] pb-4 pt-2 overflow-y-auto px-6'>
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
                            </div>

                            <div className='relative w-full h-[50px] pt-12'>
                                <button className="wrapper">
                                    <p className="wave-btn text-sm"><span>Скидка</span></p>
                                </button>
                            </div>

                            <Button
                                className='text-white bg-[#222] hover:bg-[#333] border border-[#555] w-full font-semibold p-4 z-20'
                            >
                                Забронировать
                            </Button>

                            <p className='text-center text-sm text-[#999]'>До конца аукциона осталось <span className='text-white'>45 мин.</span></p>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </OrderDetailsContext.Provider>
    )
}