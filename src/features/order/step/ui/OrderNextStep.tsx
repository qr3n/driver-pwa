'use client';

import { Button } from "@/shared/shadcn/ui/button";
import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/shared/api/services/order";
import { useEffect } from "react";
import { revalidateTagFrontend } from "@/shared/api";
import toast from "react-hot-toast";
import { DialogClose } from "@/shared/shadcn/ui/dialog";

const statuses = ['Курьер назначен', 'В пути', 'На погрузке', 'Выполняет', 'Заказ выполнен']

export const OrderNextStep = ({ currentStatus, order_id }: { currentStatus: string, order_id: number }) => {
    const { mutate, isSuccess, isPending, isError } = useMutation({
        mutationFn: orderService.changeStatus,
        mutationKey: ['change_status']
    })

    useEffect(() => {
        if (isSuccess) {
            revalidateTagFrontend('current_orders')
            toast.success('Вы перешли на следующий этап')
        }
    }, [isSuccess]);


    useEffect(() => {
        if (isError) {
            toast.error('Что-то пошло не так...')
        }
    }, [isError]);

    return (
        <DialogClose>
            <Button isLoading={isPending} className='w-full mt-12 place-self-end justify-self-end' onClick={() => mutate({
                order_id: order_id,
                status: statuses[statuses.indexOf(currentStatus) + 1]
            })}>
                Подтвердить
            </Button>
        </DialogClose>
    )
}