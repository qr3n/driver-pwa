import { useSession } from "@/entities/session";
import { redirect } from "next/navigation";

export default function DefaultPage() {
    const session = useSession()

    if (!session) redirect('/auth/login')
    else redirect('/orders')
}
