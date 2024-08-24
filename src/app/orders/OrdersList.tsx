import { PropsWithChildren } from "react";

export const OrdersList = ({ children }: PropsWithChildren) => {
    return (
        <div className='
            relative
            w-full
            mt-8
            flex
            flex-col
            gap-4
            overflow-y-auto
            h-[calc(100dvh-340px)]
            sm:h-[calc(100dvh-250px)]
            px-4
        '>
            { children }
        </div>
    )
}