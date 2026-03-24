import UserTable, { User } from "@/components/admin/UserTable";
import { pool } from "@/libs/db";
import Pagination from "@/components/Pagination";
import { ITEMS_PER_PAGE } from "@/libs/constants";

export default async function AdminUsersPage(
  props: { searchParams?: Promise<{ [key: string]: string | undefined }> }
) {
  const params = await props.searchParams;
  const page = Number(params?.page) || 1;
  const limit = ITEMS_PER_PAGE;
  const offset = (page - 1) * limit;

  const countResult = await pool.query("SELECT COUNT(*) FROM users");
  const totalPages = Math.ceil(Number(countResult.rows[0].count) / limit);

  const result = await pool.query(`
    SELECT id, name, email, role
    FROM users
    ORDER BY id DESC
    LIMIT $1 OFFSET $2
  `, [limit, offset]);

  const users: User[] = result.rows.map(row => ({
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
      </div>

      <UserTable users={users} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
