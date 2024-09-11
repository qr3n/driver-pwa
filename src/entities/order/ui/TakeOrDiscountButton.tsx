'use client';

import { TakeOrder } from "@/features/order/take/ui/TakeOrder";
import { Button } from "@/shared/shadcn/ui/button";
import { useContext, useEffect } from "react";
import { IOrder, OrderTakeOrDiscountContext } from "@/entities/order";
import { useClientSession } from "@/entities/session/client";
import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/shared/api/services/order";
import Link from "next/link";
import { revalidateTagFrontend } from "@/shared/api";
import { CheckCircleIcon } from "lucide-react";
import { BiCheckCircle } from "react-icons/bi";

interface IProps {
    order: IOrder,
    currentOrder: IOrder | null,
}

export const TakeOrDiscountButton = (props: IProps) => {
    const session = useClientSession()
    const { takeOrDiscountLoading, takeOrDiscount } = useContext(OrderTakeOrDiscountContext)
    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: orderService.makeCurrent,
        mutationKey: ['make_current']
    })

    useEffect(() => {
        if (isSuccess) {
            revalidateTagFrontend('current_orders')
        }
    }, [isSuccess]);

    if (props.order.driver_email === session?.email) {
        return props.currentOrder ?  (
            props.currentOrder.id === props.order.id ? (
                <Link href={'/orders/active'} className='z-50 w-full'>
                    <Button
                        className='text-white font-medium p-4 z-20 w-full'>
                        Ваш текущий заказ
                    </Button>
                </Link>
            ) : (
                props.order.status === 'active' ? <Button
                    className='text-white bg-[#333] hover:bg-[#444] font-medium p-4 z-20'>
                    Это ваш заказ
                </Button> : <Button
                    className='text-white bg-[#333] hover:bg-[#444] font-medium p-4 z-20'>
                    <CheckCircleIcon/>
                </Button>
            )
        ) : (
            props.order.status === 'active' ? <Button
                onClick={() => mutate({
                    token: session?.token,
                    order_id: props.order.id
                })}
                isLoading={isPending}
                className='text-white p-4 z-20'>
                Начать выполнение
            </Button> : <Button
                className='text-white font-medium p-4 z-20'>
                <BiCheckCircle className='w-6 h-6'/>
            </Button>
        )
    }

    return (
        <>
            { takeOrDiscountLoading ?  <Button
                isLoading
                className='text-white bg-blue-500 hover:bg-blue-400 font-semibold p-4 z-20'
            />
            : (
                    takeOrDiscount === 'take' ? <TakeOrder order_id={props.order.id}/> : <Button
                    className='text-white bg-blue-500 hover:bg-blue-400 font-semibold p-4 z-20'
                >
                    Скидка
                </Button>
            ) }
        </>
    )
}
