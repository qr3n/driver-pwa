'use client';

import { Button } from "@/shared/shadcn/ui/button";
import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/shared/api/services/order";
import { useEffect } from "react";
import { revalidateTagFrontend } from "@/shared/api";
import toast from "react-hot-toast";

const statuses = ['Курьер назначен', 'В пути', 'На погрузке', 'Выполняет', 'Заказ выполнен']

export const OrderNextStep = ({ currentStatus, order_id }: { currentStatus: string, order_id: number }) => {
    const { mutate, isSuccess, isPending } = useMutation({
        mutationFn: orderService.changeStatus,
        mutationKey: ['change_status']
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success('Вы перешли на следующий этап')
            revalidateTagFrontend('current_orders')
        }
    }, [isSuccess]);

    return (
        <Button isLoading={isPending} className='w-full mt-12 place-self-end justify-self-end' onClick={() => mutate({
            order_id: order_id,
            status: statuses[statuses.indexOf(currentStatus) + 1]
        })}>
            Подтвердить
        </Button>
    )
}