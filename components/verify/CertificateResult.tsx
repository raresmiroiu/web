import CopyLinkButton from "./CopyLinkButton";

interface CertData {
    code: string;
    type: string;
    title: string;
    recipientName: string;
    issuer: string;
    issuedAt: string;
    domain: string;
    verifications: number;
    revoked: boolean;
    revokedAt: string | null;
}

interface Props {
    cert: CertData;
}

export default function CertificateResult({ cert }: Props) {
    const isValid = !cert.revoked;

    return (
        <div style={{
            background: "var(--surface)", border: "1px solid var(--border2)",
            borderRadius: 8, overflow: "hidden",
        }}>
            {/* Color top bar */}
            <div style={{
                height: 3,
                background: isValid
                    ? "linear-gradient(90deg, #3ecf6e, #1a6e36)"
                    : "linear-gradient(90deg, #e05c5c, #7a2020)",
            }} />

            {/* Status banner */}
            <div style={{
                padding: "10px 20px",
                display: "flex", alignItems: "center", gap: 8,
                fontSize: 12,
                color: isValid ? "#3ecf6e" : "#e05c5c",
                background: isValid ? "rgba(62,207,110,.06)" : "rgba(224,92,92,.06)",
                borderBottom: `1px solid ${isValid ? "rgba(62,207,110,.15)" : "rgba(224,92,92,.15)"}`,
            }}>
                {isValid ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                )}
                {isValid ? "Certificat valid — autentificat de Sigillium" : "Certificat revocat — nu mai este valid"}
            </div>

            {/* Main info */}
            <div className="cert-main-info">
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                    <path d="M20 2L23.5 8.5L30.5 6.5L29.5 13.5L36 16L32 22L36 28L29.5 30.5L30.5 37.5L23.5 35.5L20 42L16.5 35.5L9.5 37.5L10.5 30.5L4 28L8 22L4 16L10.5 13.5L9.5 6.5L16.5 8.5L20 2Z"
                        stroke={isValid ? "var(--gold)" : "#e05c5c"} strokeWidth="1.5" fill="none" />
                    <circle cx="20" cy="22" r="7" stroke={isValid ? "var(--gold)" : "#e05c5c"} strokeWidth="1.2" fill="none" />
                    {isValid ? (
                        <path d="M16 22L18.5 24.5L24 19" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                        <path d="M17 19l6 6M23 19l-6 6" stroke="#e05c5c" strokeWidth="1.5" strokeLinecap="round" />
                    )}
                </svg>
                <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                        {cert.type}
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "var(--text)", marginBottom: 2 }}>
                        {cert.recipientName}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{cert.issuer}</div>
                </div>
            </div>

            {/* Meta */}
            <div className="verify-meta-grid">
                {[
                    { label: "Emis la", val: cert.issuedAt },
                    { label: cert.revoked ? "Revocat la" : "Domeniu", val: cert.revoked ? cert.revokedAt! : cert.domain, red: cert.revoked },
                    { label: "Cod unic", val: cert.code, mono: true },
                    { label: "Verificări", val: String(cert.verifications), mono: true },
                ].map(({ label, val, mono, red }) => (
                    <div key={label}>
                        <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
                            {label}
                        </div>
                        <div style={{
                            fontSize: 12, color: red ? "#e05c5c" : "var(--text-mid)",
                            fontFamily: mono ? "monospace" : "'Outfit', sans-serif",
                        }}>
                            {val}
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions — doar pentru valid */}
            {isValid && (
                <div className="verify-actions">
                    <button style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        fontSize: 12, color: "var(--gold)",
                        border: "1px solid var(--gold-dim)", background: "var(--gold-subtle)",
                        padding: "7px 14px", borderRadius: 4, cursor: "pointer",
                    }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Descarcă PDF
                    </button>
                    <CopyLinkButton />
                </div>
            )}
        </div>
    );
}
