import { PropsWithChildren, Suspense } from "react";
import Loading from "@/app/orders/loading";
import { useServerSession } from "@/entities/session/server";
import { redirect } from "next/navigation";

export default function OrdersLayout({ children }: PropsWithChildren) {
    const session = useServerSession()

    if (!session) redirect('/auth/login')


    return (
        <Suspense fallback={<Loading/>}>
            { children }
        </Suspense>
    )
}