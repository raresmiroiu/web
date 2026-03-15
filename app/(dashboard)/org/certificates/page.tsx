import CertificateTable, { OrgCertificate } from "@/components/org/CertificateTable";

export default async function CertificatesPage() {
    // TODO: fetch din DB
    const certificates: OrgCertificate[] = [
        { id: "1", title: "Curs React Avansat", recipientName: "Ion Popescu", issuedAt: "14 nov. 2024", code: "SIG-F1A2B3C4", verifications: 5, revoked: false },
        { id: "2", title: "Securitate Web", recipientName: "Maria Ionescu", issuedAt: "03 ian. 2025", code: "SIG-D5E6F7G8", verifications: 2, revoked: false },
        { id: "3", title: "DevOps Fundamentals", recipientName: "Elena Popa", issuedAt: "01 mar. 2025", code: "SIG-L3M4N5O6", verifications: 8, revoked: true },
        { id: "4", title: "UI/UX Design", recipientName: "Andrei Vasile", issuedAt: "22 dec. 2024", code: "SIG-U7V8W9X0", verifications: 1, revoked: false },
        { id: "5", title: "Baze de Date", recipientName: "Ana Marin", issuedAt: "18 oct. 2024", code: "SIG-B1C2D3E4", verifications: 12, revoked: false },
    ];

    return (
        <div>
            <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300,
                color: "#e8e4db", marginBottom: 4,
            }}>
                Toate <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Certificatele</em>
            </h1>
            <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 28 }}>
                Gestionează certificatele emise din această organizație.
            </p>

            <CertificateTable certificates={certificates} showRevokeButton={true} />
        </div>
    );
}
