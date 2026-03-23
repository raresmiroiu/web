"use server"
import { pool } from "@/libs/db"
import { revalidatePath } from "next/cache"

export async function approveOrg(orgId: string) {
    await pool.query(
        "UPDATE organizations SET status = 'ACTIVE' WHERE id = $1", [orgId]
    );
    revalidatePath("/admin/orgs");
    revalidatePath("/admin");
}

export async function suspendOrg(orgId: string) {
    await pool.query(
        "UPDATE organizations SET status = 'SUSPENDED' WHERE id = $1", [orgId]
    );
    revalidatePath("/admin/orgs");
    revalidatePath("/admin");
}

export async function reactivateOrg(orgId: string) {
    await pool.query(
        "UPDATE organizations SET status = 'ACTIVE' WHERE id = $1", [orgId]
    );
    revalidatePath("/admin/orgs");
    revalidatePath("/admin");
}

export async function rejectOrg(orgId: string) {
    await pool.query(
        "UPDATE organizations SET status = 'REJECTED' WHERE id = $1", [orgId]
    );
    revalidatePath("/admin/orgs");
    revalidatePath("/admin");
}