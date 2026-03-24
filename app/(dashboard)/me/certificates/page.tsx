import { auth } from "@/auth";
import { pool } from "@/libs/db";
import CertificateList from "@/components/me/CertificateList";
import { Certificate } from "@/components/me/CertificateCard";
import NavbarDashboard from "@/components/NavbarDashboard";
import "../me.css";
import Pagination from "@/components/Pagination";
import { ITEMS_PER_PAGE } from "@/libs/constants";

export default async function MeCertificatesPage(
  props: { searchParams?: Promise<{ [key: string]: string | undefined }> }
) {
  const params = await props.searchParams;
  const page = Number(params?.page) || 1;
  const limit = ITEMS_PER_PAGE;
  const offset = (page - 1) * limit;
  const session = await auth();
  const userId = session?.user?.id;

  const countResult = await pool.query("SELECT COUNT(*) FROM certificates WHERE recipient_id = $1", [userId]);
  const totalPages = Math.ceil(Number(countResult.rows[0].count) / limit);

  const result = await pool.query(
    `SELECT 
            c.id, c.code, c.title, c.type, c.domain,
            c.issued_at, c.revoked, c.revoked_at, c.verifications,
            o.name as issuer
        FROM certificates c
        JOIN organizations o ON c.org_id = o.id
        WHERE c.recipient_id = $1
        ORDER BY c.created_at DESC, c.id DESC
        LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );

  const certificates: Certificate[] = result.rows.map(row => ({
    id: String(row.id),
    type: row.type,
    title: row.title,
    issuer: row.issuer,
    issuedAt: new Date(row.issued_at).toLocaleDateString("ro-RO", {
      day: "numeric", month: "short", year: "numeric"
    }),
    code: row.code,
    verifications: row.verifications,
    revoked: row.revoked,
  }));

  return (
    <main style={{ background: "#0d0f0e", minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
      <NavbarDashboard />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 40px" }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 300,
          color: "#e8e4db", marginBottom: 4,
        }}>
          Toate certificatele tale
        </h1>
        <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 32 }}>
          Istoricul complet al certificărilor obținute pe parcursul tău.
        </p>

        <CertificateList certificates={certificates} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
