import { bgMobile } from '@/shared/assets';
import { bgDesktop } from '@/shared/assets';
import { PropsWithChildren } from "react";
import { useSession } from "@/entities/session";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function AuthLayout({ children }: PropsWithChildren) {
    const session = useSession()

    if (session) redirect('/orders')

    return (
        <div className='h-full w-full flex flex-col items-center justify-center px-8'>
            <Image src={bgMobile} className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden' alt='bg'/>
            <Image src={bgDesktop} className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block' alt='bg'/>
            <div className='fixed top-0 left-0 -z-50 w-screen h-screen bg-gradient-to-b from-transparent to-black'/>

            { children }
        </div>
    )
}