import CertificateTable, {
  OrgCertificate,
} from "@/components/org/CertificateTable";

export default async function AdminCertificatesPage() {
  // TODO: fetch din DB — toate certificatele din platformă
  const certificates: OrgCertificate[] = [
    {
      id: "1",
      title: "Curs React Avansat",
      recipientName: "Ion Popescu",
      issuedAt: "14 nov. 2024",
      code: "SIG-F1A2B3C4",
      verifications: 5,
      revoked: false,
    },
    {
      id: "2",
      title: "Securitate Web",
      recipientName: "Maria Ionescu",
      issuedAt: "03 ian. 2025",
      code: "SIG-D5E6F7G8",
      verifications: 2,
      revoked: false,
    },
    {
      id: "3",
      title: "Python pentru date",
      recipientName: "Andrei Dumitrescu",
      issuedAt: "22 feb. 2025",
      code: "SIG-H9I0J1K2",
      verifications: 0,
      revoked: true,
    },
    {
      id: "4",
      title: "DevOps Fundamentals",
      recipientName: "Elena Popa",
      issuedAt: "01 mar. 2025",
      code: "SIG-L3M4N5O6",
      verifications: 8,
      revoked: false,
    },
    {
      id: "5",
      title: "Inginerie Software — Licență",
      recipientName: "Miroiu Rareș",
      issuedAt: "14 nov. 2024",
      code: "SIG-A3F9C2E1",
      verifications: 3,
      revoked: false,
    },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 300,
              color: "#e8e4db",
              marginBottom: 4,
            }}
          >
            Certificate
          </h1>
          <p style={{ fontSize: 13, color: "#5c5f5a" }}>
            Toate certificatele emise pe platformă.
          </p>
        </div>
        <input
          placeholder="Caută certificat..."
          style={{
            background: "#131614",
            border: "1px solid #2e332e",
            borderRadius: 4,
            padding: "7px 12px",
            color: "#9e9b94",
            fontSize: 12,
            outline: "none",
            width: 200,
          }}
        />
      </div>

      <CertificateTable certificates={certificates} showRevokeButton />
    </div>
  );
}
