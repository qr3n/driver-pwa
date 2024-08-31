import { Loader2 } from "lucide-react";

export default function Loading(){
    return (
        <div className='flex items-center justify-center fixed top-0 left-0 bg-black w-screen h-screen'>
            <Loader2 className='animate-spin w-10 h-10 text-[#aaa]'/>
        </div>
    )
}