'use client';

import { DialogTrigger } from "@/shared/shadcn/ui/dialog";
import { useContext } from "react";
import { IOrder, OrderDetailsContext } from "@/entities/order";

export const OpenOrderDetails = (order: IOrder) => {
    const { setOrderDetails } = useContext(OrderDetailsContext);

    return (
        <DialogTrigger asChild>
            <div onClick={() => setOrderDetails(order)} className='absolute top-0 left-0 rounded-2xl w-full h-full z-10'/>
        </DialogTrigger>
    )
}