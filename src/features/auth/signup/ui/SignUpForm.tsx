'use client';

import { Input } from "@/shared/shadcn/ui/input";
import { Button } from "@/shared/shadcn/ui/button";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/shared/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import * as React from "react";

const formSchema = z.object({
    email: z.string(),
    password: z.string().min(8, {
        message: 'Пароль должен быть не менее 8 символов'
    })
})


export const SignUpForm = () => {
    const cookies = useCookies()
    const router = useRouter()

    const { mutate, isSuccess, isPending, isError, data } = useMutation({
        mutationFn: authService.signUp,
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
            toast.error('Аккаунт уже существует', {
                duration: 1600
            })
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess && data) {
            toast.success('Добро пожаловать!', {
                duration: 700
            })
            cookies.set('access_token', data.data.access_token)
            localStorage.setItem('accessToken', data.data.access_token)
            router.push('/orders')
        }
    }, [cookies, data, isSuccess, router]);

    return isSuccess ?
        <div className='mt-4 flex items-center jusitfy-center gap-1 text-white text-sm'>Загружаем аккаунт...<Loader2
            className="text-white h-4 w-4 animate-spin"/></div> : (
            <form className='w-full' onSubmit={onSubmit}>
                <div className='w-full mt-4'>
                    <label className='text-sm text-[#ddd]'>Почта</label>
                    <Input type='email' className='mt-1' placeholder='Введите почту' {...register('email')}/>
                </div>
                <div className='w-full mt-4'>
                    <label className='text-sm text-[#ddd]'>Пароль</label>
                    <Input type='password' className='mt-1' placeholder='Введите пароль' {...register('password')}/>
                </div>
                <Button className='w-full mt-8' isLoading={isPending} onClick={onSubmit}>
                    Продолжить
                </Button>
                <input type='submit' className='hidden'/>
            </form>
        )
}