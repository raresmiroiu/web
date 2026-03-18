interface Props {
    code: string;
}

export default function NotFound({ code }: Props) {
    return (
        <div style={{ textAlign: "center", padding: "40px 24px" }}>
            <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(224,92,92,.08)", border: "1px solid rgba(224,92,92,.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
            }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                </svg>
            </div>
            <div style={{ fontSize: 16, color: "var(--text)", marginBottom: 6, fontFamily: "'Cormorant Garamond', serif" }}>
                Certificat negăsit
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>
                Codul <span style={{ fontFamily: "monospace", color: "var(--text-mid)" }}>{code}</span> nu corespunde niciunui certificat din platformă.
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
                Verifică dacă ai introdus corect codul și încearcă din nou.
            </div>
        </div>
    );
}
