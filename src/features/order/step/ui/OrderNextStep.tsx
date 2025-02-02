'use client';

import { Button } from "@/shared/shadcn/ui/button";
import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/shared/api/services/order";
import { useEffect } from "react";
import { revalidateTagFrontend } from "@/shared/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const OrderNextStep = ({ order_id }: { currentStatus: string, order_id: string }) => {
    const router = useRouter()
    const { mutate, isSuccess, isPending, isError } = useMutation({
        mutationFn: orderService.nextStep,
        mutationKey: ['change_status']
    })

    useEffect(() => {
        if (isSuccess) {
            revalidateTagFrontend('current_orders')
            toast.success('Вы перешли на следующий этап')
            router.push('/orders/active')
        }
    }, [isSuccess, router]);


    useEffect(() => {
        if (isError) {
            toast.error('Что-то пошло не так...')
        }
    }, [isError]);

    return (
        <Button isLoading={isPending} className='w-full mt-12 place-self-end justify-self-end' onClick={() => mutate({
            order_id: order_id,
        })}>
            Подтвердить
        </Button>
    )
}