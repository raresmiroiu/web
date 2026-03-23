import { auth } from "@/auth";
import { pool } from "@/libs/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import CertificateTable, { OrgCertificate } from "@/components/org/CertificateTable";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function OrgMemberDetailPage({ params }: Props) {
    const { id } = await params;
    const session = await auth();
    const orgName = session?.user?.name;

    // Get org id
    const orgResult = await pool.query(
        "SELECT id FROM organizations WHERE name = $1",
        [orgName]
    );
    const orgId = orgResult.rows[0]?.id;
    if (!orgId) notFound();

    // Verify member has certificates in this org
    const userResult = await pool.query(
        `SELECT id, name, email 
         FROM users 
         WHERE id = $1 AND id IN (
            SELECT recipient_id FROM certificates WHERE org_id = $2
         )`,
        [id, orgId]
    );
    const user = userResult.rows[0];
    if (!user) notFound();

    const result = await pool.query(
        `SELECT c.id, c.code, c.title, c.type, c.revoked, c.verifications,
            TO_CHAR(c.issued_at, 'DD Mon. YYYY') as issued_at,
            u.name as recipient_name
        FROM certificates c
        JOIN users u ON c.recipient_id = u.id
        WHERE c.recipient_id = $1 AND c.org_id = $2
        ORDER BY c.created_at DESC, c.id DESC`,
        [id, orgId]
    );

    const certificates: OrgCertificate[] = result.rows.map(row => ({
        id: String(row.id),
        title: row.title,
        type: row.type,
        recipientName: row.recipient_name ?? "Necunoscut",
        issuedAt: row.issued_at,
        code: row.code,
        verifications: row.verifications,
        revoked: row.revoked,
    }));

    const displayName = user.name ?? user.email;
    const initials = displayName.includes("@")
        ? displayName.split("@")[0].slice(0, 2).toUpperCase()
        : displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

    return (
        <div style={{ maxWidth: 600 }}>
            <div style={{ marginBottom: 24 }}>
                <Link href="/org/members" style={{
                    fontSize: 12, color: "#5c5f5a", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                    Înapoi la membri
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
                </div>
            </div>

            <p style={{
                fontSize: 10, color: "#c9a84c", letterSpacing: "0.14em",
                textTransform: "uppercase", marginBottom: 12,
                marginTop: 24
            }}>
                Certificate obținute ({certificates.length})
            </p>

            {certificates.length === 0 ? (
                <div style={{
                    background: "#131614", border: "1px solid #2e332e",
                    borderRadius: 6, padding: "24px", textAlign: "center",
                    fontSize: 13, color: "#5c5f5a",
                }}>
                    Niciun certificat obținut.
                </div>
            ) : (
                <CertificateTable certificates={certificates} showRevokeButton basePath="/org/certificates" />
            )}
        </div>
    );
}
