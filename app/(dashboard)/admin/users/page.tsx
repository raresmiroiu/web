import UserTable, { User } from "@/components/admin/UserTable";
import { pool } from "@/libs/db";
import Pagination from "@/components/Pagination";
import { ITEMS_PER_PAGE } from "@/libs/constants";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";

export default async function AdminUsersPage(props: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await props.searchParams;
  const page = Number(params?.page) || 1;
  const limit = ITEMS_PER_PAGE;
  const offset = (page - 1) * limit;
  const q = params?.q?.trim() ?? "";

  const countResult = await pool.query(
    q
      ? "SELECT COUNT(*) FROM users WHERE name ILIKE $1 OR email ILIKE $1"
      : "SELECT COUNT(*) FROM users",
    q ? [`%${q}%`] : [],
  );
  const totalPages = Math.ceil(Number(countResult.rows[0].count) / limit);

  const result = await pool.query(
    `
    SELECT id, name, email, role
    FROM users
    ${q ? "WHERE name ILIKE $3 OR email ILIKE $3" : ""}
    ORDER BY id DESC
    LIMIT $1 OFFSET $2
  `,
    q ? [limit, offset, `%${q}%`] : [limit, offset],
  );

  const users: User[] = result.rows.map((row) => ({
    id: String(row.id),
    name: row.name ?? null,
    email: row.email,
    role: row.role as User["role"],
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
            Utilizatori
          </h1>
          <p style={{ fontSize: 13, color: "#5c5f5a" }}>
            Toți utilizatorii înregistrați pe platformă.
          </p>
        </div>
        <Suspense>
          <SearchBar placeholder="Caută după nume sau email…" />
        </Suspense>
      </div>

      <UserTable users={users} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
