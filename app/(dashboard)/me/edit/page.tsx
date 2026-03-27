"use client";
import NavbarDashboard from "@/components/NavbarDashboard";
import Link from "next/link";
import { useState } from "react";

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

export default function EditProfilePage() {
    const [saved, setSaved] = useState(false);

    return (
        <main style={{ background: "#0d0f0e", minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
            <div style={{ maxWidth: 560, margin: "0 auto", padding: "100px 24px 60px" }}>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <Link href="/me" style={{ color: "#5c5f5a", textDecoration: "none", fontSize: 13 }}>
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

                {saved && (
                    <div style={{
                        fontSize: 13, color: "#3ecf6e",
                        background: "rgba(62,207,110,0.06)",
                        border: "1px solid rgba(62,207,110,0.15)",
                        borderRadius: 6, padding: "12px 16px",
                        marginBottom: 24,
                        display: "flex", alignItems: "center", gap: 8,
                    }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3ecf6e" }} />
                        Profilul a fost actualizat cu succes!
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
                        MR
                    </div>
                    <div>
                        <div style={{ fontSize: 16, color: "#e8e4db", fontWeight: 500, marginBottom: 4 }}>
                            Miroiu Rareș
                        </div>
                        <div style={{ fontSize: 12, color: "#5c5f5a" }}>
                            Participant · Membru din Mar 2026
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
                            <label style={labelStyle}>Nume complet</label>
                            <input type="text" defaultValue="Miroiu Rareș" style={inputStyle}
                                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                                onBlur={e => e.target.style.borderColor = "#2e332e"} />
                        </div>

                        <div style={{ marginBottom: 0 }}>
                            <label style={labelStyle}>Adresă email</label>
                            <input type="email" defaultValue="rares@sigillium.ro" style={inputStyle}
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

                        <div style={{ marginBottom: 20 }}>
                            <label style={labelStyle}>Parola curentă</label>
                            <input type="password" placeholder="••••••••" style={inputStyle}
                                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                                onBlur={e => e.target.style.borderColor = "#2e332e"} />
                        </div>

                        <div style={{ marginBottom: 20 }}>
                            <label style={labelStyle}>Parola nouă</label>
                            <input type="password" placeholder="••••••••" style={inputStyle}
                                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                                onBlur={e => e.target.style.borderColor = "#2e332e"} />
                        </div>

                        <div style={{ marginBottom: 0 }}>
                            <label style={labelStyle}>Confirmă parola nouă</label>
                            <input type="password" placeholder="••••••••" style={inputStyle}
                                onFocus={e => e.target.style.borderColor = "#c9a84c"}
                                onBlur={e => e.target.style.borderColor = "#2e332e"} />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => setSaved(true)} style={{
                        flex: 1, padding: "12px 0",
                        background: "#c9a84c", color: "#0d0f0e",
                        fontSize: 14, fontWeight: 500,
                        border: "none", borderRadius: 4,
                        cursor: "pointer", letterSpacing: "0.04em",
                        fontFamily: "'Outfit', sans-serif",
                    }}>
                        Salvează modificările
                    </button>
                    <Link href="/me" style={{
                        padding: "11px 24px",
                        fontSize: 14, color: "#9e9b94",
                        border: "1px solid #2e332e",
                        borderRadius: 4, textDecoration: "none",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        Anulează
                    </Link>
                </div>
            </div>
        </main>
    );
}
