import { useServerSession } from "@/entities/session/server";
import { redirect } from "next/navigation";

export default function DefaultPage() {
    const session = useServerSession()

    if (!session) redirect('/auth/login')
    else redirect('/orders')
}
