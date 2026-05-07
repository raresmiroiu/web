import { auth } from "@/auth";
import { pool } from "@/libs/db";
import CertificateList from "@/components/me/CertificateList";
import { Certificate } from "@/components/me/CertificateCard";
import NavbarDashboard from "@/components/NavbarDashboard";
import "../me.css";
import Pagination from "@/components/Pagination";
import { ITEMS_PER_PAGE } from "@/libs/constants";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

export default async function MeCertificatesPage(props: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await props.searchParams;
  const page = Number(params?.page) || 1;
  const limit = ITEMS_PER_PAGE;
  const offset = (page - 1) * limit;
  const q = params?.q?.trim() ?? "";

  const session = await auth();
  const userId = session?.user?.id;

  const countResult = await pool.query(
    q
      ? `SELECT COUNT(*) FROM certificates c JOIN organizations o ON c.org_id = o.id
         WHERE c.recipient_id = $1 AND (c.title ILIKE $2 OR c.code ILIKE $2 OR o.name ILIKE $2)`
      : "SELECT COUNT(*) FROM certificates WHERE recipient_id = $1",
    q ? [userId, `%${q}%`] : [userId],
  );
  const totalPages = Math.ceil(Number(countResult.rows[0].count) / limit);

  const result = await pool.query(
    `SELECT 
            c.id, c.code, c.title, c.type, c.domain,
            c.issued_at, c.revoked, c.revoked_at, c.verifications,
            o.name as issuer
        FROM certificates c
        JOIN organizations o ON c.org_id = o.id
        WHERE c.recipient_id = $1
        ${q ? "AND (c.title ILIKE $4 OR c.code ILIKE $4 OR o.name ILIKE $4)" : ""}
        ORDER BY c.created_at DESC, c.id DESC
        LIMIT $2 OFFSET $3`,
    q ? [userId, limit, offset, `%${q}%`] : [userId, limit, offset],
  );

  const certificates: Certificate[] = result.rows.map((row) => ({
    id: String(row.id),
    type: row.type,
    title: row.title,
    issuer: row.issuer,
    issuedAt: new Date(row.issued_at).toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    code: row.code,
    verifications: row.verifications,
    revoked: row.revoked,
  }));

  return (
    <main
      style={{
        background: "#0d0f0e",
        minHeight: "100vh",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <NavbarDashboard />

      <div
        style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 40px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 300,
                color: "#e8e4db",
                marginBottom: 4,
              }}
            >
              Toate certificatele tale
            </h1>
            <p style={{ fontSize: 13, color: "#5c5f5a" }}>
              Istoricul complet al certificărilor obținute pe parcursul tău.
            </p>
          </div>
          <Suspense>
            <SearchBar placeholder="Caută după titlu, cod sau emitent…" />
          </Suspense>
        </div>

        <CertificateList certificates={certificates} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
