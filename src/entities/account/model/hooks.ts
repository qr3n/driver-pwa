import { useServerSession } from "@/entities/session/server";
import { ICar } from "@/entities/car/model/types";
import { IAccountInfo } from "@/entities/account/model/types";

export const useAccountInfo = async () => {
    const session = useServerSession()

    const data = await fetch(`https://postavan.com/api/driver-info?driver_email=${session?.email}`, {cache: 'no-cache', next: { tags: ['info'] }})

    const car: IAccountInfo | null = await data.json()

    return car
}