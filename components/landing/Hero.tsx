import Link from "next/link";

export default function Hero() {
    return (
        <section style={{
            minHeight: "100vh",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center",
            padding: "120px 24px 80px",
            position: "relative", overflow: "hidden",
        }}>
            {/* Grid background */}
            <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "linear-gradient(#232623 1px, transparent 1px), linear-gradient(90deg, #232623 1px, transparent 1px)",
                backgroundSize: "60px 60px",
                opacity: 0.3,
                maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
                pointerEvents: "none",
            }} />

            {/* Gold glow */}
            <div style={{
                position: "absolute", top: "30%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 800, height: 500,
                background: "radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 65%)",
                pointerEvents: "none",
            }} />

            {/* Badge */}
            <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "1px solid #6b5a28", background: "rgba(201,168,76,0.05)",
                padding: "6px 14px", borderRadius: 100,
                fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c9a84c",
                marginBottom: 28,
                animation: "fadeUp 0.7s 0.1s ease forwards", opacity: 0,
            }}>
                <div style={{ width: 5, height: 5, background: "#c9a84c", borderRadius: "50%" }} />
                Platformă de certificare digitală
            </div>

            {/* Title */}
            <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(44px, 7vw, 88px)",
                fontWeight: 300, lineHeight: 1.0,
                color: "#e8e4db", maxWidth: 820,
                marginBottom: 24,
                animation: "fadeUp 0.7s 0.2s ease forwards", opacity: 0,
            }}>
                Certificate <em style={{ fontStyle: "italic", color: "#c9a84c" }}>autentice,</em>
                <strong style={{ fontWeight: 600, display: "block" }}>verificabile instant.</strong>
            </h1>

            {/* Subtitle */}
            <p style={{
                fontSize: 16, fontWeight: 300, color: "#9e9b94",
                maxWidth: 500, lineHeight: 1.7,
                marginBottom: 44,
                animation: "fadeUp 0.7s 0.3s ease forwards", opacity: 0,
            }}>
                Emite, gestionează și verifică certificate digitale cu un singur cod. Fără hârtii, fără incertitudine.
            </p>

            {/* Actions */}
            <div style={{
                display: "flex", alignItems: "center", gap: 14,
                marginBottom: 80,
                animation: "fadeUp 0.7s 0.4s ease forwards", opacity: 0,
            }}>
                <Link href="/register" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontSize: 14, fontWeight: 500, color: "#0d0f0e",
                    background: "#c9a84c", padding: "12px 28px",
                    borderRadius: 4, textDecoration: "none",
                }}>
                    Începe gratuit
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <Link href="/verify" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontSize: 14, color: "#9e9b94",
                    border: "1px solid #2e332e", padding: "11px 24px",
                    borderRadius: 4, textDecoration: "none",
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Verifică un certificat
                </Link>
            </div>

            {/* Certificate preview */}
            <CertificatePreview />
        </section>
    );
}

function CertificatePreview() {
    return (
        <div style={{
            width: "100%", maxWidth: 560,
            animation: "fadeUp 0.7s 0.5s ease forwards", opacity: 0,
        }}>
            <p style={{ fontSize: 11, color: "#5c5f5a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
                Exemplu certificat emis
            </p>
            <div style={{
                background: "#131614", border: "1px solid #2e332e",
                borderRadius: 8, overflow: "hidden",
            }}>
                {/* Gold top bar */}
                <div style={{ height: 3, background: "linear-gradient(90deg, #c9a84c, #6b5a28)" }} />

                {/* Main info */}
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid #232623" }}>
                    <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                        <path d="M20 2L23.5 8.5L30.5 6.5L29.5 13.5L36 16L32 22L36 28L29.5 30.5L30.5 37.5L23.5 35.5L20 42L16.5 35.5L9.5 37.5L10.5 30.5L4 28L8 22L4 16L10.5 13.5L9.5 6.5L16.5 8.5L20 2Z" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
                        <circle cx="20" cy="22" r="7" stroke="#c9a84c" strokeWidth="1.2" fill="none" />
                        <path d="M16 22L18.5 24.5L24 19" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontSize: 11, color: "#5c5f5a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Certificat de absolvire</div>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#e8e4db", fontWeight: 400 }}>Miroiu Rareș</div>
                        <div style={{ fontSize: 12, color: "#5c5f5a", marginTop: 2 }}>Universitatea Politehnica București</div>
                    </div>
                    <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: 11, color: "#3ecf6e",
                        border: "1px solid rgba(62,207,110,0.2)", background: "rgba(62,207,110,0.05)",
                        padding: "4px 10px", borderRadius: 100,
                    }}>
                        <div style={{ width: 5, height: 5, background: "#3ecf6e", borderRadius: "50%" }} />
                        Valid
                    </div>
                </div>

                {/* Meta */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "16px 24px", gap: 16 }}>
                    {[
                        { label: "Data emiterii", val: "14 nov. 2024" },
                        { label: "Domeniu", val: "Ing. software" },
                        { label: "Cod unic", val: "SIG-A3F9C2E1", mono: true },
                        { label: "Verificări", val: "3" },
                    ].map(({ label, val, mono }) => (
                        <div key={label}>
                            <div style={{ fontSize: 10, color: "#5c5f5a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{label}</div>
                            <div style={{ fontSize: 13, color: "#9e9b94", fontFamily: mono ? "'DM Mono', monospace" : undefined }}>{val}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}