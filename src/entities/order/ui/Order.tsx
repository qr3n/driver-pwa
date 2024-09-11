import { aliIcon, lamodaIcon, ozonIcon, questionIcon, wildberriesIcon, yandexIcon } from "@/shared/assets";
import { OpenOrderDetails } from "./OpenOrderDetails";
import { calculateCost, calculateDistance, IOrder, useCurrentOrder } from "@/entities/order";
import Image from "next/image";
import { TakeOrDiscountButton } from "./TakeOrDiscountButton";
import { OrderTakeOrDiscount } from "@/entities/order/ui/OrderTakeOrDiscount";

const imagesMap = {
    'Яндекс маркет': yandexIcon,
    'Ozon': ozonIcon,
    'AliExpress': aliIcon,
    'Lamoda': lamodaIcon,
    'Wildberries': wildberriesIcon
}

export const Order = async (data: IOrder) => {
    const currentOrder = await useCurrentOrder()

    return (
        <div
            className='relative cursor-pointer w-full bg-[#151515] flex flex-col-reverse sm:flex-row-reverse sm:items-center gap-4 justify-between hover:bg-[#222] p-4 rounded-2xl'>
            <OrderTakeOrDiscount createdAt={data.timestamp}>
                <OpenOrderDetails {...data}/>
                <div className='sm:max-w-min'>
                    <TakeOrDiscountButton order={data} currentOrder={currentOrder}/>
                </div>
            </OrderTakeOrDiscount>

            <div className='flex gap-4 sm:justify-center'>
                <Image
                    src={data.cargo === 'anything' ? questionIcon : imagesMap[data.warehouse]}
                    placeholder='blur'
                    alt={'icon'}
                    width={42}
                    height={42}
                    className='rounded-xl object-cover h-max'
                />
                <div>
                    <h1 className='font-semibold'>
                        {calculateCost(data.cost, data.tariff)} руб.
                    </h1>

                    <p className='text-[#999] text-sm mt-1'>
                        ~{calculateDistance(data.cost)} км
                    </p>

                </div>
            </div>
        </div>
    )
}