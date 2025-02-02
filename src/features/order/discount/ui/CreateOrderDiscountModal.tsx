'use client';

import { DialogClose, DialogContent } from "@/shared/shadcn/ui/dialog";
import { Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { Button } from "@/shared/shadcn/ui/button";
import { OrderDetailsContext } from "@/entities/order";
import toast from "react-hot-toast";
import { BsQuestionCircle } from "react-icons/bs";
import confetti from "canvas-confetti";
import { useMutation } from "@tanstack/react-query";
import { orderService } from "@/shared/api/services/order";
import { useClientSession } from "@/entities/session/client";

interface IOptionProps extends PropsWithChildren {
    value: string;
    current: string;
    setCurrent: Dispatch<SetStateAction<string>>
}

const selectedStyle = {
    backgroundColor: 'rgba(0,89,255,0.12)',
    border: '1px solid rgba(0,89,255, 0.5)'
}

const unselectedStyle = {
    backgroundColor: '#111',
    border: '1px solid #444'
}

const Option = (props: IOptionProps) => {
    const selected = props.value === props.current

    return (
        <div
            className={`transition-all relative w-full p-7 cursor-pointer rounded-3xl text-center flex items-center justify-center`}
            style={selected ? selectedStyle : unselectedStyle}
            onMouseDown={() => props.setCurrent(props.value)}
        >
            { selected && <BiCheckCircle className='text-blue-500 w-8 h-8 absolute left-8'/> }
            <h1 className='text-2xl font-semibold'>{props.children}</h1>
        </div>
    )
}

export const CreateOrderDiscountModal = ({ order_id }: { order_id: number }) => {
    const session = useClientSession()
    const [current, setCurrent] = useState('10')
    const { setOrderDetailsModalOpen } = useContext(OrderDetailsContext)
    const { mutate, isSuccess } = useMutation({
        mutationFn: orderService.discount,
        mutationKey: ['create_discount']
    })

    useEffect(() => {
        if (isSuccess) {
            confetti()
            toast.success(`Вы предложили скидку ${current}%`)
            setOrderDetailsModalOpen(false)
        }
    }, [current, isSuccess, setOrderDetailsModalOpen])

    return (
        <DialogContent className='bg-[#111] h-[100dvh] sm:h-[70dvh] sm:max-h-[80dvh] flex flex-col'>
            <>
                <h1 className='text-3xl text-center font-semibold mt-5'>Предложить скидку</h1>
                <div className='flex -mt-2 items-center justify-center gap-1'>
                    <p className='text-center text-sm text-[#999]'>Как это работает</p>
                    <BsQuestionCircle className='text-[#999]'/>
                </div>
                <div
                    className='w-full mt-4 h-full max-h-[calc(80dvh-130px)] flex flex-col gap-4 pb-4 pt-2 overflow-y-auto px-6'>
                        <Option value={'10'} current={current} setCurrent={setCurrent}>10%</Option>
                        <Option value={'15'} current={current} setCurrent={setCurrent}>15%</Option>
                        <Option value={'25'} current={current} setCurrent={setCurrent}>25%</Option>
                    </div>
                    <DialogClose>
                        <Button className='mt-4 w-full' onClick={() => mutate({
                            token: session?.token || '',
                            order_id: order_id,
                            discount: 25
                        })}>
                            Предложить
                        </Button>
                    </DialogClose>
                    <p className='text-center text-sm text-[#999]'>До конца аукциона осталось <span
                        className='text-white'>15 мин.</span>
                    </p>
                </>
        </DialogContent>
)
}