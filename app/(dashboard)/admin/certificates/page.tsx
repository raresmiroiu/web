import CertificateTable, {
  OrgCertificate,
} from "@/components/org/CertificateTable";
import { pool } from "@/libs/db";

export default async function AdminCertificatesPage() {
  const result = await pool.query(`
    SELECT
      c.id, c.code, c.title, c.type,
      c.revoked, c.verifications,
      TO_CHAR(c.issued_at, 'DD Mon. YYYY') as issued_at,
      u.name as recipient_name
    FROM certificates c
    LEFT JOIN users u ON c.recipient_id = u.id
    ORDER BY c.created_at DESC, c.id DESC
  `);

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

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 300,
              color: "#e8e4db",
              marginBottom: 4,
            }}
          >
            Certificate
          </h1>
          <p style={{ fontSize: 13, color: "#5c5f5a" }}>
            Toate certificatele emise pe platformă.
          </p>
        </div>
      </div>

      <CertificateTable certificates={certificates} showRevokeButton />
    </div>
  );
}
