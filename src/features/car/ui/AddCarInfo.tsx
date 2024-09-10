'use client';

import { Dialog, DialogContent, DialogTrigger } from "@/shared/shadcn/ui/dialog";
import { Button } from "@/shared/shadcn/ui/button";
import { Input } from "@/shared/shadcn/ui/input";
import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { accountService } from "@/shared/api/services/account";
import { useForm } from "react-hook-form";
import { useClientSession } from "@/entities/session/client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { revalidateTagFrontend } from "@/shared/api";

interface FormData {
    color: string,
    mark: string,
    num: string
}

export const AddCarInfo = () => {
    const [opem, setOpen] = useState<boolean>(false);
    const session = useClientSession()
    const { register, handleSubmit } = useForm<FormData>()
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: accountService.addCarInfo,
        mutationKey: ["addCarInfo"],
    })

    const onSubmit = (data: FormData) => {
        if (!data.mark || !data.num || !data.color) {
            toast.error('Пожалуйста, заполните все поля')
            return
        }

        mutate({
            token: session?.token,
            color: data.color,
            model: data.mark,
            number: data.num
        })
    }

    useEffect(() => {
        if (isSuccess) {
            revalidateTagFrontend('car')
            setOpen(false)
            toast.success('Успешно добавлено')
        }
    }, [isSuccess]);

        useEffect(() => {
            if (isError) {
                toast.error('Что-то пошло не так...')
            }
    }, [isError]);

    return (
        <Dialog open={opem} onOpenChange={setOpen}>
            <DialogContent className='bg-[#111] h-[100dvh] sm:max-h-max sm:h-max flex flex-col justify-between items-center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-8'>
                        <h1 className='text-3xl text-center font-semibold '>
                            Информация о машине
                        </h1>
                        <div className='mt-8 flex flex-col gap-4'>
                            <div className='w-full'>
                                <label className='text-sm text-[#ddd]'>Цвет</label>
                                <Input type='text' className='mt-1' placeholder='Черный' {...register('color')}/>
                            </div>
                            <div className='w-full'>
                                <label className='text-sm text-[#ddd]'>Марка</label>
                                <Input type='text' className='mt-1' placeholder='Audi' {...register('mark')}/>
                            </div>
                            <div className='w-full'>
                                <label className='text-sm text-[#ddd]'>Номер</label>
                                <Input type='text' className='mt-1' placeholder='А174' {...register('num')}/>
                            </div>
                            <input type='submit' className='hidden'/>
                        </div>
                    </div>
                    <Button className='mt-8 w-full' isLoading={isPending} onClick={() => handleSubmit(onSubmit)}>Сохранить</Button>
                </form>
            </DialogContent>
            <DialogTrigger asChild>
                <Button className='mt-8'>Добавить информацию</Button>
            </DialogTrigger>
        </Dialog>
    )
}