"use client";
import { useActionState } from "react";
import { ForgotPasswordAction } from "@/libs/forgot-password-action";
import Link from "next/link";

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(ForgotPasswordAction, null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d0f0e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div
          style={{
            background: "#131614",
            border: "1px solid #2e332e",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 2,
              background: "linear-gradient(90deg, #c9a84c, #6b5a28)",
            }}
          />

          <div style={{ padding: "32px 28px" }}>
            <h2 style={{ color: "#e8e4db", fontSize: 24, marginBottom: 8, fontWeight: 500, fontFamily: "'Cormorant Garamond', serif" }}>
              Resetare parolă
            </h2>
            <p style={{ color: "#9e9b94", fontSize: 13, marginBottom: 24 }}>
              Introdu adresa de email asociată contului tău. Vei primi o parolă temporară pe ecran.
            </p>

            {state?.success ? (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <div style={{ marginBottom: 24, color: "#3ecf6e", fontSize: 14 }}>
                  {state.message}
                </div>
                <div style={{ marginBottom: 12, color: "#9e9b94", fontSize: 13 }}>
                  Aceasta este noua ta parolă:
                </div>
                <div
                  style={{
                    background: "#1e2420",
                    border: "1px solid #2e332e",
                    borderRadius: 6,
                    padding: "20px",
                    fontSize: 28,
                    color: "#c9a84c",
                    fontFamily: "'DM Mono', monospace",
                    letterSpacing: "0.15em",
                    marginBottom: 32,
                    userSelect: "all",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onClick={(e) => {
                    navigator.clipboard.writeText(state.password);
                    const target = e.target as HTMLElement;
                    target.style.background = "#2e332e";
                    setTimeout(() => target.style.background = "#1e2420", 200);
                  }}
                  title="Click pentru a copia"
                >
                  {state.password}
                </div>
                <p style={{ fontSize: 12, color: "#5c5f5a", marginBottom: 32 }}>
                  Dă click pe parolă pentru a o copia, apoi mergi la pagina de autentificare.
                </p>
                <Link
                  href="/login"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "12px 0",
                    background: "#c9a84c",
                    color: "#0d0f0e",
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: "none",
                    borderRadius: 4,
                  }}
                >
                  Mergi la Autentificare
                </Link>
              </div>
            ) : (
              <>
                {state && !state.success && (
                  <div
                    style={{
                      fontSize: 13,
                      color: "#e05c5c",
                      background: "rgba(224,92,92,0.06)",
                      border: "1px solid rgba(224,92,92,0.15)",
                      borderRadius: 6,
                      padding: "12px 16px",
                      marginBottom: 24,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#e05c5c",
                        flexShrink: 0
                      }}
                    />
                    <span>{state.message}</span>
                  </div>
                )}

                <form action={formAction}>
                  <div style={{ marginBottom: 24 }}>
                    <label
                      htmlFor="email"
                      style={{
                        display: "block",
                        fontSize: 12,
                        color: "#9e9b94",
                        letterSpacing: "0.06em",
                        marginBottom: 8,
                      }}
                    >
                      Adresă email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@exemplu.com"
                      required
                      autoComplete="email"
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        background: "#0d0f0e",
                        border: "1px solid #2e332e",
                        borderRadius: 4,
                        color: "#e8e4db",
                        fontSize: 14,
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
                      onBlur={(e) => (e.target.style.borderColor = "#2e332e")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    style={{
                      width: "100%",
                      padding: "11px 0",
                      background: isPending ? "#6b5a28" : "#c9a84c",
                      color: isPending ? "#a09786" : "#0d0f0e",
                      fontSize: 14,
                      fontWeight: 500,
                      border: "none",
                      borderRadius: 4,
                      cursor: isPending ? "not-allowed" : "pointer",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {isPending ? "Se resetează..." : "Resetează parola"}
                  </button>
                </form>

                <div
                  style={{
                    textAlign: "center",
                    marginTop: 24,
                  }}
                >
                  <Link
                    href="/login"
                    style={{ color: "#c9a84c", textDecoration: "none", fontSize: 13 }}
                  >
                    ← Înapoi la autentificare
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
