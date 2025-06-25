import { Button } from "@/shared/shadcn/ui/button";
import { Input } from "@/shared/shadcn/ui/input";
import { Modal } from "@/shared/ui/modal";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/shared/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
import { InputOTP, InputOTPSlot, InputOTPGroup } from "@/shared/shadcn/ui/input-otp";
import toast from "react-hot-toast";
import { useCookies } from "next-client-cookies";

const formSchema = z.object({
    email: z.string(),
    new_password: z.string().min(8, {
        message: 'Пароль должен быть не менее 8 символов'
    })
})



export const ResetPassword = () => {
    const [step, setStep] = useState(0)
    const [code, setCode] = useState('')
    const cookies = useCookies()
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const { handleSubmit, register,  getValues } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const { mutateAsync: resetPassword, isSuccess, isError, data } = useMutation({
        mutationFn: authService.resetPassword,
        mutationKey: ['resetPassword']
    })

    const { mutateAsync: sendResetPasswordCode } = useMutation({
        mutationFn: authService.sendResetPasswordCode,
        mutationKey: ['sendResetPasswordCode']
    })

    useEffect(() => {
        if (code.length === 5) {
            resetPassword({
                code,
                email: getValues("email"),
                new_password: getValues('new_password')
            })
        }
    }, [code, getValues, resetPassword]);

    useEffect(() => {
        if (isError) {
            toast.error('Неверный код', {
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
            setOpen(false)
        }
    }, [cookies, data, isSuccess, router]);


    return (
        <div >
            <Modal
                open={open}
                onOpenChange={setOpen}
                dialogStyle={'h-[300px] flex flex-col'}
                trigger={
                    <Button
                        className='font-medium bg-transparent hover:bg-transparent text-blue-500 hover:text-blue-400'>
                        Забыли пароль?
                    </Button>
                }
                title={'Восстановление пароля'}
                description={'Необходим доступ к почте'}
            >
                {step === 0 && (
                    <>
                        <div className='w-full mt-4'>
                            <label className='text-sm text-[#ddd]'>Почта</label>
                            <Input type='email' className='mt-1' placeholder='Введите почту' {...register('email')}/>
                        </div>
                        <div className='w-full mt-4'>
                            <label className='text-sm text-[#ddd]'>Новый пароль</label>
                            <Input type='password' className='mt-1' placeholder='Введите пароль' {...register('new_password')}/>
                        </div>
                    </>
                )}

                {step === 1 && (
                    <>
                        <motion.div
                            key="step-2"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ duration: 0.15 }}
                            className='flex items-center dark  justify-center flex-col mt-10 mb-10'
                        >
                            <InputOTP maxLength={5} onChange={setCode}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0}/>
                                    <InputOTPSlot index={1}/>
                                    <InputOTPSlot index={2}/>
                                    <InputOTPSlot index={3}/>
                                    <InputOTPSlot index={4}/>
                                </InputOTPGroup>
                            </InputOTP>
                        </motion.div>
                    </>
                )}
                <Button
                    type={'button'}
                    onClick={() => {
                        if (step === 0) {
                            sendResetPasswordCode({email: getValues('email')})
                            setStep(1)
                        }

                        else {
                            setStep(0)
                        }
                    }}
                    className='w-full mt-8'
                >
                    {step === 0 ? 'Отправить код' : 'Назад'}
                </Button>
            </Modal>
        </div>
    )
}