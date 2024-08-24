import { PropsWithChildren } from "react";
import Link from "next/link";
import { Button } from "@/shared/shadcn/ui/button";

export default function SignUpLayout ({ children }: PropsWithChildren) {
    return (
        <>
            <h1 className='text-4xl font-semibold'>Регистрация</h1>
            <div className='flex flex-col items-center justify-center w-full sm:max-w-md'>

                {children}

                <div className='flex items-center mt-4 gap-1'>
                    <p className='font-medium text-white text-[16px]'>Уже зарегестрированы?</p>
                    <Link href={'/auth/login'}>
                        <Button
                            className='font-medium text-[16px] px-1 bg-transparent hover:bg-transparent text-orange-500 hover:text-orange-400'>
                            Войти
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}