import NavbarMain from "@/components/NavbarMain";
import VerifySearch from "@/components/verify/VerifySearch";
import CertificateResult from "@/components/verify/CertificateResult";
import NotFound from "@/components/verify/NotFound";
import "@/app/landing.css";

interface Props {
    params: Promise<{ code: string }>;
}

export default async function VerifyCodePage({ params }: Props) {
    const { code } = await params;

    // TODO: fetch din tabelul certificates când e creat
    // const result = await pool.query(
    //     "SELECT c.*, u.name as recipient_name, o.name as org_name FROM certificates c JOIN users u ON c.user_id = u.id JOIN organizations o ON c.org_id = o.id WHERE c.code = $1",
    //     [code]
    // );
    // const cert = result.rows[0] ?? null;

    // Mock temporar
    const mockCerts: Record<string, any> = {
        "SIG-A3F9C2E1": {
            code: "SIG-A3F9C2E1",
            type: "Certificat de absolvire",
            title: "Inginerie Software — Licență",
            recipientName: "Miroiu Rareș",
            issuer: "Universitatea Politehnica București",
            issuedAt: "14 nov. 2024",
            domain: "Inginerie software",
            verifications: 4,
            revoked: false,
            revokedAt: null,
        },
        "SIG-H9I0J1K2": {
            code: "SIG-H9I0J1K2",
            type: "Curs profesional",
            title: "Python pentru date",
            recipientName: "Andrei Dumitrescu",
            issuer: "Academia Digitală",
            issuedAt: "22 feb. 2025",
            domain: "Data science",
            verifications: 1,
            revoked: true,
            revokedAt: "10 mar. 2025",
        },
    };

    const cert = mockCerts[code.toUpperCase()] ?? null;

    return (
        <main style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
            <NavbarMain />

            <div style={{
                display: "flex", justifyContent: "center",
                padding: "100px 24px 32px",
            }}>
                <VerifySearch defaultValue={code} />
            </div>

            <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 24px 60px" }}>
                {cert ? <CertificateResult cert={cert} /> : <NotFound code={code} />}
            </div>
        </main>
    );
}
