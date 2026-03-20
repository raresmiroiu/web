import Link from "next/link";
import StatsRow from "@/components/org/StatsRow";
import CertificateTable, { OrgCertificate } from "@/components/org/CertificateTable";
import { auth } from "@/auth";
import { pool } from "@/libs/db";

export default async function OrgPage() {
    const session = await auth();
    const orgName = session?.user?.name;

    const orgResult = await pool.query(
        "SELECT id FROM organizations WHERE name = $1",
        [orgName]
    );
    const orgId = orgResult.rows[0]?.id;

    const statsResult= await pool.query(
        `SELECT
            COUNT (*) as total,
            COUNT (*) FILTER (WHERE revoked = FALSE) as active,
            COUNT (*) FILTER (WHERE revoked = TRUE) as revoked,
            COALESCE(SUM(verifications),0) as total_verifications
        FROM certificates WHERE org_id = $1
        `,
        [orgId]
    );
    const stats = statsResult.rows[0];
    // Certificate recente
    const certsResult = await pool.query(
        `SELECT 
            c.id, c.code, c.title, c.type,
            c.issued_at, c.revoked, c.verifications,
            u.name as recipient_name
        FROM certificates c
        LEFT JOIN users u ON c.recipient_id = u.id
        WHERE c.org_id = $1
        ORDER BY c.created_at DESC
        LIMIT 5`,
        [orgId]
    );

    const recentCertificates: OrgCertificate[] = certsResult.rows.map(row=>({
        id: String(row.id),
        title: row.title,
        type: row.type,
        recipientName: row.recipient_name?? "Necunoscut",
        issuedAt: new Date(row.issued_at).toLocaleDateString("ro-RO",{
            day:"numeric",month:"short",year:"numeric"
        }),
        code: row.code,
        verifications: row.verifications,
        revoked: row.revoked,
    }));

    return (
        <div>
            <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300,
                color: "#e8e4db", marginBottom: 4,
            }}>
                Bună, <em style={{ color: "#c9a84c", fontStyle: "italic" }}>{orgName}.</em>
            </h1>
            <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 28 }}>
                Rezumatul activității organizației tale.
            </p>

            <StatsRow stats={[
                {val: Number(stats.total), label:"Certificate emise"},
                {val: Number(stats.active), label:"Active", color:"#3ecf6e"},
                {val: Number(stats.revoked), label:"Revocate",color:"#e05c5c" }
            ]} />

            <StatsRow stats={[
                { val: Number(stats.total_verifications), label: "Total verificări", color: "#c9a84c" },
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