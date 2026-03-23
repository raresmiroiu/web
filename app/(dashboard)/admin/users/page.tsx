import UserTable, { User } from "@/components/admin/UserTable";
import { pool } from "@/libs/db";

export default async function AdminUsersPage() {
  const result = await pool.query(`
    SELECT id, name, email, role
    FROM users
    ORDER BY id DESC
  `);

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
    </div>
  );
}
