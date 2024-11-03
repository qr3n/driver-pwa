'use client';
import whatsapp from './whatsapp.webp'
import telegram from './telegram.webp'

import { TelegramShareButton, WhatsappShareButton } from "react-share";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/shadcn/ui/dialog";
import Image from "next/image";
import { CopyIcon, ShareIcon } from "lucide-react";
import { Button } from "@/shared/shadcn/ui/button";
import { HiShare } from "react-icons/hi2";
import toast from "react-hot-toast";

export const Share = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size='icon' className='absolute top-4 right-4 sm:right-[96px] z-50'>
                    <HiShare />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Поделиться</DialogTitle>
                </DialogHeader>

                <div className='flex p-4 flex-col gap-3'>
                    <h1 className='font-medium'>Поделиться с помощью</h1>
                    <div className='flex gap-4 mt-2 bg-[#222] border border-[#333] rounded-2xl px-3 py-2'>
                        <TelegramShareButton url={'https://driver-pwa-emarket.vercel.app'}>
                            <div className='p-3 bg-[#222] border border-[#555] rounded-full'>
                                <Image src={telegram} alt={'telegram'} width={32} height={32}/>
                            </div>
                        </TelegramShareButton>
                        <WhatsappShareButton url={'https://driver-pwa-emarket.vercel.app'} title='Test' separator={'Test'}>
                            <div className='p-3 bg-[#222] border border-[#555] rounded-full'>
                                <Image src={whatsapp} alt={'whatsapp'} width={32} height={32}/>
                            </div>
                        </WhatsappShareButton>
                    </div>
                    <h1 className='font-medium mt-2'>Скопировать ссылку</h1>
                    <div className='flex relative gap-4 items-center text-[#aaa] mt-2 bg-[#222] border border-[#333] rounded-2xl p-3'>
                        https://driver-pwa-emarket.vercel.app
                        <div
                            onClick={() => {
                                navigator.clipboard.writeText(`https://driver-pwa-emarket.vercel.app`)
                                toast.success('Скопировано')
                            }}
                            className='bg-[#444] p-2 rounded-lg absolute right-2 cursor-pointer active:scale-90 transition-all'>
                            <CopyIcon className='w-3 h-3'/>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}