import { auth } from "@/auth";
import { pool } from "@/libs/db"
import CertificateTable, { OrgCertificate } from "@/components/org/CertificateTable";

export default async function CertificatesPage() {
    const session = await auth();
    const orgName = session?.user?.name;

    const orgResult = await pool.query(
        "SELECT id FROM organizations WHERE name = $1",
        [orgName]
    );
    const orgId = orgResult.rows[0]?.id;
    const certsResult = await pool.query(
        `SELECT 
            c.id, c.code, c.title, c.type,
            c.issued_at, c.revoked, c.verifications,
            u.name as recipient_name
        FROM certificates c
        LEFT JOIN users u ON c.recipient_id = u.id
        WHERE c.org_id = $1
        ORDER BY c.created_at DESC`,
        [orgId]
    );

    const certificates: OrgCertificate[] = certsResult.rows.map(row => ({
        id: String(row.id),
        title: row.title,
        type: row.type,
        recipientName: row.recipient_name ?? "Necunoscut",
        issuedAt: new Date(row.issued_at).toLocaleDateString("ro-RO", {
            day: "numeric", month: "short", year: "numeric"
        }),
        code: row.code,
        verifications: row.verifications,
        revoked: row.revoked,
    }));

    return (
        <div>
            <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300,
                color: "#e8e4db", marginBottom: 4,
            }}>
                Toate <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Certificatele</em>
            </h1>
            <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 28 }}>
                Gestionează certificatele emise din această organizație.
            </p>

            <CertificateTable certificates={certificates} showRevokeButton={true} />
        </div>
    );
}
