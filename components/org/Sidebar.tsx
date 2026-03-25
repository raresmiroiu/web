"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
    {
        href: "/org",
        label: "Overview",
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
    },
    {
        href: "/org/certificates",
        label: "Certificate",
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
    },
    {
        href: "/org/certificates/new",
        label: "Emite certificat",
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></svg>,
    },
    {
        href: "/org/members",
        label: "Membri",
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
    },
    {
        href: "/org/settings",
        label: "Setări",
        icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
    },
];

export default function Sidebar({ orgName }: { orgName: string }) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/org") return pathname === "/org";
        if (href === "/org/certificates") return pathname === "/org/certificates";
        return pathname.startsWith(href);
    };

    return (
        <aside className="org-sidebar">
            {/* Org name */}
            <div className="org-sidebar-header">
                <div>
                    <div style={{ fontSize: 9, color: "#5c5f5a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4 }}>
                        Organizație
                    </div>
                    <div style={{ fontSize: 13, color: "#e8e4db", fontFamily: "'Cormorant Garamond', serif" }}>
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
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "9px 20px",
                                fontSize: 12,
                                color: isActive(href) ? "#c9a84c" : "#5c5f5a",
                                borderLeft: `2px solid ${isActive(href) ? "#c9a84c" : "transparent"}`,
                                background: isActive(href) ? "rgba(201,168,76,0.04)" : "transparent",
                                cursor: "pointer",
                            }}>
                            {icon}
                            {label}
                        </div>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}