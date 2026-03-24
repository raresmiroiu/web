import { auth } from "@/auth";
import { pool } from "@/libs/db";
import NavbarDashboard from "@/components/NavbarDashboard";
import Stats from "@/components/me/Stats";
import CertificateList from "@/components/me/CertificateList";
import { Certificate } from "@/components/me/CertificateCard";
import "./me.css";
import Link from "next/link";
import Pagination from "@/components/Pagination";

export default async function MePage(
  props: { searchParams?: Promise<{ [key: string]: string | undefined }> }
) {
  const session = await auth();
  const userId = session?.user?.id;
  const name = session?.user?.name ?? session?.user?.email ?? "Utilizator";
  const firstName = name.includes("@") ? name.split("@")[0] : name.split(" ")[0];

  const params = await props.searchParams;
  const page = Number(params?.page) || 1;
  const limit = 3;
  const offset = (page - 1) * limit;

  const statsResult = await pool.query(
    `SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE revoked = FALSE) as active,
      COUNT(*) FILTER (WHERE revoked = TRUE) as revoked
     FROM certificates 
     WHERE recipient_id = $1`,
    [userId]
  );

  const stats = statsResult.rows[0];
  const total = Number(stats.total) || 0;
  const active = Number(stats.active) || 0;
  const revoked = Number(stats.revoked) || 0;
  const totalPages = Math.ceil(total / limit);

  const result = await pool.query(
    `SELECT 
            c.id, c.code, c.title, c.type, c.domain,
            c.issued_at, c.revoked, c.revoked_at, c.verifications,
            o.name as issuer
        FROM certificates c
        JOIN organizations o ON c.org_id = o.id
        WHERE c.recipient_id = $1
        ORDER BY c.created_at DESC
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

        {/* Greeting */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 300,
          color: "#e8e4db", marginBottom: 4,
        }}>
          Bună, <em style={{ color: "#c9a84c", fontStyle: "italic" }}>{firstName}.</em>
        </h1>
        <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 32 }}>
          Certificatele tale digitale emise pe platformă.
        </p>

        {/* Stats */}
        <Stats total={total} active={active} revoked={revoked} />

        {/* Section label */}
        <Link href="/me/certificates" style={{ fontSize: 11, color: "#c9a84c", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
          Certificatele mele
        </Link>

        {/* List */}
        <CertificateList certificates={certificates} />
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}