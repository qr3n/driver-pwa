import Image from "next/image";
import { bgDesktop, bgMobile, dolphin, dolphinWithGlasses } from "@/shared/assets";
import Link from "next/link";

export default function ActiveOrder() {
    return (
        <div className='w-full h-full flex relative items-center flex-col text-center justify-center'>
            <Image placeholder="blur" src={bgMobile}
                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden' alt='bg'/>
            <Image placeholder="blur" src={bgDesktop}
                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block' alt='bg'/>
            <div
                className='fixed top-0 left-0 -z-50 w-screen h-screen bg-gradient-to-b from-transparent to-black'/>

            <div className='flex items-center justify-center flex-col'>
                <Image priority src={dolphinWithGlasses} width={350} height={350} alt='test'
                       className='w-40 sm:w-44 md:w-44 lg:w-48 xl:w-56'/>
                <h1 className='text-2xl md:text-3xl font-semibold mt-8'>
                    У вас еще нет заказа
                </h1>
                <h2 className='text-sm sm:text-base text-[#999] mt-1'>
                    Скорее выберите его <Link href='/orders'><span className='text-blue-500 cursor-pointer'>тут!</span></Link>
                </h2>
            </div>
        </div>
    )
}