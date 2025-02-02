'use client';

import { OrderTakeOrDiscountContext } from "@/entities/order";
import { PropsWithChildren, useEffect, useState } from "react";
import { useCurrentTime } from "@/shared/hooks/useCurrentTime";

interface IProps extends PropsWithChildren {
}

export const OrderTakeOrDiscount = (props: IProps) => {
    const [state, setState] = useState<'take' | 'discount'>('take')
    const { currentTime, isCurrentTimeLoading } = useCurrentTime()
    const [timeLeft, setTimeLeft] = useState(15)

    useEffect(() => {
        if (state === 'discount') {
            const interval = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000 * 60)

            return () => clearInterval(interval)
        }
    }, [state]);

    return (
        <OrderTakeOrDiscountContext.Provider value={{
            takeOrDiscount: state,
            timeLeft,
            takeOrDiscountLoading: isCurrentTimeLoading
        }}>
            { props.children }
        </OrderTakeOrDiscountContext.Provider>
    )
}