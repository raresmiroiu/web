"use client";
import Link from "next/link";
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
  ACTIVE: { color: "#3ecf6e", border: "1px solid rgba(62,207,110,.2)", background: "rgba(62,207,110,.05)" },
  PENDING: { color: "#c9a84c", border: "1px solid rgba(201,168,76,.25)", background: "rgba(201,168,76,.06)" },
  SUSPENDED: { color: "#e05c5c", border: "1px solid rgba(224,92,92,.2)", background: "rgba(224,92,92,.05)" },
};

const statusLabel: Record<Org["status"], string> = {
  ACTIVE: "Activă",
  PENDING: "În așteptare",
  SUSPENDED: "Suspendată",
};

export default function OrgTable({ orgs }: Props) {
  return (
    <div style={{ overflowX: "auto" }}>
      <div style={{ minWidth: 500 }}>
        {orgs.map((org) => {
          const initials = org.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
          return (
            <Link key={org.id} href={`/admin/orgs/${org.id}`} style={{ textDecoration: "none" }}>
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
                  <div style={{ fontSize: 13, color: "#e8e4db", marginBottom: 2 }}>{org.name}</div>
                  <div style={{ fontSize: 11, color: "#5c5f5a" }}>
                    {org.email} · {org.certificateCount} certificate · {org.memberCount} membri
                  </div>
                </div>

                {/* Status badge */}
                <div style={{
                  fontSize: 10, padding: "2px 8px", borderRadius: 100, flexShrink: 0,
                  ...statusStyle[org.status],
                }}>
                  {statusLabel[org.status]}
                </div>

                {/* Actions — oprim propagarea ca sa nu navigheze si la click pe butoane */}
                {org.status === "PENDING" && (
                  <>
                    <button onClick={e => { e.preventDefault(); e.stopPropagation(); approveOrg(org.id); }} style={{
                      fontSize: 10, color: "#3ecf6e",
                      border: "1px solid rgba(62,207,110,.25)", background: "rgba(62,207,110,.05)",
                      padding: "4px 10px", borderRadius: 4, cursor: "pointer",
                    }}>
                      Aprobă
                    </button>
                    <button onClick={e => { e.preventDefault(); e.stopPropagation(); rejectOrg(org.id); }} style={{
                      fontSize: 10, color: "#e05c5c",
                      border: "1px solid rgba(224,92,92,.2)", background: "none",
                      padding: "4px 10px", borderRadius: 4, cursor: "pointer",
                    }}>
                      Respinge
                    </button>
                  </>
                )}
                {org.status === "ACTIVE" && (
                  <button onClick={e => { e.preventDefault(); e.stopPropagation(); suspendOrg(org.id); }} style={{
                    fontSize: 10, color: "#e05c5c",
                    border: "1px solid rgba(224,92,92,.2)", background: "none",
                    padding: "4px 10px", borderRadius: 4, cursor: "pointer",
                  }}>
                    Suspendă
                  </button>
                )}
                {org.status === "SUSPENDED" && (
                  <button onClick={e => { e.preventDefault(); e.stopPropagation(); reactivateOrg(org.id); }} style={{
                    fontSize: 10, color: "#3ecf6e",
                    border: "1px solid rgba(62,207,110,.25)", background: "rgba(62,207,110,.05)",
                    padding: "4px 10px", borderRadius: 4, cursor: "pointer",
                  }}>
                    Reactivează
                  </button>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
