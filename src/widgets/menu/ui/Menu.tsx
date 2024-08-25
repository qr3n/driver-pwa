'use client';

import { FiHome, FiUser } from "react-icons/fi";
import { useClientSession } from "@/entities/session/client";
import { usePathname } from "next/navigation";
import { RiMapPinLine } from "react-icons/ri";
import Link from "next/link";

const activeStyle = {
    backgroundColor: '#444',
    color: 'white'
}

const inactiveStyle = {
    backgroundColor: '#444',
    color: '#999'
}

export const Menu = () => {
    const session = useClientSession();
    const pathname = usePathname()

    if (!session) return <></>;

    return (
        <div
            className='z-50 flex items-center justify-center sm:flex-col gap-7 p-4 w-full h-max sm:w-max sm:h-full bg-[#151515]'>
            <Link href={'/orders'}>
                <div className='hover:bg-[#444] p-2.5 rounded-2xl w-max h-max cursor-pointer' style={pathname.includes('/order') ? activeStyle : inactiveStyle}>
                    <FiHome className='w-7 h-7'/>
                </div>
            </Link>

            {/*<Link href={'/orders/current'}>*/}
            {/*    <div className='bg-[#333] p-2.5 rounded-2xl w-max h-max cursor-pointer'>*/}
            {/*        <FiHome className='w-7 h-7 text-[#999]'/>*/}
            {/*    </div>*/}
            {/*</Link>*/}

            <div className='bg-[#333] hover:bg-[#444] p-2.5 rounded-2xl w-max h-max cursor-pointer'>
                <RiMapPinLine className='w-7 h-7 text-[#999]'/>
            </div>

            <Link href={'/profile'}>
                <div className='hover:bg-[#444] p-2.5 rounded-2xl w-max h-max cursor-pointer' style={pathname.includes('/profile') ? activeStyle : inactiveStyle}>
                    <FiUser className='w-7 h-7'/>
                </div>
            </Link>
        </div>
    )
}