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
                duration: 1200
            })
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess && data) {
            toast.success('Добро пожаловать!')
            cookies.set('access_token', data.data.token)

            const timeout = setTimeout(() => {
                router.push('/orders')
                clearTimeout(timeout)
            }, 700)
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
            <Button className='w-full mt-8' isLoading={isPending} onClick={onSubmit}>
                Продолжить
            </Button>
            <input type='submit' className='hidden'/>
        </form>
    )
}