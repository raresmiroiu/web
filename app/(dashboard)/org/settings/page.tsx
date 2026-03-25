import { auth } from "@/auth";
import { pool } from "@/libs/db";
import TemplateUpload from "@/components/org/TemplateManager";

export default async function OrgSettingsPage() {
  const session = await auth();
  const orgName = session?.user?.name;

  const orgResult = await pool.query(
    "SELECT name, email, status FROM organizations WHERE name = $1",
    [orgName]
  );
  const org = orgResult.rows[0];

  return (
    <div style={{ maxWidth: 560 }}>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300,
        color: "#e8e4db", marginBottom: 4,
      }}>
        Setări <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Organizație</em>
      </h1>
      <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 32 }}>
        Gestionează profilul și template-ul de certificate al organizației.
      </p>

      {/* Org info card */}
      <div style={{
        background: "#131614", border: "1px solid #2e332e",
        borderRadius: 6, padding: "16px 20px", marginBottom: 24,
      }}>
        <div style={{ fontSize: 10, color: "#5c5f5a", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
          Informații organizație
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          <div>
            <div style={{ fontSize: 11, color: "#5c5f5a", marginBottom: 3 }}>Nume</div>
            <div style={{ fontSize: 13, color: "#e8e4db" }}>{org?.name}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#5c5f5a", marginBottom: 3 }}>Email</div>
            <div style={{ fontSize: 13, color: "#e8e4db" }}>{org?.email}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#5c5f5a", marginBottom: 3 }}>Status</div>
            <div style={{ fontSize: 13, color: org?.status === "ACTIVE" ? "#3ecf6e" : "#c9a84c" }}>
              {org?.status === "ACTIVE" ? "Activă" : "În așteptare"}
            </div>
          </div>
        </div>
      </div>

      {/* Template section */}
      <div style={{
        fontSize: 10, color: "#c9a84c", letterSpacing: "0.14em",
        textTransform: "uppercase", marginBottom: 12,
      }}>
        Template certificate
      </div>

      <TemplateUpload />
    </div>
  );
}