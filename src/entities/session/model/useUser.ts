import { cookies } from "next/headers";

export const useUser = () => {
    const token = cookies().get('token')

    if (!token?.value) return null

    return {}
}