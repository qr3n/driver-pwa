'use client';

import { DialogTrigger } from "@/shared/shadcn/ui/dialog";

export const OpenOrderDetails = () => {
    return (
        <DialogTrigger asChild>
            <div className='absolute top-0 left-0 rounded-2xl w-full h-full z-10'/>
        </DialogTrigger>
    )
}