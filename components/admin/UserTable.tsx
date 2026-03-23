"use client";
import Link from "next/link";

export interface User {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "ORG_OWNER" | "PARTICIPANT";
}

interface Props {
  users: User[];
}

const roleStyle: Record<User["role"], React.CSSProperties> = {
  ADMIN: { color: "#c9a84c", border: "1px solid rgba(201,168,76,.25)", background: "rgba(201,168,76,.06)" },
  ORG_OWNER: { color: "#c9a84c", border: "1px solid rgba(201,168,76,.25)", background: "rgba(201,168,76,.06)" },
  PARTICIPANT: { color: "#9e9b94", border: "1px solid #2e332e", background: "transparent" },
};

const roleLabel: Record<User["role"], string> = {
  ADMIN: "Admin",
  ORG_OWNER: "Org Owner",
  PARTICIPANT: "Participant",
};

export default function UserTable({ users }: Props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: 400 }}>
        {users.map((user) => {
          const displayName = user.name ?? user.email;
          const initials = displayName.includes("@")
            ? displayName.split("@")[0].slice(0, 2).toUpperCase()
            : displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

          return (
            <Link key={user.id} href={`/admin/users/${user.id}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  background: "#131614",
                  border: "1px solid #2e332e",
                  borderRadius: 6,
                  padding: "12px 16px",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#c9a84c")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#2e332e")}
              >
                {/* Avatar */}
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  background: "#1e2420", border: "1px solid #2e332e",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, color: "#c9a84c", fontFamily: "monospace", flexShrink: 0,
                }}>
                  {initials}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: "#e8e4db", marginBottom: 2 }}>
                    {user.name ?? user.email}
                  </div>
                  <div style={{ fontSize: 11, color: "#5c5f5a" }}>
                    {user.name ? user.email : ""}
                  </div>
                </div>

                {/* Role badge */}
                <div style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 100, flexShrink: 0,
                  ...roleStyle[user.role],
                }}>
                  {roleLabel[user.role]}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
