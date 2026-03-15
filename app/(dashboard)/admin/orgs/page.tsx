import OrgTable, { Org } from "@/components/admin/OrgTable";

export default async function AdminOrgsPage() {
  // TODO: fetch din DB
  const orgs: Org[] = [
    {
      id: "1",
      name: "Academia Digitală",
      email: "contact@academia.ro",
      certificateCount: 12,
      memberCount: 5,
      status: "ACTIVE",
      createdAt: "01 oct. 2024",
    },
    {
      id: "2",
      name: "CyberSec Academy",
      email: "info@cybersec.ro",
      certificateCount: 8,
      memberCount: 3,
      status: "ACTIVE",
      createdAt: "15 nov. 2024",
    },
    {
      id: "3",
      name: "TechNova SRL",
      email: "contact@technova.ro",
      certificateCount: 0,
      memberCount: 0,
      status: "PENDING",
      createdAt: "12 mar. 2025",
    },
    {
      id: "4",
      name: "DevPath Institute",
      email: "dev@devpath.ro",
      certificateCount: 3,
      memberCount: 2,
      status: "SUSPENDED",
      createdAt: "20 ian. 2025",
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
            Organizații
          </h1>
          <p style={{ fontSize: 13, color: "#5c5f5a" }}>
            Gestionează organizațiile înregistrate pe platformă.
          </p>
        </div>
        <input
          placeholder="Caută organizație..."
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

      <OrgTable orgs={orgs} />
    </div>
  );
}
