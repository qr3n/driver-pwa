'use client';

import { Avatar } from "@/app/profile/avatar";
import { ChangeAccountInfo } from "@/features/account/ui/ChangeAccountInfo";
import { useClientSession } from "@/entities/session/client";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/shared/api/services/account";

export default function ProfilePage() {
    const session = useClientSession()
    const { data, isLoading } = useQuery({
        queryFn: accountService.getInfo,
        queryKey: ['getInfo']
    })

    return !isLoading ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Avatar email={session?.email || ''}/>
            <h1 className='text-2xl md:text-3xl font-semibold mt-8'>{data?.data.name || 'Новый пользователь'}</h1>
            <p className='text-sm sm:text-base text-[#999] mt-1'>{session?.email}</p>
            { data && <ChangeAccountInfo accountInfo={data.data}/> }
        </div>
    ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">

        </div>
    )
}