"use client";
import Link from "next/link";

export interface Member {
    id: string;
    name: string;
    email: string;
    certificateCount: number;
}

interface Props {
    members: Member[];
}

export default function MemberList({ members }: Props) {
    return (
        <div>
            {members.map((member) => {
                const initials = member.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
                return (
                    <Link key={member.id} href={`/org/members/${member.id}`} style={{ textDecoration: "none" }}>
                        <div style={{
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
                            fontSize: 10, color: "#c9a84c", fontFamily: "monospace",
                            flexShrink: 0,
                        }}>
                            {initials}
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: "#e8e4db", marginBottom: 1 }}>
                                {member.name}
                            </div>
                            <div style={{ fontSize: 11, color: "#5c5f5a" }}>
                                {member.email}
                            </div>
                        </div>

                        {/* Certificate count */}
                        <div style={{ fontSize: 11, color: "#5c5f5a" }}>
                            {member.certificateCount} {member.certificateCount === 1 ? "certificat" : "certificate"}
                        </div>
                    </div>
                    </Link>
                );
            })}
        </div>
    );
}
