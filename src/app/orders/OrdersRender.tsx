'use server';

import { IOrder, Order } from "@/entities/order";
import { bgDesktop, bgMobile, dolphin } from "@/shared/assets";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/shadcn/ui/tabs";

interface IProps {
    orders: IOrder[],
    type: 'active' | 'planned' | 'taken'
}

interface GroupedItemsType {
    [key: string]: IOrder[];
}

export const OrdersRender = async (props: IProps) => {
    const splitOrders = props.orders.filter(o => o.need_split)
    const noSplitOrders = props.orders.filter(o => !o.need_split)

    const groupedOrders: GroupedItemsType = splitOrders.reduce((acc: GroupedItemsType, item: IOrder) => {
        const groupKey = item.split_group === null
            ? `null_${Math.random().toString(36).substring(2)}`
            : item.split_group;

        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
    }, {});

    return (
        <>
            <Tabs defaultValue={'split'} className='w-full flex flex-col items-center'>
                <TabsList>
                    <TabsTrigger className='data-[state=active]:bg-green-500 data-[state=active]:text-white font-medium' value={'split'}>На попутке</TabsTrigger>
                    <TabsTrigger className='data-[state=active]:bg-blue-500 data-[state=active]:text-white font-medium' value={'no-split'}>Индивидуальные</TabsTrigger>
                </TabsList>

                <TabsContent value={'split'} className='w-full max-w-3xl mt-8'>
                    { !props.orders.length && (
                        <div className='w-full h-full flex relative items-center flex-col text-center justify-center'>
                            <Image placeholder="blur" src={bgMobile} className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden' alt='bg'/>
                            <Image placeholder="blur" src={bgDesktop} className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block' alt='bg'/>
                            <div
                                className='fixed top-0 left-0 -z-50 w-[100dvw] h-[100dvh] bg-gradient-to-b from-transparent to-black'/>
                            <div className='absolute top-8 flex items-center justify-center flex-col'>
                                <Image priority src={dolphin} width={350} height={350} alt='test' className='w-40 sm:w-44 md:w-44 lg:w-48 xl:w-56'/>
                                <h1 className='text-2xl md:text-3xl font-semibold mt-8'>
                                    Заказов пока нет.
                                </h1>
                                <h2 className='text-sm sm:text-base text-[#999] mt-1'>
                                    Попробуйте поискать в <span className='text-blue-500 cursor-pointer'>
                            { props.type === 'active' && 'запланированных' }
                                    { props.type === 'planned' && 'сегодняшних' }
                                    { props.type === 'taken' && 'сегодняшних' }
                        </span>
                                </h2>
                            </div>
                        </div>
                    )}
                    {Object.entries(groupedOrders).map(([groupKey, groupItems]) => {
                        const groupTitle = groupKey.startsWith('null_') ? 'Без группы' : groupKey;

                        return (
                            <div
                                key={groupKey}
                                className="bg-green-500/50 mb-8 border-2 border-green-500/40 p-4 rounded-3xl hover:bg-green-500/60 transition-all"
                            >
                                <div className="group-items flex flex-col w-full ">
                                    {groupItems.map((item, index) => (
                                        <Order key={item.id} {...item}/>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </TabsContent>

                <TabsContent value={'no-split'} className='w-full max-w-3xl mt-8'>
                    { !noSplitOrders.length && (
                        <div className='w-full h-full flex relative items-center flex-col text-center justify-center'>
                            <Image placeholder="blur" src={bgMobile} className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 md:hidden' alt='bg'/>
                            <Image placeholder="blur" src={bgDesktop} className='fixed w-[100dvw] h-[100dvh] object-cover top-0 left-0 -z-50 hidden md:block' alt='bg'/>
                            <div
                                className='fixed top-0 left-0 -z-50 w-[100dvw] h-[100dvh] bg-gradient-to-b from-transparent to-black'/>
                            <div className='absolute top-8 flex items-center justify-center flex-col'>
                                <Image priority src={dolphin} width={350} height={350} alt='test' className='w-40 sm:w-44 md:w-44 lg:w-48 xl:w-56'/>
                                <h1 className='text-2xl md:text-3xl font-semibold mt-8'>
                                    Заказов пока нет.
                                </h1>
                                <h2 className='text-sm sm:text-base text-[#999] mt-1'>
                                    Попробуйте поискать в <span className='text-blue-500 cursor-pointer'>
                            { props.type === 'active' && 'запланированных' }
                                    { props.type === 'planned' && 'сегодняшних' }
                                    { props.type === 'taken' && 'сегодняшних' }
                        </span>
                                </h2>
                            </div>
                        </div>
                    )}
                    {noSplitOrders.map(order => <Order key={order.id} {...order}/>)}
                </TabsContent>
            </Tabs>
        </>
    )
}