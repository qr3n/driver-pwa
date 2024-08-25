import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { ISession } from "../model/types";

export const useServerSession = () => {
    const token = cookies().get('access_token')

    if (!token?.value) return null

    return jwtDecode<ISession>(token.value)
}
