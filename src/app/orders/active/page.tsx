

import { IOrder, getCurrentOrders } from "@/entities/order";
import Image from "next/image";
import { aliIcon, lamodaIcon, ozonIcon, questionIcon, wildberriesIcon, yandexIcon } from "@/shared/assets";
import Link from "next/link";

const imagesMap = {
    'Яндекс маркет': yandexIcon,
    'Ozon': ozonIcon,
    'AliExpress': aliIcon,
    'Lamoda': lamodaIcon,
    'Wildberries': wildberriesIcon
}

const Order = (data: IOrder) => {
    return (
        <Link href={`/orders/active/${data.id}`}>
            <div
                className='relative cursor-pointer w-full bg-[#151515] flex flex-col-reverse gap-4 hover:bg-[#222] p-4 rounded-3xl'>
                <div className='flex gap-4 items-center'>
                    <Image
                        src={data.shipment_type === 'anything' ? questionIcon : imagesMap[data.marketplace]}
                        placeholder='blur'
                        alt={'icon'}
                        width={48}
                        height={48}
                        className='rounded-xl object-cover h-max'
                    />
                    <div>
                        <h1 className='font-semibold'>
                            {data.pickup_date} с ${data.pickup_time_from} до ${data.pickup_time_to}
                        </h1>
                        <p className='p-3 bg-[#333] border border-[#555] w-full max-w-[400px] rounded-xl text-[#ddd] font-medium text-sm mt-1 '>
                            {data.pickup_addresses[0].replace('г Москва,', '')}
                            <span className='font-normal text-[#aaa]'> до</span> {data.delivery_addresses[0].replace('г Москва,', '')}
                        </p>
                        <h1 className='text-center bg-blue-900  text-white font-medium text-xs px-4 py-1 mt-3 w-max rounded-full'>
                            {data.cost} руб.
                        </h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default async function ActiveOrders() {
    const orders = await getCurrentOrders()

    return (
        <div className='flex flex-col w-full items-center justify-center pt-20 md:pt-24 px-4'>
            <h1 className='text-3xl sm:text-4xl font-semibold'>Выполняю</h1>
            <div
                className='max-w-3xl w-full flex flex-col gap-4 overflow-y-auto h-[calc(100dvh-250px)] sm:h-[calc(100dvh-190px)] mt-8'>
                {orders.map(order => <Order key={order.id} {...order}/>)}
            </div>
        </div>
    )
}