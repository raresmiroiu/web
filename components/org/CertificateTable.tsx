"use client"
import Link from "next/link";
import { revokeAction } from "@/libs/revoke-action";

export interface OrgCertificate {
    id: string;
    title: string;
    recipientName: string;
    issuedAt: string;
    code: string;
    verifications: number;
    revoked: boolean;
}

interface Props {
    certificates: OrgCertificate[];
    showRevokeButton?: boolean;
    basePath?: string;
}

export default function CertificateTable({
    certificates,
    showRevokeButton = false,
    basePath = "/org/certificates",
}: Props) {
    return (
        <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: 500 }}>
                {certificates.map((cert) => (
                    <Link
                        key={cert.id}
                        href={`${basePath}/${cert.id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <div
                            style={{
                                background: "#131614",
                                border: "1px solid #2e332e",
                                borderRadius: 6,
                                padding: "12px 16px",
                                marginBottom: 8,
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                cursor: "pointer",
                                transition: "border-color 0.15s",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.borderColor = "#c9a84c")}
                            onMouseLeave={e => (e.currentTarget.style.borderColor = "#2e332e")}
                        >
                            {/* Icon */}
                            <div style={{
                                width: 32, height: 32, borderRadius: 5,
                                background: "#1a1d1b", border: "1px solid #2e332e",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
                                    <path d="M20 2L23.5 8.5L30.5 6.5L29.5 13.5L36 16L32 22L36 28L29.5 30.5L30.5 37.5L23.5 35.5L20 42L16.5 35.5L9.5 37.5L10.5 30.5L4 28L8 22L4 16L10.5 13.5L9.5 6.5L16.5 8.5L20 2Z" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
                                    <circle cx="20" cy="22" r="7" stroke="#c9a84c" strokeWidth="1.2" fill="none" />
                                    <path d="M16 22L18.5 24.5L24 19" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 14, color: "#e8e4db", fontFamily: "'Cormorant Garamond', serif", marginBottom: 2 }}>
                                    {cert.title}
                                </div>
                                <div style={{ fontSize: 11, color: "#5c5f5a" }}>
                                    {cert.recipientName} · {cert.issuedAt} · <span style={{ fontFamily: "monospace" }}>{cert.code}</span>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: "12px", alignItems: "center", flexShrink: 0 }}>
                                {/* Verificări */}
                                <div style={{ fontSize: 11, color: "#5c5f5a", textAlign: "center", flexShrink: 0 }}>
                                    <div style={{ fontSize: 14, color: "#9e9b94", fontWeight: 500 }}>{cert.verifications}</div>
                                    <div style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>verif.</div>
                                </div>

                                {/* Badge */}
                                {cert.revoked ? (
                                    <div style={{
                                        fontSize: 10, color: "#e05c5c",
                                        border: "1px solid rgba(224,92,92,.2)", background: "rgba(224,92,92,.05)",
                                        padding: "2px 8px", borderRadius: 100, flexShrink: 0,
                                    }}>
                                        Revocat
                                    </div>
                                ) : (
                                    <div style={{
                                        fontSize: 10, color: "#3ecf6e",
                                        border: "1px solid rgba(62,207,110,.2)", background: "rgba(62,207,110,.05)",
                                        padding: "2px 8px", borderRadius: 100, flexShrink: 0,
                                    }}>
                                        Valid
                                    </div>
                                )}

                                {/* Revoke button */}
                                {showRevokeButton && !cert.revoked && (
                                    <button
                                        onClick={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            revokeAction(cert.id);
                                        }}
                                        style={{
                                            fontSize: 10, color: "#5c5f5a",
                                            border: "1px solid #2e332e", background: "none",
                                            padding: "4px 10px", borderRadius: 4,
                                            cursor: "pointer", flexShrink: 0,
                                        }}
                                    >
                                        Revocă
                                    </button>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
