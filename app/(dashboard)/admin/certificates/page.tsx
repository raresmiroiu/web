import CertificateTable, {
  OrgCertificate,
} from "@/components/org/CertificateTable";
import { pool } from "@/libs/db";
import Pagination from "@/components/Pagination";
import { ITEMS_PER_PAGE } from "@/libs/constants";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

export default async function AdminCertificatesPage(props: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await props.searchParams;
  const page = Number(params?.page) || 1;
  const limit = ITEMS_PER_PAGE;
  const offset = (page - 1) * limit;
  const q = params?.q?.trim() ?? "";

  const countResult = await pool.query(
    q
      ? `SELECT COUNT(*) FROM certificates c LEFT JOIN users u ON c.recipient_id = u.id
         WHERE c.title ILIKE $1 OR c.code ILIKE $1 OR u.name ILIKE $1`
      : "SELECT COUNT(*) FROM certificates",
    q ? [`%${q}%`] : [],
  );
  const totalPages = Math.ceil(Number(countResult.rows[0].count) / limit);

  const result = await pool.query(
    `
    SELECT
      c.id, c.code, c.title, c.type,
      c.revoked, c.verifications,
      TO_CHAR(c.issued_at, 'DD Mon. YYYY') as issued_at,
      u.name as recipient_name
    FROM certificates c
    LEFT JOIN users u ON c.recipient_id = u.id
    ${q ? "WHERE c.title ILIKE $3 OR c.code ILIKE $3 OR u.name ILIKE $3" : ""}
    ORDER BY c.created_at DESC, c.id DESC
    LIMIT $1 OFFSET $2
  `,
    q ? [limit, offset, `%${q}%`] : [limit, offset],
  );

  const certificates: OrgCertificate[] = result.rows.map((row) => ({
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
        <Suspense>
          <SearchBar placeholder="Caută după titlu, cod sau destinatar…" />
        </Suspense>
      </div>

      <CertificateTable
        certificates={certificates}
        showRevokeButton
        basePath="/admin/certificates"
      />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
