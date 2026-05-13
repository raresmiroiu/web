"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { signOutAction } from "@/libs/signout-action";

type NavbarUserMenuProps = {
  name: string;
  initials: string;
  editUrl: string;
  role: string;
};

export default function NavbarUserMenu({ name, initials, editUrl, role }: NavbarUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let roleLabel = "Participant";
  if (role === "ORG_OWNER") roleLabel = "Organizație";
  if (role === "ADMIN") roleLabel = "Administrator";

  return (
    <div style={{ position: "relative" }} ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span
          className="nav-dash-name"
          style={{ fontSize: 12, color: "#5c5f5a" }}
        >
          {name}
        </span>
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
            fontSize: 11,
            color: "#c9a84c",
            fontFamily: "monospace",
          }}
        >
          {initials}
        </div>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            marginTop: 8,
            width: 200,
            background: "#131614",
            border: "1px solid #2e332e",
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #2e332e" }}>
            <div style={{ fontSize: 13, color: "#e8e4db", fontWeight: 500 }}>{name}</div>
            <div style={{ fontSize: 11, color: "#c9a84c", marginTop: 2 }}>{roleLabel}</div>
          </div>
          <Link
            href={editUrl}
            onClick={() => setIsOpen(false)}
            style={{
              padding: "10px 16px",
              fontSize: 13,
              color: "#e8e4db",
              textDecoration: "none",
              display: "block",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1e2420")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Setări cont
          </Link>
          <form action={signOutAction} style={{ margin: 0 }}>
            <button
              type="submit"
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 16px",
                fontSize: 13,
                color: "#e05c5c",
                background: "none",
                border: "none",
                borderTop: "1px solid #2e332e",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1e2420")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Ieșire
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
