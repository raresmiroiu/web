"use client";
import { useState } from "react";

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
  ADMIN: {
    color: "#c9a84c",
    border: "1px solid rgba(201,168,76,.25)",
    background: "rgba(201,168,76,.06)",
  },
  ORG_OWNER: {
    color: "#c9a84c",
    border: "1px solid rgba(201,168,76,.25)",
    background: "rgba(201,168,76,.06)",
  },
  PARTICIPANT: {
    color: "#9e9b94",
    border: "1px solid #2e332e",
    background: "transparent",
  },
};

const roleLabel: Record<User["role"], string> = {
  ADMIN: "Admin",
  ORG_OWNER: "Org Owner",
  PARTICIPANT: "Participant",
};

export default function UserTable({ users }: Props) {
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(search.toLowerCase())) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Caută după nume sau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 14px",
            background: "#131614",
            border: "1px solid #2e332e",
            borderRadius: 4,
            color: "#9e9b94",
            fontSize: 13,
            fontFamily: "'Outfit', sans-serif",
            outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
          onBlur={(e) => (e.target.style.borderColor = "#2e332e")}
        />
      </div>

      <div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "#5c5f5a", fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>
            Niciun utilizator găsit.
          </div>
        ) : (
          filtered.map((user) => {
            const displayName = user.name ?? user.email;
            const initials = displayName.includes("@")
              ? displayName.split("@")[0].slice(0, 2).toUpperCase()
              : displayName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

            return (
              <div
                key={user.id}
                className="admin-card-row"
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: "#1e2420",
                    border: "1px solid #2e332e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    color: "#c9a84c",
                    fontFamily: "monospace",
                    flexShrink: 0,
                  }}
                >
                  {initials}
                </div>

                {/* Info */}
                <div className="admin-card-info">
                  <div
                    style={{ fontSize: 13, color: "#e8e4db", marginBottom: 2 }}
                  >
                    {user.name ?? user.email}
                  </div>
                  <div style={{ fontSize: 11, color: "#5c5f5a" }}>
                    {user.name ? user.email : ""}
                  </div>
                </div>

                {/* Role badge */}
                <div
                  style={{
                    fontSize: 10,
                    padding: "2px 8px",
                    borderRadius: 100,
                    flexShrink: 0,
                    ...roleStyle[user.role],
                  }}
                >
                  {roleLabel[user.role]}
                </div>

                <div className="admin-card-actions">
                  <button
                    style={{
                      fontSize: 10,
                      color: "#5c5f5a",
                      border: "1px solid #2e332e",
                      background: "none",
                      padding: "4px 10px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Detalii
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
