'use server';

import { IOrder, Order } from "@/entities/order";
import { bgDesktop, bgMobile, dolphin } from "@/shared/assets";
import Image from "next/image";

interface IProps {
    orders: IOrder[],
    type: 'active' | 'planned' | 'taken'
}

export const OrdersRender = async (props: IProps) => {
    return (
        <>
            { !props.orders.length && (
                <div className='w-full h-full flex relative items-center flex-col text-center justify-center'>
                    <Image placeholder="blur" src={bgMobile} className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden' alt='bg'/>
                    <Image placeholder="blur" src={bgDesktop} className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block' alt='bg'/>
                    <div
                        className='fixed top-0 left-0 -z-50 w-screen h-screen bg-gradient-to-b from-transparent to-black'/>
                    <div className='absolute top-8 flex items-center justify-center flex-col'>
                        <Image placeholder="blur" priority src={dolphin} width={350} height={350} alt='test' className='w-36 sm:w-40 md:w-44 lg:w-48 xl:w-56'/>
                        <h1 className='text-2xl md:text-3xl font-semibold mt-8'>
                            Заказов пока нет.
                        </h1>
                        <h2 className='text-sm sm:text-base text-[#999] mt-1'>
                            Попробуйте поискать в <span className='text-blue-500 cursor-pointer'>
                            { props.type === 'active' && 'запланированных' }
                            { props.type === 'planned' && 'сегодняшних' }
                            { props.type === 'taken' && 'сегодняшних' }
                        </span>
                        </h2>
                    </div>
                </div>
            )}
            {props.orders.map(order => <Order key={order.id} {...order}/>)}
        </>
    )
}