import { pool } from "@/libs/db";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function AdminCertificateDetailPage({ params }: Props) {
    const { id } = await params;

    const result = await pool.query(
        `SELECT c.*,
            u.name as recipient_name, u.email as recipient_email,
            o.name as org_name, o.email as org_email
        FROM certificates c
        LEFT JOIN users u ON c.recipient_id = u.id
        LEFT JOIN organizations o ON c.org_id = o.id
        WHERE c.id = $1`,
        [id]
    );

    const cert = result.rows[0];
    if (!cert) notFound();

    const isValid = !cert.revoked;

    return (
        <div style={{ maxWidth: 600 }}>
            <div style={{ marginBottom: 24 }}>
                <Link href="/admin/certificates" style={{
                    fontSize: 12, color: "#5c5f5a", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    Înapoi la certificate
                </Link>
            </div>

            <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300,
                color: "#e8e4db", marginBottom: 4,
            }}>
                {cert.title}
            </h1>
            <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 28 }}>
                Detalii certificat — vedere admin
            </p>

            <div style={{
                background: "#131614", border: "1px solid #2e332e",
                borderRadius: 8, overflow: "hidden",
            }}>
                <div style={{ height: 2, background: isValid
                    ? "linear-gradient(90deg, #3ecf6e, #1a6e36)"
                    : "linear-gradient(90deg, #e05c5c, #7a2020)"
                }} />

                <div style={{
                    padding: "10px 20px",
                    display: "flex", alignItems: "center", gap: 8,
                    fontSize: 12,
                    color: isValid ? "#3ecf6e" : "#e05c5c",
                    background: isValid ? "rgba(62,207,110,.06)" : "rgba(224,92,92,.06)",
                    borderBottom: `1px solid ${isValid ? "rgba(62,207,110,.15)" : "rgba(224,92,92,.15)"}`,
                }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: isValid ? "#3ecf6e" : "#e05c5c" }} />
                    {isValid ? "Certificat valid" : "Certificat revocat"}
                </div>

                <div style={{ padding: "20px 24px", display: "grid", gap: 16 }}>
                    {[
                        { label: "Titlu", val: cert.title },
                        { label: "Tip", val: cert.type },
                        { label: "Domeniu", val: cert.domain },
                        { label: "Cod unic", val: cert.code, mono: true },
                        { label: "Data emiterii", val: new Date(cert.issued_at).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" }) },
                        ...(cert.revoked ? [{ label: "Revocat la", val: new Date(cert.revoked_at).toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" }), red: true }] : []),
                        { label: "Verificări", val: String(cert.verifications) },
                    ].map(({ label, val, mono, red }: any) => (
                        <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 11, color: "#5c5f5a", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
                            <span style={{
                                fontSize: 13,
                                color: red ? "#e05c5c" : "#e8e4db",
                                fontFamily: mono ? "monospace" : "'Outfit', sans-serif",
                            }}>{val}</span>
                        </div>
                    ))}
                </div>

                {/* Beneficiar */}
                <div style={{ padding: "16px 24px", borderTop: "1px solid #2e332e" }}>
                    <div style={{ fontSize: 10, color: "#5c5f5a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
                        Beneficiar
                    </div>
                    <Link href={`/admin/users/${cert.recipient_id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: "#1e2420", border: "1px solid #2e332e",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, color: "#c9a84c", fontFamily: "monospace",
                        }}>
                            {(cert.recipient_name ?? cert.recipient_email).slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, color: "#e8e4db" }}>{cert.recipient_name ?? "—"}</div>
                            <div style={{ fontSize: 11, color: "#5c5f5a" }}>{cert.recipient_email}</div>
                        </div>
                    </Link>
                </div>

                {/* Organizație */}
                <div style={{ padding: "16px 24px", borderTop: "1px solid #2e332e" }}>
                    <div style={{ fontSize: 10, color: "#5c5f5a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
                        Organizație emitentă
                    </div>
                    <Link href={`/admin/orgs/${cert.org_id}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: "#1e2420", border: "1px solid #2e332e",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, color: "#c9a84c", fontFamily: "monospace",
                        }}>
                            {cert.org_name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ fontSize: 13, color: "#e8e4db" }}>{cert.org_name}</div>
                            <div style={{ fontSize: 11, color: "#5c5f5a" }}>{cert.org_email}</div>
                        </div>
                    </Link>
                </div>

                <div style={{ padding: "14px 24px", borderTop: "1px solid #2e332e", display: "flex", gap: 10 }}>
                    <Link href={`/verify/${cert.code}`} target="_blank" style={{
                        fontSize: 12, color: "#c9a84c",
                        border: "1px solid #6b5a28", background: "rgba(201,168,76,.05)",
                        padding: "7px 14px", borderRadius: 4, textDecoration: "none",
                    }}>
                        Vezi pagina publică →
                    </Link>
                </div>
            </div>
        </div>
    );
}
