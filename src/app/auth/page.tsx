import { Input } from "@/shared/shadcn/ui/input";
import { Button } from "@/shared/shadcn/ui/button";
import Image from "next/image";
import bgMobile from './bg-mobile.png';
import bgDesktop from './bg-desktop.png';

export default function AuthPage() {
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <Image src={bgMobile} className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden' alt='bg'/>
            <Image src={bgDesktop} className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block' alt='bg'/>
            <div className='fixed top-0 left-0 -z-50 w-screen h-screen bg-gradient-to-b from-transparent to-black'/>

            <div className='flex flex-col items-center justify-center w-full sm:max-w-md'>
                <h1 className='text-4xl font-semibold'>Регистрация</h1>
                <div className='w-full mt-6'>
                    <label className='text-sm text-[#ddd]'>Телефон</label>
                    <div className='flex gap-3 mt-1'>
                        <div className='bg-[#2A2A2A] p-3 rounded-xl flex w-[83px] gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" id="flag-icon-css-ru" viewBox="0 0 640 480">
                                <g fillRule="evenodd" strokeWidth="1pt">
                                    <path fill="#fff" d="M0 0h640v480H0z"/>
                                    <path fill="#0039a6" d="M0 160h640v320H0z"/>
                                    <path fill="#d52b1e" d="M0 320h640v160H0z"/>
                                </g>
                            </svg>
                            <h1 className='font-semibold'>+7</h1>
                        </div>
                        <Input type='email' placeholder='Введите телефон'/>
                    </div>

                </div>
                <div className='w-full mt-4'>
                    <label className='text-sm text-[#ddd]'>Пароль</label>
                    <Input type='email' className='mt-1' placeholder='Введите пароль'/>
                </div>
                <div className='flex w-full justify-end mt-3'>
                    <Button className='bg-transparent hover:bg-transparent text-white hover:text-[#ddd]'>
                        Забыли пароль?
                    </Button>
                </div>
                <Button className='w-full mt-3'>
                    Продолжить
                </Button>
            </div>
        </div>
    )
}