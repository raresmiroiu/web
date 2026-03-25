"use client";
import { LoginAction } from "@/libs/login-action";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0d0f0e",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24,
      fontFamily: "'Outfit', sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{
          background: "#131614",
          border: "1px solid #2e332e",
          borderRadius: 8,
          overflow: "hidden",
        }}>
          <div style={{ height: 2, background: "linear-gradient(90deg, #c9a84c, #6b5a28)" }} />

          <div style={{ padding: "32px 28px" }}>
            <form action={async (formData) => {
              const res = await LoginAction(formData);
              if (!res.success) alert("Credențiale invalide");
            }}>

              <div style={{ marginBottom: 20 }}>
                <label htmlFor="email" style={{ display: "block", fontSize: 12, color: "#9e9b94", letterSpacing: "0.06em", marginBottom: 8 }}>
                  Adresă email
                </label>
                <input
                  id="email" name="email" type="email"
                  placeholder="tu@exemplu.com"
                  required autoComplete="email"
                  style={{
                    width: "100%", padding: "10px 14px",
                    background: "#0d0f0e", border: "1px solid #2e332e",
                    borderRadius: 4, color: "#e8e4db", fontSize: 14,
                    outline: "none", boxSizing: "border-box",
                  }}
                  onFocus={e => e.target.style.borderColor = "#c9a84c"}
                  onBlur={e => e.target.style.borderColor = "#2e332e"}
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label htmlFor="password" style={{ display: "block", fontSize: 12, color: "#9e9b94", letterSpacing: "0.06em", marginBottom: 8 }}>
                  Parolă
                </label>
                <input
                  id="password" name="password" type="password"
                  placeholder="••••••••"
                  required autoComplete="current-password"
                  style={{
                    width: "100%", padding: "10px 14px",
                    background: "#0d0f0e", border: "1px solid #2e332e",
                    borderRadius: 4, color: "#e8e4db", fontSize: 14,
                    outline: "none", boxSizing: "border-box",
                  }}
                  onFocus={e => e.target.style.borderColor = "#c9a84c"}
                  onBlur={e => e.target.style.borderColor = "#2e332e"}
                />
              </div>

              <button type="submit" style={{
                width: "100%", padding: "11px 0",
                background: "#c9a84c", color: "#0d0f0e",
                fontSize: 14, fontWeight: 500,
                border: "none", borderRadius: 4,
                cursor: "pointer", letterSpacing: "0.04em",
              }}>
                Autentificare
              </button>
            </form>

            <p style={{ textAlign: "center", fontSize: 13, color: "#5c5f5a", marginTop: 24 }}>
              Nu ai cont?{" "}
              <Link href="/register" style={{ color: "#c9a84c", textDecoration: "none" }}>
                Înregistrează-te
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
