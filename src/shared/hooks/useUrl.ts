import { NextRequest } from "next/server";
import { headers } from "next/headers";

export const useUrl = () => {
    const headersList = headers()
    const referer = headersList.get("referer")

    if (referer) {
        const request = new NextRequest(referer)

        return request.nextUrl.pathname
    }

    return ''
}