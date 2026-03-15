import UserTable, { User } from "@/components/admin/UserTable";

export default async function AdminUsersPage() {
  // TODO: fetch din DB
  const users: User[] = [
    {
      id: "1",
      name: "Ion Popescu",
      email: "ion@exemplu.com",
      role: "PARTICIPANT",
      createdAt: "01 oct. 2024",
    },
    {
      id: "2",
      name: null,
      email: "atm@atm.com",
      role: "ORG_OWNER",
      createdAt: "15 nov. 2024",
    },
    {
      id: "3",
      name: "Maria Ionescu",
      email: "maria@exemplu.com",
      role: "PARTICIPANT",
      createdAt: "03 ian. 2025",
    },
    {
      id: "4",
      name: null,
      email: "test@example.com",
      role: "PARTICIPANT",
      createdAt: "14 nov. 2024",
    },
    {
      id: "5",
      name: null,
      email: "admin@example.com",
      role: "ADMIN",
      createdAt: "01 sept. 2024",
    },
  ];

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
        <input
          placeholder="Caută utilizator..."
          style={{
            background: "#131614",
            border: "1px solid #2e332e",
            borderRadius: 4,
            padding: "7px 12px",
            color: "#9e9b94",
            fontSize: 12,
            outline: "none",
            width: 200,
          }}
        />
      </div>

      <UserTable users={users} />
    </div>
  );
}
