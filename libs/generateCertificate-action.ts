"use server"

import { pool } from "@/libs/db"
import { revalidatePath } from "next/cache";
import crypto from "crypto"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

function generateCode(): string {
    return "SIG-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

export async function generateCertificate(formData: FormData) {
    const session = await auth();
    const orgName = session?.user.name;
    const orgResult = await pool.query(
        "SELECT id FROM organizations WHERE name = $1",
        [orgName]
    )

    const orgId = orgResult.rows[0]?.id
    if (!orgId) return { success: false, message: "Organizație negăsită." }

    const name = formData.get("recipientName");
    const email = formData.get("recipientEmail");
    const recipientResult = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
    );
    const recipientId = recipientResult.rows[0]?.id;
    if (!recipientId)
        return { success: false, message: "Utilizatorul nu există în baza de date" }
    let code = generateCode();
    let exists = true;
    while (exists) {
        const check = await pool.query(
            "SELECT id FROM certificates WHERE code = $1",
            [code]
        );
        exists = check.rows.length > 0;
        if (exists) {
            code = generateCode();
        }
    }
    const title = formData.get("title");
    const type = formData.get("type");
    const domain = formData.get("domain");
    const issuedAt = formData.get("issuedAt");
    const templateIdRaw = formData.get("templateId") as string;
    const templateId = templateIdRaw ? parseInt(templateIdRaw, 10) : null;

    if (!name || !email || !title || !type || !domain || !issuedAt) {
        return { success: false, message: "Toate câmpurile sunt obligatorii." }
    }


    const insert = await pool.query(
        `INSERT INTO certificates (code, title, type, domain, recipient_id, org_id, issued_at, template_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        `, [
        code,
        title,
        type,
        domain,
        recipientId,
        orgId,
        issuedAt || new Date().toISOString().split("T")[0],
        templateId,
    ]
    )

    revalidatePath("/org/certificates");
    redirect("/org/certificates");

}