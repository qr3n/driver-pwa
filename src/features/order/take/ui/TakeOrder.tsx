'use client';

import { Button } from "@/shared/shadcn/ui/button";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/shared/api/services/order";
import { useClientSession } from "@/entities/session/client";
import { useEffect } from "react";
import { revalidateTagFrontend } from "@/shared/api";

export const TakeOrder = ({ order_id }: { order_id: number }) => {
    const session = useClientSession()
    const { mutate, isSuccess, isPending, isError } = useMutation({
        mutationFn: orderService.take,
        mutationKey: ['take_order']
    })

    useEffect(() => {
        if(isSuccess) {
            toast.success("Заказ забронирован")
            revalidateTagFrontend('orders')
        }
    }, [isSuccess]);

    useEffect(() => {
        if(isError) {
            toast.error('Кто-то уже взял этот заказ')
            revalidateTagFrontend('orders')
        }
    }, [isError]);

    if (!session) return <></>

    return (
        <Button
            isLoading={isPending}
            onClick={() => mutate({
                token: session?.token,
                order_id: order_id
            })}
            className='text-white w-full bg-blue-500 hover:bg-blue-400 font-semibold p-4 z-20'
        >
            Забронировать
        </Button>
    )
}