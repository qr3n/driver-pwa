import Image from "next/image";
import {
    aliIcon,
    bgDesktop,
    bgMobile,
    dolphin,
    dolphinWithGlasses,
    lamodaIcon,
    ozonIcon, questionIcon, wildberriesIcon,
    yandexIcon
} from "@/shared/assets";
import Link from "next/link";
import { calculateDistance, useCurrentOrder } from "@/entities/order";
import { Button } from "@/shared/shadcn/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/shadcn/ui/dialog";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { PropsWithChildren } from "react";
import { OrderNextStep } from "@/features/order/step/ui/OrderNextStep";

const imagesMap = {
    'Яндекс маркет': yandexIcon,
    'Ozon': ozonIcon,
    'AliExpress': aliIcon,
    'Lamoda': lamodaIcon,
    'Wildberries': wildberriesIcon
}

interface IStepProps extends PropsWithChildren {
    completed: boolean,
    current?: boolean
}

const Step = (props: IStepProps) => {
    return (
        <div className='flex gap-3 items-center'>
            <div className='rounded-full '>
                { props.completed ? <FaCheckCircle  className='text-blue-500 w-6 h-6'/> : <FaRegCheckCircle className='w-6 h-6' style={{color: props.current ? 'white' : '#aaa'}}/> }
            </div>

            <div className='font-medium' style={{ color: (props.completed || !props.current) ? '#aaa' : 'white' }}>
                { props.children }
            </div>
        </div>
    )
}
const statuses = ['Курьер назначен', 'В пути', 'На погрузке', 'Выполняет', 'Заказ выполнен']

export default async function ActiveOrder() {
    const currentOrder = await useCurrentOrder()

    console.log(currentOrder)

    return currentOrder ? (
        <div className='flex flex-col w-full items-center justify-center pt-20 md:pt-24 px-4 '>
            <div className='flex flex-col w-full sm:max-w-lg'>
                <div className='mt-5'>
                    <h1 className='text-3xl text-center font-semibold flex items-center justify-center gap-4'>
                        <Image
                            src={currentOrder.cargo === 'anything' ? questionIcon : imagesMap[currentOrder.warehouse]}
                            alt={'icon'}
                            width={42}
                            height={42}
                            className='rounded-xl object-cover h-max'
                        />
                        Текущий заказ
                    </h1>
                    <h1 className='text-center text-[#999]'>~{calculateDistance(currentOrder.cost)} км</h1>
                </div>
                <div className='w-full h-full max-h-[calc(80dvh-220px)] pb-4 pt-5 overflow-y-auto px-6'>
                    <h1 className='text-2xl text-white font-semibold'>Основное</h1>
                    <h1 className='text-xl text-[#999]  mt-4'>Откуда забрать</h1>
                    <p className='mt-1 font-medium'>{currentOrder.addr_from}</p>
                    <h1 className='text-xl text-[#999]  mt-4'>Куда доставить</h1>
                    <p className='mt-1 font-medium'>{currentOrder.addr_to}</p>

                    <div className='w-full h-[1px] bg-[#444] rounded-full mt-6'/>

                    <h1 className='text-2xl text-white font-semibold mt-6'>Дата и время</h1>
                    <h1 className='text-xl text-[#999] mt-4'>Когда забрать</h1>
                    <p className='mt-1 font-medium'>{currentOrder.time_to_take}</p>
                    <h1 className='text-xl text-[#999] mt-4'>Когда доставить</h1>
                    <p className='mt-1 font-medium'>{currentOrder.time_to_deliver}</p>
                </div>
                <Dialog>
                    <DialogContent className='bg-[#111] h-[100dvh] sm:max-h-max sm:h-max flex flex-col justify-between items-center'>
                        <div className='mt-8'>
                            <h1 className='text-3xl text-center font-semibold '>
                                Начать следующий этап? {currentOrder.courier_status}
                            </h1>
                            <div className='mt-8 flex flex-col gap-6'>
                                {statuses.map((status, index) => {
                                    const newStatus = status === undefined ? 'Поиск курьера' : status

                                    const isCurrent = status === currentOrder.courier_status;
                                    const isNextToCurrent = index === statuses.indexOf(currentOrder.courier_status);

                                    return (
                                        <Step
                                            key={index}
                                            completed={isCurrent || (isNextToCurrent && !isCurrent)}
                                            current={isNextToCurrent}
                                        >
                                            {status}
                                        </Step>
                                    );
                                })}
                            </div>
                        </div>
                        <OrderNextStep order_id={currentOrder.id} currentStatus={currentOrder.courier_status}/>
                    </DialogContent>
                    <DialogTrigger asChild>
                        <Button className='w-full mt-6 place-self-end justify-self-end'>
                            Следующий этап
                        </Button>
                    </DialogTrigger>
                </Dialog>
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
                <Image priority src={dolphinWithGlasses} width={350} height={350} alt='test'
                       className='w-40 sm:w-44 md:w-44 lg:w-48 xl:w-56'/>
                <h1 className='text-2xl md:text-3xl font-semibold mt-8'>
                    Активного заказа пока нет
                </h1>
                <h2 className='text-sm sm:text-base text-[#999] mt-1'>
                    Скорее выберите его <Link href='/orders'><span className='text-blue-500 cursor-pointer'>тут!</span></Link>
                </h2>
            </div>
        </div>
    )
}