import OrgTable, { Org } from "@/components/admin/OrgTable";
import { pool } from "@/libs/db";

export default async function AdminOrgsPage() {
  const result = await pool.query(`
    SELECT
      o.id, o.name, o.email, o.status,
      TO_CHAR(o.created_at, 'DD Mon. YYYY') as created_at,
      COUNT(DISTINCT c.id) as certificate_count,
      COUNT(DISTINCT c.recipient_id) as member_count
    FROM organizations o
    LEFT JOIN certificates c ON c.org_id = o.id
    GROUP BY o.id
    ORDER BY o.created_at DESC
  `);

  const orgs: Org[] = result.rows.map(row => ({
    id: String(row.id),
    name: row.name,
    email: row.email,
    status: row.status as Org["status"],
    certificateCount: Number(row.certificate_count),
    memberCount: Number(row.member_count),
    createdAt: row.created_at,
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
            Organizații
          </h1>
          <p style={{ fontSize: 13, color: "#5c5f5a" }}>
            Gestionează organizațiile înregistrate pe platformă.
          </p>
        </div>
      </div>

      <OrgTable orgs={orgs} />
    </div>
  );
}
