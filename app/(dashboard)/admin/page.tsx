import StatsRow from "@/components/org/StatsRow";
import OrgTable, { Org } from "@/components/admin/OrgTable";

export default async function AdminPage() {
  // TODO: fetch din DB
  const pendingOrgs: Org[] = [
    {
      id: "3",
      name: "TechNova SRL",
      email: "contact@technova.ro",
      certificateCount: 0,
      memberCount: 0,
      status: "PENDING",
      createdAt: "12 mar. 2025",
    },
  ];

  const recentActivity = [
    {
      text: "Academia Digitală a emis un certificat",
      sub: "Curs React Avansat → Ion Popescu · acum 2 ore",
      badge: "Emis",
      color: "#3ecf6e",
    },
    {
      text: "Utilizator nou înregistrat",
      sub: "maria.ionescu@gmail.com · acum 5 ore",
      badge: "Participant",
      color: "#9e9b94",
    },
    {
      text: "TechNova SRL a cerut aprobare",
      sub: "contact@technova.ro · acum 1 zi",
      badge: "În așteptare",
      color: "#c9a84c",
    },
  ];

  return (
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
        Panou de control
      </h1>
      <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 28 }}>
        Vizualizare globală a platformei Sigillium.
      </p>

      <StatsRow
        stats={[
          { val: 3, label: "Organizații active", color: "#3ecf6e" },
          { val: 1, label: "În așteptare", color: "#c9a84c" },
          { val: 48, label: "Utilizatori total" },
          { val: 127, label: "Certificate emise", color: "#e8e4db" },
        ]}
      />

      {pendingOrgs.length > 0 && (
        <>
          <p
            style={{
              fontSize: 10,
              color: "#c9a84c",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 12,
              marginTop: 8,
            }}
          >
            Organizații în așteptare
          </p>
          <OrgTable orgs={pendingOrgs} />
        </>
      )}

      <p
        style={{
          fontSize: 10,
          color: "#c9a84c",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 12,
          marginTop: 24,
        }}
      >
        Activitate recentă
      </p>
      <div>
        {recentActivity.map(({ text, sub, badge, color }) => (
          <div
            key={text}
            style={{
              background: "#131614",
              border: "1px solid #2e332e",
              borderRadius: 6,
              padding: "12px 16px",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: "#e8e4db", marginBottom: 2 }}>
                {text}
              </div>
              <div style={{ fontSize: 11, color: "#5c5f5a" }}>{sub}</div>
            </div>
            <div
              style={{
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: 100,
                color,
                border: `1px solid ${color}33`,
                background: `${color}0d`,
              }}
            >
              {badge}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
