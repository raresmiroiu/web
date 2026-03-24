import NavbarMain from "@/components/NavbarMain";
import VerifySearch from "@/components/verify/VerifySearch";
import CertificateResult from "@/components/verify/CertificateResult";
import NotFound from "@/components/verify/NotFound";
import { pool } from "@/libs/db";
import "@/app/landing.css";

interface Props {
    params: Promise<{ code: string }>;
}

export default async function VerifyCodePage({ params }: Props) {
    const { code } = await params;

    const result = await pool.query(
        `SELECT 
            c.code, c.title, c.type, c.domain,
            c.revoked, c.verifications,
            c.issued_at, c.revoked_at,
            u.name as recipient_name,
            o.name as issuer
        FROM certificates c
        LEFT JOIN users u ON c.recipient_id = u.id
        LEFT JOIN organizations o ON c.org_id = o.id
        WHERE c.code = $1`,
        [code.toUpperCase()]
    );

    const row = result.rows[0] ?? null;

    if (row) {
        await pool.query(
            "UPDATE certificates SET verifications = verifications + 1 WHERE code = $1",
            [code.toUpperCase()]
        );
    }

    const cert = row ? {
        code: row.code,
        type: row.type,
        title: row.title,
        recipientName: row.recipient_name ?? "Necunoscut",
        issuer: row.issuer ?? "Necunoscut",
        issuedAt: new Date(row.issued_at).toLocaleDateString("ro-RO", {
            day: "numeric", month: "long", year: "numeric"
        }),
        domain: row.domain,
        verifications: row.verifications + 1,
        revoked: row.revoked,
        revokedAt: row.revoked_at
            ? new Date(row.revoked_at).toLocaleDateString("ro-RO", {
                day: "numeric", month: "long", year: "numeric"
            })
            : null,
    } : null;

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