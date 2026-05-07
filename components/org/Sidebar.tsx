"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    href: "/org",
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
    href: "/org/certificates",
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
  {
    href: "/org/certificates/new",
    label: "Emite certificat",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    href: "/org/certificates/bulk",
    label: "Emitere în masă",
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
        <path d="M23 21v-2" />
        <path d="M19 17l2 2 4-4" />
      </svg>
    ),
  },
  {
    href: "/org/members",
    label: "Membri",
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
    href: "/org/settings",
    label: "Setări",
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
];

export default function Sidebar({ orgName }: { orgName: string }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/org") return pathname === "/org";
    if (href === "/org/certificates") return pathname === "/org/certificates";
    if (href === "/org/certificates/bulk") return pathname === "/org/certificates/bulk";
    if (href === "/org/certificates/new") return pathname === "/org/certificates/new";
    return pathname.startsWith(href);
  };

  return (
    <aside className="org-sidebar">
      {/* Org name */}
      <div className="org-sidebar-header">
        <div>
          <div
            style={{
              fontSize: 9,
              color: "#5c5f5a",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            Organizație
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#e8e4db",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {orgName}
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav>
        {items.map(({ href, label, icon }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div
              className={`org-sidebar-nav-item ${isActive(href) ? "active" : ""}`}
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
