"use client";
import { useState } from "react";
import { approveOrg, suspendOrg, reactivateOrg, rejectOrg } from "@/libs/org-actions";

export interface Org {
  id: string;
  name: string;
  email: string;
  certificateCount: number;
  memberCount: number;
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  createdAt: string;
}

interface Props {
  orgs: Org[];
}

const statusStyle: Record<Org["status"], React.CSSProperties> = {
  ACTIVE: {
    color: "#3ecf6e",
    border: "1px solid rgba(62,207,110,.2)",
    background: "rgba(62,207,110,.05)",
  },
  PENDING: {
    color: "#c9a84c",
    border: "1px solid rgba(201,168,76,.25)",
    background: "rgba(201,168,76,.06)",
  },
  SUSPENDED: {
    color: "#e05c5c",
    border: "1px solid rgba(224,92,92,.2)",
    background: "rgba(224,92,92,.05)",
  },
};

const statusLabel: Record<Org["status"], string> = {
  ACTIVE: "Activă",
  PENDING: "În așteptare",
  SUSPENDED: "Suspendată",
};

export default function OrgTable({ orgs }: Props) {
  const [search, setSearch] = useState("");

  const filtered = orgs.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase())
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
            Nicio organizație găsită.
          </div>
        ) : (
          filtered.map((org) => {
          const initials = org.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
          return (
            <div
              key={org.id}
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
                  {org.name}
                </div>
                <div style={{ fontSize: 11, color: "#5c5f5a" }}>
                  {org.email} · {org.certificateCount} certificate ·{" "}
                  {org.memberCount} membri
                </div>
              </div>

              {/* Status badge */}
              <div
                style={{
                  fontSize: 10,
                  padding: "2px 8px",
                  borderRadius: 100,
                  flexShrink: 0,
                  ...statusStyle[org.status],
                }}
              >
                {statusLabel[org.status]}
              </div>

              {/* Actions */}
              {org.status === "PENDING" && (
                <div className="admin-card-actions">
                  <form action={approveOrg.bind(null, org.id)}>
                    <button
                      type="submit"
                      style={{
                        fontSize: 10,
                        color: "#3ecf6e",
                        border: "1px solid rgba(62,207,110,.25)",
                        background: "rgba(62,207,110,.05)",
                        padding: "4px 10px",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      Aprobă
                    </button>
                  </form>
                  <form action={rejectOrg.bind(null, org.id)}>
                    <button
                      type="submit"
                      style={{
                        fontSize: 10,
                        color: "#e05c5c",
                        border: "1px solid rgba(224,92,92,.2)",
                        background: "none",
                        padding: "4px 10px",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      Respinge
                    </button>
                  </form>
                </div>
              )}
              {org.status === "ACTIVE" && (
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
                  <form action={suspendOrg.bind(null, org.id)}>
                    <button
                      type="submit"
                      style={{
                        fontSize: 10,
                        color: "#e05c5c",
                        border: "1px solid rgba(224,92,92,.2)",
                        background: "none",
                        padding: "4px 10px",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    >
                      Suspendă
                    </button>
                  </form>
                </div>
              )}
              {org.status === "SUSPENDED" && (
                <form action={reactivateOrg.bind(null, org.id)} className="admin-card-actions">
                  <button
                    type="submit"
                    style={{
                      fontSize: 10,
                      color: "#3ecf6e",
                      border: "1px solid rgba(62,207,110,.25)",
                      background: "rgba(62,207,110,.05)",
                      padding: "4px 10px",
                      borderRadius: 4,
                      cursor: "pointer",
                    }}
                  >
                    Reactivează
                  </button>
                </form>
              )}
            </div>
          );
        })
        )}
      </div>
    </div>
  );
}
