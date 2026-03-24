import OrgTable, { Org } from "@/components/admin/OrgTable";
import { pool } from "@/libs/db";
import Pagination from "@/components/Pagination";
import { ITEMS_PER_PAGE } from "@/libs/constants";

export default async function AdminOrgsPage(
  props: { searchParams?: Promise<{ [key: string]: string | undefined }> }
) {
  const params = await props.searchParams;
  const page = Number(params?.page) || 1;
  const limit = ITEMS_PER_PAGE;
  const offset = (page - 1) * limit;

  const countResult = await pool.query("SELECT COUNT(*) FROM organizations");
  const totalPages = Math.ceil(Number(countResult.rows[0].count) / limit);

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
    LIMIT $1 OFFSET $2
  `, [limit, offset]);

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
      <Pagination totalPages={totalPages} />
    </div>
  );
}
