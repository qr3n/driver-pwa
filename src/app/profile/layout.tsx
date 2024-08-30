import { PropsWithChildren, Suspense } from "react";
import Loading from "./loading";

export default function OrdersLayout({ children }: PropsWithChildren) {
    return (
        <Suspense fallback={<Loading/>}>
            { children }
        </Suspense>
    )
}