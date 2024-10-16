'use client';

import { Dialog, DialogContent, DialogTrigger } from "@/shared/shadcn/ui/dialog";
import { Input } from "@/shared/shadcn/ui/input";
import { Button } from "@/shared/shadcn/ui/button";
import * as React from "react";
import { useEffect, useState } from "react";
import { useClientSession } from "@/entities/session/client";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { accountService } from "@/shared/api/services/account";
import toast from "react-hot-toast";
import { revalidateTagFrontend } from "@/shared/api";

interface FormData {
    name: string,
    surname: string,
    patronymic: string,
    passport_number: string,
    passport_given: string,
    passport_given_date: string,
    phone: string
}

export const ChangeAccountInfo = () => {
    const [open, setOpen] = useState<boolean>(false);
    const session = useClientSession()
    const { register, handleSubmit } = useForm<FormData>()
    const { mutate, isPending, isSuccess, isError } = useMutation({
        mutationFn: accountService.addInfo,
        mutationKey: ["addInfo"],
    })

    const onSubmit = (data: FormData) => {
        if (!data.name || !data.surname || !data.patronymic || !data.passport_number || !data.passport_given || !data.passport_given_date) {
            toast.error('Пожалуйста, заполните все поля')
            return
        }

        mutate({
            token: session?.token,
            ...data
        })
    }

    useEffect(() => {
        if (isSuccess) {
            revalidateTagFrontend('info')
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='bg-[#111] h-[100dvh] sm:h-[80vh] flex flex-col justify-between items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
                    <div className='mt-8 w-full'>
                        <h1 className='text-3xl text-center font-semibold '>
                            Информация о Вас
                        </h1>
                        <div
                            className='w-full mt-8 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-220px)] sm:h-[calc(80vh-220px)] px-8'>
                            <div className='w-full'>
                                <label className='text-sm text-[#ddd]'>Фамилия</label>
                                <Input type='text' className='mt-1' placeholder='Сикров' {...register('surname')}/>
                            </div>
                            <div className='w-full'>
                                <label className='text-sm text-[#ddd]'>Имя</label>
                                <Input type='text' className='mt-1' placeholder='Георгий' {...register('name')}/>
                            </div>
                            <div className='w-full'>
                                <label className='text-sm text-[#ddd]'>Отчество</label>
                                <Input type='text' className='mt-1'
                                       placeholder='Анатольевич' {...register('patronymic')}/>
                            </div>
                            <div className='w-full'>
                                <label className='text-sm text-[#ddd]'>Серия и номер документа</label>
                                <Input type='text' className='mt-1'
                                       placeholder='4444 610989' {...register('passport_number')}/>
                            </div>
                            <div className='w-full'>
                                <label className='text-sm text-[#ddd]'>Кем выдан</label>
                                <Input type='text' className='mt-1'
                                       placeholder='Отделением УФМС России по г...' {...register('passport_given')}/>
                            </div>
                            <div className='w-full'>
                                <label className='text-sm text-[#ddd]'>Дата выдачи</label>
                                <Input type='text' className='mt-1'
                                       placeholder='15.01.2020' {...register('passport_given_date')}/>
                            </div>
                            <div className='w-full'>
                                <label className='text-sm text-[#ddd]'>Номер телефона</label>
                                <Input type='text' className='mt-1'
                                       placeholder='+79999999999' {...register('phone')}/>
                            </div>
                            <input type='submit' className='hidden'/>
                        </div>
                        <Button className='mt-8 w-full' isLoading={isPending}
                                onClick={() => handleSubmit(onSubmit)}>Сохранить</Button>
                    </div>

                </form>
            </DialogContent>
            <DialogTrigger asChild>
                <Button className='mt-8'>Изменить информацию</Button>
            </DialogTrigger>
        </Dialog>
    )
}
