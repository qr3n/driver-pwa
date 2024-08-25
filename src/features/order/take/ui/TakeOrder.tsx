'use client';

import { Button } from "@/shared/shadcn/ui/button";
import toast from "react-hot-toast";

export const TakeOrder = () => {
    return (
        <Button
            onClick={() => toast.success('Вы успешно взяли заказ.')}
            className='text-white bg-blue-500 hover:bg-blue-400 font-semibold p-4 z-20'
        >
            Забронировать
        </Button>
    )
}