// libs/register-action.ts
"use server"

import { pool } from "@/libs/db"
import { hash } from "bcryptjs"
import { redirect } from "next/navigation"
import { executeAction } from "./executeAction"

export async function RegisterAction(formData: FormData) {
    const name = (formData.get("name") as string)?.trim()
    const email = (formData.get("email") as string)?.trim().toLowerCase()
    const password = formData.get("password") as string
    const confirm = formData.get("confirm") as string
    const role = formData.get("role") as string
    const validRoles = ["PARTICIPANT", "ORG_OWNER"]
    const finalRole = validRoles.includes(role) ? role : "PARTICIPANT"

    // Validare basic
    if (!name || !email || !password) {
        return { success: false, message: "Toate câmpurile sunt obligatorii." }
    }

    if (password.length < 4) {
        return { success: false, message: "Parola trebuie să aibă minim 4 caractere." }
    }

    if (password !== confirm) {
        return { success: false, message: "Parolele nu coincid." }
    }

    // Validare email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { success: false, message: "Adresă de email invalidă." }
    }
    let shouldRedirect = false
    try {
        // Verifică dacă emailul există deja
        const existing = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [email]
        )
        if (existing.rows.length > 0) {
            return { success: false, message: "Există deja un cont cu acest email." }
        }

        const hashedPassword = await hash(password, 10)

        await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
            [name, email, hashedPassword, finalRole]
        )
        shouldRedirect = true
    } catch (error) {
        console.error("Register error:", error)
        return { success: false, message: "Eroare server. Încearcă din nou." }
    }

    if (shouldRedirect) {
        redirect("/login")
    }
}