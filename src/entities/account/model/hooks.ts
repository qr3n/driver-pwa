import { getServerSession } from "@/entities/session/server";
import { ICar } from "@/entities/car/model/types";
import { IAccountInfo } from "@/entities/account/model/types";

export const getAccountInfo = async () => {
    const session = getServerSession()

    const data = await fetch(`https://primibox.com/api/driver/profile`, {cache: 'no-cache', next: { tags: ['info'] }})

    const car: IAccountInfo | null = await data.json()

    return car
}