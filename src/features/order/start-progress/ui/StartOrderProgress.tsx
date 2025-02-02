'use client';

import { Button } from "@/shared/shadcn/ui/button";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/shared/api/services/order";
import { useClientSession } from "@/entities/session/client";
import { useEffect } from "react";
import { revalidateTagFrontend } from "@/shared/api";

export const StartOrderProgress = ({ order_id }: { order_id: string }) => {
    const session = useClientSession()
    const { mutate, isSuccess, isPending, isError } = useMutation({
        mutationFn: orderService.startProgress,
        mutationKey: ['start_order']
    })

    useEffect(() => {
        if(isSuccess) {
            toast.success("Заказ в работе")
            revalidateTagFrontend('orders')
        }
    }, [isSuccess]);

    useEffect(() => {
        if(isError) {
            toast.error('Что то пошло не так')
            revalidateTagFrontend('orders')
        }
    }, [isError]);

    if (!session) return <></>

    return (
        <Button
            isLoading={isPending}
            onClick={() => mutate({
                order_id: order_id
            })}
            className='text-white w-full bg-blue-500 hover:bg-blue-400 font-semibold p-4 z-50'
        >
            Начать выполнение
        </Button>
    )
}