import { PropsWithChildren, Suspense } from "react";
import Loading from "@/app/orders/loading";

export default function OrdersLayout({ children }: PropsWithChildren) {
    return (
        <Suspense fallback={<Loading/>}>
            { children }
        </Suspense>
    )
}