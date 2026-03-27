"use client";
import { useState } from "react";

const inputStyle = {
    width: "100%", padding: "12px 16px",
    background: "#0d0f0e", border: "1px solid #2e332e",
    borderRadius: 6, color: "#e8e4db", fontSize: 14,
    outline: "none", boxSizing: "border-box" as const,
    fontFamily: "'Outfit', sans-serif",
};

const labelStyle = {
    display: "block", fontSize: 11, color: "#9e9b94",
    letterSpacing: "0.08em", textTransform: "uppercase" as const,
    marginBottom: 8,
};

export default function ContactForm() {
    const [sent, setSent] = useState(false);

    if (sent) {
        return (
            <div style={{
                background: "#131614", border: "1px solid #2e332e",
                borderRadius: 8, padding: "48px 32px", textAlign: "center",
            }}>
                <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: "rgba(62,207,110,0.08)", border: "1px solid rgba(62,207,110,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px", color: "#3ecf6e", fontSize: 24,
                }}>✓</div>
                <div style={{ fontSize: 18, color: "#e8e4db", fontWeight: 500, marginBottom: 8 }}>
                    Mesaj trimis cu succes!
                </div>
                <p style={{ fontSize: 13, color: "#5c5f5a" }}>
                    Îți vom răspunde în cel mai scurt timp posibil.
                </p>
            </div>
        );
    }

    return (
        <div style={{
            background: "#131614", border: "1px solid #2e332e",
            borderRadius: 8, overflow: "hidden",
        }}>
            <div style={{ height: 2, background: "linear-gradient(90deg, #c9a84c, #6b5a28)" }} />
            <div style={{ padding: "32px 28px" }}>
                <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Nume complet</label>
                    <input type="text" placeholder="Ion Popescu" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#c9a84c"}
                        onBlur={e => e.target.style.borderColor = "#2e332e"} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Adresă email</label>
                    <input type="email" placeholder="tu@exemplu.com" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#c9a84c"}
                        onBlur={e => e.target.style.borderColor = "#2e332e"} />
                </div>
                <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Subiect</label>
                    <input type="text" placeholder="Întrebare despre platformă" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = "#c9a84c"}
                        onBlur={e => e.target.style.borderColor = "#2e332e"} />
                </div>
                <div style={{ marginBottom: 28 }}>
                    <label style={labelStyle}>Mesaj</label>
                    <textarea placeholder="Scrie mesajul tău aici..." rows={5} style={{
                        ...inputStyle, resize: "vertical" as const, lineHeight: 1.6,
                    }}
                        onFocus={e => e.target.style.borderColor = "#c9a84c"}
                        onBlur={e => e.target.style.borderColor = "#2e332e"} />
                </div>
                <button onClick={() => setSent(true)} style={{
                    width: "100%", padding: "13px 0",
                    background: "#c9a84c", color: "#0d0f0e",
                    fontSize: 14, fontWeight: 500,
                    border: "none", borderRadius: 4,
                    cursor: "pointer", letterSpacing: "0.04em",
                    fontFamily: "'Outfit', sans-serif",
                }}>
                    Trimite mesajul
                </button>
            </div>
        </div>
    );
}