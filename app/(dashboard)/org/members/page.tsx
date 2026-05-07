import { auth } from "@/auth";
import MemberList, { Member } from "@/components/org/MemberList";
import { pool } from "@/libs/db";
import Pagination from "@/components/Pagination";
import { ITEMS_PER_PAGE } from "@/libs/constants";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

export default async function MembersPage(props: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await props.searchParams;
  const page = Number(params?.page) || 1;
  const limit = ITEMS_PER_PAGE;
  const offset = (page - 1) * limit;
  const q = params?.q?.trim() ?? "";

  const session = await auth();
  const orgName = session?.user?.name;
  const orgResult = await pool.query(
    "SELECT id FROM organizations WHERE name = $1",
    [orgName],
  );
  const orgId = orgResult.rows[0]?.id;

  const countResult = await pool.query(
    q
      ? `SELECT COUNT(DISTINCT u.id) FROM users u JOIN certificates c ON c.recipient_id = u.id
         WHERE c.org_id = $1 AND (u.name ILIKE $2 OR u.email ILIKE $2)`
      : "SELECT COUNT(DISTINCT u.id) FROM users u JOIN certificates c ON c.recipient_id = u.id WHERE c.org_id = $1",
    q ? [orgId, `%${q}%`] : [orgId],
  );
  const totalPages = Math.ceil(Number(countResult.rows[0].count) / limit);

  const membersResult = await pool.query(
    `SELECT 
            u.id, u.name, u.email,
            COUNT(c.id) as certificate_count
        FROM users u
        JOIN certificates c ON c.recipient_id = u.id
        WHERE c.org_id = $1
        ${q ? "AND (u.name ILIKE $4 OR u.email ILIKE $4)" : ""}
        GROUP BY u.id, u.name, u.email
        ORDER BY u.name
        LIMIT $2 OFFSET $3`,
    q ? [orgId, limit, offset, `%${q}%`] : [orgId, limit, offset],
  );

  const members: Member[] = membersResult.rows.map((row) => ({
    id: String(row.id),
    name: row.name ?? row.email,
    email: row.email,
    certificateCount: Number(row.certificate_count),
  }));

  return (
    <div>
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
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 300,
              color: "#e8e4db",
              marginBottom: 4,
            }}
          >
            Membrii{" "}
            <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Echipei</em>
          </h1>
          <p style={{ fontSize: 13, color: "#5c5f5a" }}>
            Persoanele afiliate acestei organizații.
          </p>
        </div>
        <Suspense>
          <SearchBar placeholder="Caută după nume sau email…" />
        </Suspense>
      </div>

      <MemberList members={members} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
