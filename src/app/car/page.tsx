'use client';

import Image from "next/image";
import { bgDesktop, bgMobile, carImg } from "@/shared/assets";
import { AddCarInfo } from "@/features/car/ui/AddCarInfo";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/shared/api/services/account";

function parseCarNumber(plate: string) {
    // @ts-ignore
    const regex = /^([А-Я])(\d{3})([А-Я]{2})(\d{2,3})$/u;
    const match = plate.match(regex);

    if (!match) return null;

    return {
        letter1: match[1],  // Первая буква
        numbers: match[2],   // Три цифры
        letters2: match[3],  // Две буквы
        region: match[4]     // Регион
    };
}

export default function CarPage() {
    const { data } = useQuery({
        queryFn: accountService.getCarInfo,
        queryKey: ['carInfo']
    })

    const car = data?.data && parseCarNumber(data.data.number)

    return data?.data ? (
        <div className='w-full h-full flex relative items-center flex-col text-center justify-center'>
            <Image placeholder="blur" src={bgMobile}
                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden' alt='bg'/>
            <Image placeholder="blur" src={bgDesktop}
                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block' alt='bg'/>
            <div
                className='fixed top-0 left-0 -z-50 w-screen h-screen bg-gradient-to-b from-transparent to-black'/>

            <div className='flex items-center justify-center flex-col w-full'>
                <div className='flex items-center justify-center flex-col'>
                    <h1 className='text-3xl md:text-4xl font-semibold mt-6 sm:mt-7 md:mt-8 lg:mt-12'>
                        {data.data.color} {data.data.model}
                    </h1>
                    <div className='border border-[#666] w-full flex mt-8 rounded-xl items-center justify-between gap-3 font-medium text-2xl px-6 py-2 bg-[#242424]'>
                        {car?.letter1} {car?.numbers} {car?.letters2}
                        <div className='h-full w-[1px] bg-[#666]'/>
                        <div className='flex flex-col'>
                            <p className='text-2xl'>{car?.region}</p>
                            <div className='flex items-center justify-center gap-2'>
                                <p className='text-xs'>RUS</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6" width="16" height="16">
                                    <rect fill="#fff" width="9" height="3"/>
                                    <rect fill="#d52b1e" y="3" width="9" height="3"/>
                                    <rect fill="#0039a6" y="2" width="9" height="2"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='w-full h-full flex relative items-center flex-col text-center justify-center'>
            <Image placeholder="blur" src={bgMobile}
                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden' alt='bg'/>
            <Image placeholder="blur" src={bgDesktop}
                   className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block' alt='bg'/>
            <div
                className='fixed top-0 left-0 -z-50 w-screen h-screen bg-gradient-to-b from-transparent to-black'/>

            <div className='flex items-center justify-center flex-col'>
                <Image priority src={carImg} width={450} height={450} alt='test'
                       className='w-48 sm:w-52 md:w-56 lg:w-64 xl:w-72'/>
                <h1 className='text-2xl md:text-3xl font-semibold mt-6 sm:mt-7 md:mt-8 lg:mt-12'>
                    Информации о машине нет
                </h1>
                <h2 className='text-sm sm:text-base text-[#999] mt-1'>
                    Пожалуйста, добавьте ее как можно быстрее.
                </h2>
                <AddCarInfo/>
            </div>
        </div>
    )
}