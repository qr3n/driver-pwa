import { useServerSession } from "@/entities/session/server";
import { redirect } from "next/navigation";
import { Avatar } from "@/app/profile/avatar";

export default function ProfilePage() {
    const session = useServerSession()

    if (!session) redirect('/auth/login');

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Avatar email={session.email}/>
            <h1 className='text-2xl md:text-3xl font-semibold mt-8'>Новый водитель</h1>
            <p className='text-sm sm:text-base text-[#999] mt-1'>{ session.email }</p>
        </div>
    )
}