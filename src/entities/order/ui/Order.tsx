import { aliIcon, lamodaIcon, ozonIcon, questionIcon, wildberriesIcon, yandexIcon } from "@/shared/assets";
import { OpenOrderDetails } from "./OpenOrderDetails";
import { Button } from "@/shared/shadcn/ui/button";
import { calculateCost, calculateDistance, IOrder } from "@/entities/order";
import Image from "next/image";

const imagesMap = {
    'Яндекс маркет': yandexIcon,
    'Ozon': ozonIcon,
    'AliExpress': aliIcon,
    'Lamoda': lamodaIcon,
    'Wildberries': wildberriesIcon
}

export const Order = (data: IOrder) => {
    return (
        <div
            className='relative cursor-pointer w-full bg-[#151515] flex items-center gap-4 justify-between hover:bg-[#222] p-4 rounded-2xl'>
            <OpenOrderDetails {...data}/>
            <div className='flex gap-4 items-center justify-center'>
                <Image
                    src={data.cargo === 'anything' ? questionIcon : imagesMap[data.warehouse]}
                    alt={'icon'}
                    width={42}
                    height={42}
                    className='rounded-xl object-cover'
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
            <Button
                className='text-white bg-blue-500 hover:bg-blue-400 font-semibold p-4 z-20'
            >
                Забронировать
            </Button>
        </div>
    )
}