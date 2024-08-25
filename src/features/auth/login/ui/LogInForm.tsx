'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/shared/shadcn/ui/button";
import { Input } from "@/shared/shadcn/ui/input";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { authService } from "@/shared/api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { z } from "zod"

const formSchema = z.object({
    email: z.string(),
    password: z.string().min(8, {
        message: 'Пароль должен быть не менее 8 символов'
    })
})

export const LogInForm = () => {
    const cookies = useCookies()
    const router = useRouter()

    const { mutate, isSuccess, isPending, isError, data } = useMutation({
        mutationFn: authService.login,
        mutationKey: ['login']
    })

    const { handleSubmit, register } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = handleSubmit(data => {
        mutate(data)
    })

    useEffect(() => {
        if (isError) {
            toast.error('Неверные данные', {
                duration: 1600
            })
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess && data) {
            toast.success('Добро пожаловать!', {
                duration: 700
            })
            cookies.set('access_token', data.data.token)

            const timeout = setTimeout(() => {
                router.push('/orders')
                clearTimeout(timeout)
            }, 200)
        }
    }, [cookies, data, isSuccess, router]);

    return (
        <form className='w-full' onSubmit={onSubmit}>
            <div className='w-full mt-4'>
                <label className='text-sm text-[#ddd]'>Почта</label>
                <Input type='email' className='mt-1' placeholder='Введите почту' {...register('email')}/>
            </div>
            <div className='w-full mt-4'>
                <label className='text-sm text-[#ddd]'>Пароль</label>
                <Input type='password' className='mt-1' placeholder='Введите пароль' {...register('password')}/>
            </div>
            <div className='flex w-full justify-end'>
                <Button
                    className='font-medium bg-transparent hover:bg-transparent text-blue-500 hover:text-blue-400'>
                    Забыли пароль?
                </Button>
            </div>
            <Button className='w-full mt-3  text-white' isLoading={isPending} onClick={onSubmit}>
                Продолжить
            </Button>
            <input type='submit' className='hidden'/>
        </form>
    )
}
