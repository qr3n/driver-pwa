import { aliIcon, lamodaIcon, ozonIcon, questionIcon, wildberriesIcon, yandexIcon } from "@/shared/assets";
import { Button } from "@/shared/shadcn/ui/button";
import Image from "next/image";
import { IOrder } from "@/entities/order";

const imagesMap = {
    'Яндекс маркет': yandexIcon,
    'Ozon': ozonIcon,
    'AliExpress': aliIcon,
    'Lamoda': lamodaIcon,
    'Wildberriez': wildberriesIcon
}

const calculateCost = (rawData: number, tariff: 'day' | 'night') => Math.round(rawData / 1000 * 42) + (tariff === 'day' ? 800 : 1000)
const calculateDistance = (rawData: number) => (rawData / 1000).toFixed(1).toString().replace('.', ',')


export const Order = (data: IOrder) => {
    return (
        <div className='cursor-pointer w-full bg-[#151515] flex items-center gap-4 justify-between hover:bg-[#222] p-4 rounded-2xl'>
            <div className='flex gap-4 items-center justify-center'>
                <Image
                    src={data.cargo === 'anything' ? questionIcon : imagesMap[data.warehouse]}
                    alt={'icon'}
                    width={42}
                    className='rounded-xl'
                />
                <div>
                    <h1 className='font-semibold'>
                        { calculateCost(data.cost, data.tariff) } руб.
                    </h1>

                    <p className='text-[#999] text-sm mt-1'>
                        ~{ calculateDistance(data.cost) } км
                    </p>
                </div>
            </div>
            <Button
                className='text-white bg-[#333] hover:bg-[#555] p-4 font-normal'
            >
                Забронировать
            </Button>
        </div>
    )
}