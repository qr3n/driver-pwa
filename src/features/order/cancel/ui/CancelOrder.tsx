'use client';

import { Button } from "@/shared/shadcn/ui/button";
import { GiCancel } from "react-icons/gi";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/shadcn/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/shadcn/ui/select";
import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/shared/api/services/order";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { revalidateTagFrontend } from "@/shared/api";

export const CancelOrder = ({ id, email }: { id: string, email: string }) => {
    const [reason, setReason] = useState('')
    const [comment, setComment] = useState('')
    const [open, setOpen] = useState(false)

    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: orderService.cancel,
        mutationKey: ['cancel_order']
    })

    useEffect(() => {
        if (isSuccess) {
            revalidateTagFrontend('orders')
            toast.success('Заказ отменен')
            setOpen(false)
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error('Что-то пошло не так...')
        }
    }, [isError])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className='w-full'>
                <Button className='bg-[#333] w-full hover:bg-[#404040] mt-4'>
                    Отменить
                    <GiCancel className='w-4.5 h-4.5 text-red-500'/>
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-[#111] h-[100dvh] sm:h-auto flex flex-col'>
                <h1 className='text-3xl text-center font-semibold mt-5'>Отменить заказ?</h1>
                <div className='w-full h-full sm:h-auto'>
                    <Select value={reason} onValueChange={v => setReason(v)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Причина отмены" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Не могу выполнить">Не могу выполнить</SelectItem>
                            <SelectItem value="Адрес указан неверно">Адрес указан неверно</SelectItem>
                            <SelectItem value="Клиент отказался платить">Клиент отказался платить</SelectItem>
                            <SelectItem value="Технические проблемы">Технические проблемы</SelectItem>
                        </SelectContent>
                    </Select>
                    <textarea value={comment} onChange={e => setComment(e.target.value)} className='w-full h-[150px] bg-[#222] mt-4 resize-none outline-none border-none px-3 py-2 rounded-2xl' placeholder='Комментарий'/>
                </div>
                <Button disabled={!reason} isLoading={isPending} className='bg-red-500 w-full hover:bg-[#404040] mt-4' onClick={() => {
                    mutate({
                        order_id: id,
                        reason: reason,
                        comment: comment
                    })
                }}>
                    Подтвердить отмену
                    <GiCancel className='w-4.5 h-4.5 text-white'/>
                </Button>
            </DialogContent>
        </Dialog>
    )
}