'use client';

import { DialogContent } from "@/shared/shadcn/ui/dialog";
import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import confetti from "canvas-confetti";
import { BiCheckCircle } from "react-icons/bi";
import { Button } from "@/shared/shadcn/ui/button";

interface IOptionProps extends PropsWithChildren {
    value: string;
    current: string;
    setCurrent: Dispatch<SetStateAction<string>>
}

const selectedStyle = {
    backgroundColor: 'rgba(0,89,255,0.1)',
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
            className={`transition-all relative w-full p-7 cursor-pointer rounded-2xl text-center flex items-center justify-center`}
            style={selected ? selectedStyle : unselectedStyle}
            onMouseDown={() => props.setCurrent(props.value)}
        >
            { selected && <BiCheckCircle className='text-blue-500 w-8 h-8 absolute left-8'/> }
            <h1 className='text-2xl font-semibold'>{props.children}</h1>
        </div>
    )
}

export const CreateOrderDiscountModal = () => {
    const [current, setCurrent] = useState('10')

    return (
        <DialogContent className='bg-[#111] h-[100dvh] sm:h-[60dvh] sm:max-h-[80dvh] flex flex-col'>
            <>
                <h1 className='text-3xl text-center font-semibold mb-4'>Предложить скидку</h1>
                <div className='w-full h-full max-h-[calc(80dvh-130px)] flex flex-col gap-4 pb-4 pt-2 overflow-y-auto px-6'>
                    <Option value={'10'} current={current} setCurrent={setCurrent}>10%</Option>
                    <Option value={'15'} current={current} setCurrent={setCurrent}>15%</Option>
                    <Option value={'25'} current={current} setCurrent={setCurrent}>25%</Option>
                </div>
                <Button className='mt-4' onClick={() => confetti()}>Предложить</Button>
                <p className='text-center text-sm text-[#999]'>До конца аукциона осталось <span className='text-white'>15 мин.</span>
                </p>
            </>
        </DialogContent>
    )
}