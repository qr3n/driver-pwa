'use client';

import { FiHome, FiUser } from "react-icons/fi";
import { useClientSession } from "@/entities/session/model/clientHooks";

export const Menu = () => {
    const session = useClientSession();

    return (
        <div
            className='flex items-center justify-center sm:flex-col gap-7 p-4 w-full h-max sm:w-max sm:h-full bg-[#151515]'>
            <div className='flex items-center justify-center flex-col p-2 bg-[#222] rounded-3xl w-20'>
                <div className='bg-[#333] p-2.5 rounded-2xl w-max h-max cursor-pointer'>
                    <FiHome className='w-7 h-7'/>
                </div>
            </div>

            <div className='bg-[#333] p-2.5 rounded-2xl w-max h-max cursor-pointer'>
                <FiHome className='w-7 h-7 text-[#999]'/>
            </div>

            <div className='flex items-center justify-center flex-col p-2 bg-[#222] rounded-3xl w-20'>
                <div className='bg-[#333] p-2.5 rounded-2xl w-max h-max cursor-pointer'>
                    <FiUser className='w-7 h-7 text-[#999]'/>
                </div>
            </div>
        </div>
    )
}