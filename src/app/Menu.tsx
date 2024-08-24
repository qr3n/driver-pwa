import { useUser } from "@/entities/session";

export const Menu = () => {
    const user = useUser()

    if (!user) return <></>

    return (
        <div className='p-5 w-full h-max sm:w-max sm:h-full'>
            <div className='w-full p-4 bg-[#333] rounded-full'>

            </div>
        </div>
    )
}