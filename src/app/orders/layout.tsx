import { PropsWithChildren, Suspense } from "react";
import Loading from "@/app/orders/loading";
import { getServerSession } from "@/entities/session/server";
import { redirect } from "next/navigation";

export default function OrdersLayout({ children }: PropsWithChildren) {
    const session = getServerSession()

    if (!session) redirect('/auth/login')


    return (
        <Suspense fallback={<Loading/>}>
            { children }
        </Suspense>
    )
}