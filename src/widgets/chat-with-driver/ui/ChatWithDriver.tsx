'use client';

import { ReactElement } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/shared/shadcn/ui/dialog";
import { BsChatFill } from "react-icons/bs";
import { NewChat } from "@/shared/ui/chat/ui/NewChat";
import { useClientSession } from "@/entities/session/client";

export const ChatWithDriver = ({
                                   userId,
    trigger
}: {
    userId: string,
    trigger: ReactElement
} ) => {
    const session = useClientSession()

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Чат с клиентом</DialogTitle>
                    <DialogDescription>Вы подключены</DialogDescription>
                </DialogHeader>
                <NewChat
                    userType={'driver'}
                    userId={session?.id || ''}
                    targetId={userId}
                    userName={''}
                    targetName={''}
                />
            </DialogContent>
        </Dialog>
    )
}