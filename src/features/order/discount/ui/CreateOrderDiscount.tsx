import { Dialog, DialogTrigger } from "@/shared/shadcn/ui/dialog";
import { CreateOrderDiscountModal } from "./CreateOrderDiscountModal";

export const CreateOrderDiscount = ({ order_id }: { order_id: number }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='relative w-full h-[50px] pt-12'>
                    <button className="wrapper">
                        <p className="wave-btn text-sm"><span>Скидка</span></p>
                    </button>
                </div>
            </DialogTrigger>
            <CreateOrderDiscountModal order_id={order_id}/>
        </Dialog>
    )
}
