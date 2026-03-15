"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    href: "/admin",
    label: "Overview",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    href: "/admin/orgs",
    label: "Organizații",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/admin/users",
    label: "Utilizatori",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    href: "/admin/certificates",
    label: "Certificate",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="admin-sidebar">
      {/* Role badge */}
      <div className="admin-sidebar-header">
        <div
          style={{
            fontSize: 9,
            color: "#5c5f5a",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Rol
        </div>
        <div
          style={{ fontSize: 12, color: "#c9a84c", fontFamily: "monospace" }}
        >
          ADMIN
        </div>
      </div>

      <nav>
        {items.map(({ href, label, icon }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div
              className={`admin-sidebar-nav-item ${isActive(href) ? "active" : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 20px",
                fontSize: 12,
                color: isActive(href) ? "#c9a84c" : "#5c5f5a",
                borderLeft: `2px solid ${isActive(href) ? "#c9a84c" : "transparent"}`,
                background: isActive(href)
                  ? "rgba(201,168,76,0.04)"
                  : "transparent",
                cursor: "pointer",
              }}
            >
              {icon}
              {label}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
