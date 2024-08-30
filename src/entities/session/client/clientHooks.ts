import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { ISession } from "@/entities/session";

export const useClientSession = () => {
    const cookies = useCookies()
    const token = cookies.get('access_token')

    if (!token) return null

    return {
        ...jwtDecode<ISession>(token),
        token: token
    }
}