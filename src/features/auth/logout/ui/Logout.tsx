'use client';

import { useCookies } from "next-client-cookies";
import { Button } from "@/shared/shadcn/ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { SheetClose } from "@/shared/shadcn/ui/sheet";

export const Logout = () => {
    const cookies = useCookies()
    const router = useRouter()

    return (
        <SheetClose className='w-full mt-12'>
            <Button className='w-full bg-white hover:bg-[#ddd] text-black' onClick={() => {
                cookies.remove('access_token')
                router.push('/auth/login')
            }}>
                Выйти из аккаунта
                <LogOut className='w-4 h-4'/>
            </Button>
        </SheetClose>
    )
}