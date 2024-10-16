import { useServerSession } from "@/entities/session/server";
import { redirect } from "next/navigation";
import { Avatar } from "@/app/profile/avatar";
import { AddAccountInfo } from "@/features/account/ui/AddAccountInfo";
import { useAccountInfo } from "@/entities/account/model/hooks";
import { ChangeAccountInfo } from "@/features/account/ui/ChangeAccountInfo";

export default async function ProfilePage() {
    const session = useServerSession()

    if (!session) redirect('/auth/login');

    const info = await useAccountInfo()

    return info ? (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Avatar email={session.email}/>
            <h1 className='text-2xl md:text-3xl font-semibold mt-8'>{info.name} {info.surname}</h1>
            <p className='text-sm sm:text-base text-[#999] mt-1'>{session.email}</p>
            <ChangeAccountInfo accountInfo={info}/>
        </div>
    ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Avatar email={session.email}/>
            <h1 className='text-2xl md:text-3xl font-semibold mt-8'>Новый водитель</h1>
            <p className='text-sm sm:text-base text-[#999] mt-1'>{session.email}</p>
            <AddAccountInfo/>
        </div>
    )
}