'use client';

import { createContext, Dispatch, SetStateAction } from "react";
import { IOrder } from "@/entities/order";

interface IOrderDetailsContext {
    orderDetails: IOrder | undefined,
    setOrderDetails: Dispatch<SetStateAction<IOrder | undefined>>,

    orderDetailsModalOpen: boolean,
    setOrderDetailsModalOpen: Dispatch<SetStateAction<boolean>>,

    setTakeOrDiscount: Dispatch<SetStateAction<'take' | 'discount' | undefined>>,
    setTimeLeft: Dispatch<SetStateAction<number>>,
}

interface IOrderTakeOrDiscountContext {
    takeOrDiscount: 'take' | 'discount' | undefined,
    takeOrDiscountLoading: boolean,
    timeLeft: number
}

export const OrderDetailsContext = createContext<IOrderDetailsContext>(null!);
export const OrderTakeOrDiscountContext = createContext<IOrderTakeOrDiscountContext>(null!);
