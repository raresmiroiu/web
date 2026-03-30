"use client";
import Link from "next/link";
import { useActionState } from "react";
import { UpdateProfile } from "@/libs/update-profile-action";

const inputStyle = {
    width: "100%", padding: "10px 14px",
    background: "#0d0f0e", border: "1px solid #2e332e",
    borderRadius: 4, color: "#e8e4db", fontSize: 14,
    outline: "none", boxSizing: "border-box" as const,
    fontFamily: "'Outfit', sans-serif",
};

const labelStyle = {
    display: "block", fontSize: 11, color: "#9e9b94",
    letterSpacing: "0.08em", textTransform: "uppercase" as const,
    marginBottom: 8,
};

type EditProfileFormProps = {
    user: {
        name: string;
        email: string;
        role: string;
    };
    backLink: string;
};

export default function EditProfileForm({ user, backLink }: EditProfileFormProps) {
    const [state, formAction, isPending] = useActionState(UpdateProfile, null);
    
    // Get Initials for Avatar
    const initials = user.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() || "NN";
    const roleLabel = user.role === "ORG_OWNER" ? "Organizație" : "Participant";

    return (
        <form action={formAction}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <Link href={backLink} style={{ color: "#5c5f5a", textDecoration: "none", fontSize: 13 }}>
                    ← Înapoi
                </Link>
            </div>

            <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300,
                color: "#e8e4db", marginBottom: 4,
            }}>
                Editare <em style={{ color: "#c9a84c", fontStyle: "italic" }}>profil</em>
            </h1>
            <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 36 }}>
                Actualizează-ți informațiile personale și credențialele.
            </p>

            {state && (
                <div style={{
                    fontSize: 13, color: state.success ? "#3ecf6e" : "#e05c5c",
                    background: state.success ? "rgba(62,207,110,0.06)" : "rgba(224,92,92,0.06)",
                    border: state.success ? "1px solid rgba(62,207,110,0.15)" : "1px solid rgba(224,92,92,0.15)",
                    borderRadius: 6, padding: "12px 16px",
                    marginBottom: 24,
                    display: "flex", alignItems: "center", gap: 8,
                }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: state.success ? "#3ecf6e" : "#e05c5c" }} />
                    {state.message}
                </div>
            )}

            <div style={{
                display: "flex", alignItems: "center", gap: 20,
                marginBottom: 36,
                padding: "24px",
                background: "#131614", border: "1px solid #2e332e",
                borderRadius: 8,
            }}>
                <div style={{
                    width: 64, height: 64,
                    borderRadius: "50%",
                    background: "#1e2420",
                    border: "2px solid #2e332e",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, color: "#c9a84c",
                    fontFamily: "'DM Mono', monospace",
                    flexShrink: 0,
                }}>
                    {initials}
                </div>
                <div>
                    <div style={{ fontSize: 16, color: "#e8e4db", fontWeight: 500, marginBottom: 4 }}>
                        {user.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#5c5f5a" }}>
                        {roleLabel}
                    </div>
                </div>
            </div>

            {/* Personal Info Section */}
            <div style={{
                background: "#131614", border: "1px solid #2e332e",
                borderRadius: 8, overflow: "hidden", marginBottom: 24,
            }}>
                <div style={{ height: 2, background: "linear-gradient(90deg, #c9a84c, #6b5a28)" }} />
                <div style={{ padding: "28px 24px" }}>
                    <p style={{
                        fontSize: 10, color: "#c9a84c",
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        marginBottom: 20,
                    }}>
                        Informații personale
                    </p>

                    <div style={{ marginBottom: 20 }}>
                        <label htmlFor="name" style={labelStyle}>Nume complet</label>
                        <input id="name" name="name" type="text" defaultValue={user.name} style={inputStyle} required
                            onFocus={e => e.target.style.borderColor = "#c9a84c"}
                            onBlur={e => e.target.style.borderColor = "#2e332e"} />
                    </div>

                    <div style={{ marginBottom: 0 }}>
                        <label htmlFor="email" style={labelStyle}>Adresă email</label>
                        <input id="email" name="email" type="email" defaultValue={user.email} style={inputStyle} required
                            onFocus={e => e.target.style.borderColor = "#c9a84c"}
                            onBlur={e => e.target.style.borderColor = "#2e332e"} />
                    </div>
                </div>
            </div>

            <div style={{
                background: "#131614", border: "1px solid #2e332e",
                borderRadius: 8, overflow: "hidden", marginBottom: 32,
            }}>
                <div style={{ padding: "28px 24px" }}>
                    <p style={{
                        fontSize: 10, color: "#c9a84c",
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        marginBottom: 20,
                    }}>
                        Schimbă parola
                    </p>
                    <p style={{ fontSize: 12, color: "#5c5f5a", marginBottom: 16 }}>
                        Lasă aceste câmpuri goale dacă nu dorești să modifici parola.
                    </p>

                    <div style={{ marginBottom: 20 }}>
                        <label htmlFor="currentPassword" style={labelStyle}>Parola curentă</label>
                        <input id="currentPassword" name="currentPassword" type="password" placeholder="••••••••" style={inputStyle}
                            onFocus={e => e.target.style.borderColor = "#c9a84c"}
                            onBlur={e => e.target.style.borderColor = "#2e332e"} />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label htmlFor="newPassword" style={labelStyle}>Parola nouă</label>
                        <input id="newPassword" name="newPassword" type="password" placeholder="••••••••" style={inputStyle}
                            onFocus={e => e.target.style.borderColor = "#c9a84c"}
                            onBlur={e => e.target.style.borderColor = "#2e332e"} />
                    </div>

                    <div style={{ marginBottom: 0 }}>
                        <label htmlFor="confirmPassword" style={labelStyle}>Confirmă parola nouă</label>
                        <input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" style={inputStyle}
                            onFocus={e => e.target.style.borderColor = "#c9a84c"}
                            onBlur={e => e.target.style.borderColor = "#2e332e"} />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12 }}>
                <button type="submit" disabled={isPending} style={{
                    flex: 1, padding: "12px 0",
                    background: isPending ? "#6b5a28" : "#c9a84c", 
                    color: isPending ? "#a09786" : "#0d0f0e",
                    fontSize: 14, fontWeight: 500,
                    border: "none", borderRadius: 4,
                    cursor: isPending ? "not-allowed" : "pointer", 
                    letterSpacing: "0.04em",
                    fontFamily: "'Outfit', sans-serif",
                }}>
                    {isPending ? "Se salvează..." : "Salvează modificările"}
                </button>
                <Link href={backLink} style={{
                    padding: "11px 24px",
                    fontSize: 14, color: "#9e9b94",
                    border: "1px solid #2e332e",
                    borderRadius: 4, textDecoration: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    Anulează
                </Link>
            </div>
        </form>
    );
}
