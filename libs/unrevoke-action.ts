"use server"

import { pool } from "@/libs/db"
import { revalidatePath } from "next/cache"

export async function unrevokeAction(certId: string) {
    await pool.query(
        "UPDATE certificates SET revoked = FALSE, revoked_at = NULL WHERE id = $1",
        [certId]
    );
    revalidatePath("/org/certificates");
}