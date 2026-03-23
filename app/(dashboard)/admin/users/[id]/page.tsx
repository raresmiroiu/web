import { pool } from "@/libs/db";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function AdminUserDetailPage({ params }: Props) {
    const { id } = await params;

    const userResult = await pool.query(
        "SELECT id, name, email, role FROM users WHERE id = $1",
        [id]
    );
    const user = userResult.rows[0];
    if (!user) notFound();

    const certsResult = await pool.query(
        `SELECT c.id, c.code, c.title, c.type, c.revoked,
            c.issued_at, c.verifications,
            o.name as org_name
        FROM certificates c
        LEFT JOIN organizations o ON c.org_id = o.id
        WHERE c.recipient_id = $1
        ORDER BY c.created_at DESC`,
        [id]
    );

    const displayName = user.name ?? user.email;
    const initials = displayName.includes("@")
        ? displayName.split("@")[0].slice(0, 2).toUpperCase()
        : displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

    const roleLabel: Record<string, string> = {
        ADMIN: "Admin",
        ORG_OWNER: "Org Owner",
        PARTICIPANT: "Participant",
    };

    return (
        <div style={{ maxWidth: 600 }}>
            <div style={{ marginBottom: 24 }}>
                <Link href="/admin/users" style={{
                    fontSize: 12, color: "#5c5f5a", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    Înapoi la utilizatori
                </Link>
            </div>

            {/* Header utilizator */}
            <div style={{
                background: "#131614", border: "1px solid #2e332e",
                borderRadius: 8, overflow: "hidden", marginBottom: 16,
            }}>
                <div style={{ height: 2, background: "linear-gradient(90deg, #c9a84c, #6b5a28)" }} />
                <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: "#1e2420", border: "1px solid #2e332e",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, color: "#c9a84c", fontFamily: "monospace",
                    }}>
                        {initials}
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 18, color: "#e8e4db", fontFamily: "'Cormorant Garamond', serif" }}>
                            {user.name ?? "—"}
                        </div>
                        <div style={{ fontSize: 12, color: "#5c5f5a", marginTop: 2 }}>
                            {user.email}
                        </div>
                    </div>
                    <div style={{
                        fontSize: 10, padding: "3px 10px", borderRadius: 100,
                        color: "#c9a84c",
                        border: "1px solid rgba(201,168,76,.25)",
                        background: "rgba(201,168,76,.06)",
                    }}>
                        {roleLabel[user.role] ?? user.role}
                    </div>
                </div>
            </div>

            {/* Certificate */}
            <p style={{
                fontSize: 10, color: "#c9a84c", letterSpacing: "0.14em",
                textTransform: "uppercase", marginBottom: 12,
            }}>
                Certificate ({certsResult.rows.length})
            </p>

            {certsResult.rows.length === 0 ? (
                <div style={{
                    background: "#131614", border: "1px solid #2e332e",
                    borderRadius: 6, padding: "24px", textAlign: "center",
                    fontSize: 13, color: "#5c5f5a",
                }}>
                    Niciun certificat.
                </div>
            ) : (
                certsResult.rows.map(cert => (
                    <Link key={cert.id} href={`/admin/certificates/${cert.id}`} style={{ textDecoration: "none" }}>
                        <div style={{
                            background: "#131614", border: "1px solid #2e332e",
                            borderRadius: 6, padding: "12px 16px", marginBottom: 8,
                            display: "flex", alignItems: "center", gap: 12,
                            cursor: "pointer",
                            transition: "border-color 0.15s",
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, color: "#e8e4db", marginBottom: 2 }}>{cert.title}</div>
                                <div style={{ fontSize: 11, color: "#5c5f5a" }}>
                                    {cert.org_name} · {new Date(cert.issued_at).toLocaleDateString("ro-RO")} · <span style={{ fontFamily: "monospace" }}>{cert.code}</span>
                                </div>
                            </div>
                            <div style={{
                                fontSize: 10, padding: "2px 8px", borderRadius: 100,
                                color: cert.revoked ? "#e05c5c" : "#3ecf6e",
                                border: `1px solid ${cert.revoked ? "rgba(224,92,92,.2)" : "rgba(62,207,110,.2)"}`,
                                background: cert.revoked ? "rgba(224,92,92,.05)" : "rgba(62,207,110,.05)",
                            }}>
                                {cert.revoked ? "Revocat" : "Valid"}
                            </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
}
