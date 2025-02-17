'use client';

import { FiHome, FiUser } from "react-icons/fi";
import { useClientSession } from "@/entities/session/client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaCar } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { CheckCircleIcon } from "lucide-react";

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
                <div className='hover:bg-[#444] p-2.5 rounded-2xl w-max h-max cursor-pointer' style={pathname === '/orders' ? activeStyle : inactiveStyle}>
                    <FiHome className='w-7 h-7'/>
                </div>
            </Link>

            <Link href={'/orders/active'}>
                <div className='hover:bg-[#444] p-2.5 rounded-2xl w-max h-max cursor-pointer' style={pathname === '/orders/active' ? activeStyle : inactiveStyle}>
                    <TbSteeringWheel className='w-7 h-7'/>
                </div>
            </Link>

            {/*<Link href={'/profile'}>*/}
            {/*    <div className='hover:bg-[#444] p-2.5 rounded-2xl w-max h-max cursor-pointer'*/}
            {/*         style={pathname.includes('/profile') ? activeStyle : inactiveStyle}>*/}
            {/*        <FiUser className='w-7 h-7'/>*/}
            {/*    </div>*/}
            {/*</Link>*/}

            {/*<Link href={'/car'}>*/}
            {/*    <div className='hover:bg-[#444] p-2.5 rounded-2xl w-max h-max cursor-pointer'*/}
            {/*         style={pathname.includes('/car') ? activeStyle : inactiveStyle}>*/}
            {/*        <FaCar className='w-7 h-7'/>*/}
            {/*    </div>*/}
            {/*</Link>*/}

            <Link href={'/orders/completed'}>
                <div className='hover:bg-[#444] p-2.5 rounded-2xl w-max h-max cursor-pointer'
                     style={pathname.includes('/orders/completed') ? activeStyle : inactiveStyle}>
                    <CheckCircleIcon className='w-7 h-7'/>
                </div>
            </Link>
        </div>
    )
}