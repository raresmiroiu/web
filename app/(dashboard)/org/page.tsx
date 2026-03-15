import Link from "next/link";
import StatsRow from "@/components/org/StatsRow";
import CertificateTable, { OrgCertificate } from "@/components/org/CertificateTable";

export default async function OrgPage() {
    // TODO: fetch din DB
    const recentCertificates: OrgCertificate[] = [
        { id: "1", title: "Curs React Avansat", recipientName: "Ion Popescu", issuedAt: "14 nov. 2024", code: "SIG-F1A2B3C4", verifications: 5, revoked: false },
        { id: "2", title: "Securitate Web", recipientName: "Maria Ionescu", issuedAt: "03 ian. 2025", code: "SIG-D5E6F7G8", verifications: 2, revoked: false },
        { id: "3", title: "DevOps Fundamentals", recipientName: "Elena Popa", issuedAt: "01 mar. 2025", code: "SIG-L3M4N5O6", verifications: 8, revoked: false },
    ];

    return (
        <div>
            <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300,
                color: "#e8e4db", marginBottom: 4,
            }}>
                Bună, <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Academia Digitală.</em>
            </h1>
            <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 28 }}>
                Rezumatul activității organizației tale.
            </p>

            <StatsRow stats={[
                { val: 12, label: "Certificate emise" },
                { val: 10, label: "Active", color: "#3ecf6e" },
                { val: 2, label: "Revocate", color: "#e05c5c" },
            ]} />
            <StatsRow stats={[
                { val: 47, label: "Total verificări", color: "#c9a84c" },
                { val: 5, label: "Membri" },
                { val: "Mar 2025", label: "Ultimul certificat", color: "#9e9b94" },
            ]} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 28, marginBottom: 14 }}>
                <p style={{ fontSize: 10, color: "#c9a84c", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    Certificate recente
                </p>
                <Link href="/org/certificates" style={{ fontSize: 11, color: "#5c5f5a", textDecoration: "none" }}>
                    Vezi toate →
                </Link>
            </div>

            <CertificateTable certificates={recentCertificates} />
        </div>
    );
}