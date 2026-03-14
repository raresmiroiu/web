"use server"

import { auth, signIn } from "../auth"
import { executeAction } from "./executeAction"
import { redirect } from "next/navigation"
import {pool} from "@/libs/db"

export async function LoginAction(formData: FormData) {
    const email = formData.get("email") as string
    const res = await executeAction({
        actionFn: async () => {
            await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirect: false,
            });
        },
    });
    if (res.success) {
        const result = await pool.query(
            "SELECT role FROM users WHERE email = $1",
            [email]
        )
        const role = result.rows[0]?.role

        if (role === "ADMIN") redirect("/admin")
        else if (role === "ORG_OWNER") redirect("/org")
        else redirect("/me")
    }
    return res;
}