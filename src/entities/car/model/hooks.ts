'use server';

import { getServerSession } from "@/entities/session/server";
import { ICar } from "@/entities/car/model/types";

export const getCar = async () => {
    const session = getServerSession()

    const data = await fetch(`https://primibox.com/api/car?driver_email=${session?.email}`, {cache: 'no-cache', next: { tags: ['car'],  }})

    const car: ICar | null = await data.json()

    return car
}