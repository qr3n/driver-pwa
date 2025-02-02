import {
    Sheet, SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/shadcn/ui/sheet"
import Link from "next/link"
import { FaUser } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { getServerSession } from "@/entities/session/server";
import { Logout } from "@/features/auth/logout/ui/Logout";

export const SliderMenu = () => {
    const session = getServerSession()

    return session ? (
        <Sheet>
            <SheetTrigger asChild>
                <div
                    className='absolute left-6 cursor-pointer top-6 border-2 border-[#444] p-3 bg-[#222] rounded-2xl'>
                    <GiHamburgerMenu className='text-white w-5 h-5 sm:w-7 sm:h-7'/>
                </div>
            </SheetTrigger>
            <SheetContent side='left' className='bg-[#151515] border-[#222]'>
                <SheetHeader>
                    <SheetTitle className='text-white'>Меню</SheetTitle>
                    <SheetDescription className='text-[#aaa]'>
                    </SheetDescription>
                </SheetHeader>

                <Link href={'/profile'}>
                    <SheetClose asChild>
                        <div
                            className='w-full p-3 mt-8 h-max flex gap-2 rounded-xl bg-[#222] hover:bg-[#333] cursor-pointer items-center'>
                            Аккаунт
                        </div>
                    </SheetClose>
                </Link>

                <Link href={'/car'}>
                    <SheetClose asChild>
                        <div
                            className='w-full p-3 mt-4 h-max flex gap-2 rounded-xl bg-[#222] hover:bg-[#333] cursor-pointer items-center'>
                            Автомобиль
                        </div>
                    </SheetClose>
                </Link>

                <Link href={'/settings'}>
                    <SheetClose asChild>
                        <div
                            className='w-full p-3 mt-4 h-max flex gap-2 rounded-xl bg-[#222] hover:bg-[#333] cursor-pointer items-center'>
                            Настройки
                        </div>
                    </SheetClose>
                </Link>


                <Logout/>
            </SheetContent>
        </Sheet>
    ) : <></>
}