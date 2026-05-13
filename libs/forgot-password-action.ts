"use server";

import { pool } from "@/libs/db";
import { hash } from "bcryptjs";

export async function ForgotPasswordAction(state: any, formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();

  if (!email) {
    return { success: false, message: "Emailul este obligatoriu." };
  }

  try {
    const userResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );

    if (userResult.rows.length === 0) {
      return { 
        success: false, 
        message: "Nu am găsit niciun cont cu acest email." 
      };
    }

    const user = userResult.rows[0];
    
    // Generate random 8-char password
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    let newPassword = "";
    for (let i = 0; i < 8; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const hashed = await hash(newPassword, 10);

    await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2",
      [hashed, user.id]
    );

    return { 
      success: true, 
      message: "Parola a fost resetată cu succes.",
      password: newPassword
    };
  } catch (error) {
    console.error("ForgotPassword error:", error);
    return { success: false, message: "A apărut o eroare la server." };
  }
}
