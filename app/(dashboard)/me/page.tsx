import { auth } from "@/auth";
import { pool } from "@/libs/db";
import NavbarDashboard from "@/components/NavbarDashboard";
import Stats from "@/components/me/Stats";
import CertificateList from "@/components/me/CertificateList";
import { Certificate } from "@/components/me/CertificateCard";

export default async function MePage() {
  const session = await auth();
  const userId = session?.user?.id;
  const name = session?.user?.name ?? session?.user?.email ?? "Utilizator";
  const firstName = name.includes("@") ? name.split("@")[0 ]: name.split(" ")[0];

  // TODO: Fetch certificate din DB
  //hardcodate
  const certificates: Certificate[] = [
    {
      id: "1",
      type: "Certificat de absolvire",
      title: "Inginerie Software — Licență",
      issuer: "Universitatea Politehnica București",
      issuedAt: "14 nov. 2024",
      code: "SIG-A3F9C2E1",
      verifications: 3,
      revoked: false,
    },
    {
      id: "2",
      type: "Participare competiție",
      title: "HackTM 2024 — Finalist",
      issuer: "HackTM Organization",
      issuedAt: "03 oct. 2024",
      code: "SIG-B7D2F4A9",
      verifications: 7,
      revoked: false,
    },
    {
      id: "3",
      type: "Curs profesional",
      title: "Securitate Web Avansată",
      issuer: "Romanian Cybersecurity Academy",
      issuedAt: "22 ian. 2025",
      code: "SIG-C1E8B3D6",
      verifications: 1,
      revoked: false,
    },
  ];

  const total = certificates.length;
  const active = certificates.filter(c => !c.revoked).length;
  const revoked = certificates.filter(c => c.revoked).length;

  return (
    <main style={{ background: "#0d0f0e", minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
      <NavbarDashboard />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "80px 24px 40px" }}>

        {/* Greeting */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 300,
          color: "#e8e4db", marginBottom: 4,
        }}>
          Bună, <em style={{ color: "#c9a84c", fontStyle: "italic" }}>{firstName}.</em>
        </h1>
        <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 32 }}>
          Certificatele tale digitale emise pe platformă.
        </p>

        {/* Stats */}
        <Stats total={total} active={active} revoked={revoked} />

        {/* Section label */}
        <p style={{ fontSize: 11, color: "#c9a84c", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>
          Certificatele mele
        </p>

        {/* List */}
        <CertificateList certificates={certificates} />
      </div>
    </main>
  );
}