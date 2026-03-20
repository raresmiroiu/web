"use server"

import {pool} from "@/libs/db"
import { revalidatePath } from "next/cache"

export async function revokeAction(certId:string) {
    await pool.query(
        "UPDATE certificates SET revoked = TRUE, revoked_at = NOW() WHERE id = $1",
        [certId]
    );
    revalidatePath("org/certificates");
}