'use client';

import { PropsWithChildren } from "react";
import { OrderDetailsContext } from "@/entities/order";
import { Dialog, DialogContent } from "@/shared/shadcn/ui/dialog";

export const OrderDetailsProvider = ({ children }: PropsWithChildren) => {
    return (
        <OrderDetailsContext.Provider value={null!}>
            <Dialog>
                { children }

                <DialogContent>

                </DialogContent>
            </Dialog>
        </OrderDetailsContext.Provider>
    )
}