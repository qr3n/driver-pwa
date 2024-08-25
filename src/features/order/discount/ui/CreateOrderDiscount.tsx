import { Dialog, DialogContent, DialogTrigger } from "@/shared/shadcn/ui/dialog";

export const CreateOrderDiscount = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='relative w-full h-[50px] pt-12'>
                    <button className="wrapper">
                        <p className="wave-btn text-sm"><span>Скидка</span></p>
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className='bg-[#161616] h-[100dvh] sm:h-[60dvh] sm:max-h-[80dvh] flex flex-col'>
                <div className='mt-5'>
                    <h1 className='text-3xl text-center font-semibold'>Предложить скидку</h1>
                </div>
            </DialogContent>
        </Dialog>
    )
}