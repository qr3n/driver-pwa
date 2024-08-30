'use client';

import { OrderTakeOrDiscountContext } from "@/entities/order";
import { PropsWithChildren, useEffect, useState } from "react";
import { useCurrentTime } from "@/shared/hooks/useCurrentTime";

interface IProps extends PropsWithChildren {
    createdAt: Date
}

export const OrderTakeOrDiscount = (props: IProps) => {
    const [state, setState] = useState<'take' | 'discount'>()
    const { currentTime, isCurrentTimeLoading } = useCurrentTime()
    const [timeLeft, setTimeLeft] = useState(15)


    useEffect(() => {
        if (currentTime) {
            const differenceInMilliseconds = Math.abs(currentTime.getTime() - props.createdAt.getTime());
            const difference = differenceInMilliseconds / 1000 / 60;
            console.log(difference)

            setState(difference < 15 ? 'discount' : 'take');
        }
    }, [props.createdAt, currentTime]);

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