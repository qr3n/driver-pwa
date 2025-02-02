import { getServerSession } from "@/entities/session/server";
import { redirect } from "next/navigation";

export default function DefaultPage() {
    const session = getServerSession()

    if (!session) redirect('/auth/login')
    else redirect('/orders')
}
