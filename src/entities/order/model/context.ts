'use client';

import { createContext, Dispatch, SetStateAction } from "react";
import { IOrder } from "@/entities/order";

interface IContext {
    orderDetails: IOrder | undefined,
    setOrderDetails: Dispatch<SetStateAction<IOrder | undefined>>,
}

export const OrderDetailsContext = createContext<IContext>(null!);