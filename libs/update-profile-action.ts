"use server"

import { pool } from "@/libs/db"
import { hash, compare } from "bcryptjs"
import { auth } from "@/auth"

export async function UpdateProfile(state: any, formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) {
        return { success: false, message: "Neautorizat." }
    }

    const name = (formData.get("name") as string)?.trim()
    const email = (formData.get("email") as string)?.trim().toLowerCase()
    
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!name || !email) {
        return { success: false, message: "Numele și emailul sunt obligatorii." }
    }

    try {
        const userResult = await pool.query(
            "SELECT id, email, password, role FROM users WHERE email = $1",
            [session.user.email]
        )
        const user = userResult.rows[0]

        if (!user) {
            return { success: false, message: "Utilizatorul nu a fost găsit." }
        }

        let newHashedPassword = user.password;
        if (currentPassword || newPassword || confirmPassword) {
            if (!currentPassword || !newPassword || !confirmPassword) {
                return { success: false, message: "Toate câmpurile pentru parolă sunt obligatorii." }
            }
            if (newPassword.length < 4) {
                return { success: false, message: "Parola nouă trebuie să aibă minim 4 caractere." }
            }
            if (newPassword !== confirmPassword) {
                return { success: false, message: "Parola nouă și confirmarea nu coincid." }
            }

            const isPasswordValid = await compare(currentPassword, user.password)
            if (!isPasswordValid) {
                return { success: false, message: "Parola curentă este incorectă." }
            }
            
            newHashedPassword = await hash(newPassword, 10)
        }

        if (email !== user.email) {
            const emailExist = await pool.query(
                "SELECT id FROM users WHERE email = $1",
                [email]
            )
            if (emailExist.rows.length > 0) {
                return { success: false, message: "Există deja un cont cu acest email." }
            }
        }

        await pool.query(
            "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4",
            [name, email, newHashedPassword, user.id]
        )

        if (user.role === "ORG_OWNER") {
             // De asemenea, dacă un ORG_OWNER schimbă emailul din greșeală cu un email al altei firme asta o să eșueze din constrângerea UNIQUE.
             await pool.query(
                "UPDATE organizations SET name = $1, email = $2 WHERE email = $3",
                [name, email, user.email]
            )
        }

        return { success: true, message: "Profilul a fost actualizat cu succes." }

    } catch (error) {
        console.error("UpdateProfile error:", error)
        return { success: false, message: "Eroare la server. Încearcă din nou." }
    }
}
