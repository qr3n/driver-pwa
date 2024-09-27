'use server';

import { useServerSession } from "@/entities/session/server";
import { ICar } from "@/entities/car/model/types";

export const useCar = async () => {
    const session = useServerSession()

    const data = await fetch(`https://postavan.com/api/car?driver_email=${session?.email}`, {cache: 'no-cache', next: { tags: ['car'],  }})

    const car: ICar | null = await data.json()

    return car
}