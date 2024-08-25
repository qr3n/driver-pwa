"use server";

import { revalidateTag as revalidate } from "next/cache";

export async function revalidateTagFrontend(name: string): Promise<void> {
    revalidate(name);
}
