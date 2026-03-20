import StatsRow from "@/components/org/StatsRow";
import OrgTable, { Org } from "@/components/admin/OrgTable";
import { pool } from "@/libs/db";

export default async function AdminPage() {
    // Stats
    const statsResult = await pool.query(`
        SELECT
            (SELECT COUNT(*) FROM organizations WHERE status = 'ACTIVE') as orgs_active,
            (SELECT COUNT(*) FROM organizations WHERE status = 'PENDING') as orgs_pending,
            (SELECT COUNT(*) FROM users WHERE role = 'PARTICIPANT') as users_total,
            (SELECT COUNT(*) FROM certificates) as certs_total
    `);
    const stats = statsResult.rows[0];

    // Organizații în așteptare
    const pendingResult = await pool.query(`
        SELECT id, name, email, status, created_at
        FROM organizations
        WHERE status = 'PENDING'
        ORDER BY created_at DESC
    `);
    const pendingOrgs: Org[] = pendingResult.rows.map(row => ({
        id: String(row.id),
        name: row.name,
        email: row.email,
        status: row.status as "ACTIVE" | "PENDING" | "SUSPENDED",
        certificateCount: 0,
        memberCount: 0,
        createdAt: new Date(row.created_at).toLocaleDateString("ro-RO"),
    }));

    // Activitate recentă
    const activityResult = await pool.query(`
        SELECT 
            c.title, c.created_at,
            u.name as recipient_name,
            o.name as org_name
        FROM certificates c
        LEFT JOIN users u ON c.recipient_id = u.id
        LEFT JOIN organizations o ON c.org_id = o.id
        ORDER BY c.created_at DESC
        LIMIT 5
    `);

    const recentActivity = activityResult.rows.map(row => ({
        text: `${row.org_name} a emis un certificat`,
        sub: `${row.title} → ${row.recipient_name} · ${new Date(row.created_at).toLocaleDateString("ro-RO")}`,
        badge: "Emis",
        color: "#3ecf6e",
    }));

    return (
        <div>
            <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300,
                color: "#e8e4db", marginBottom: 4,
            }}>
                Panou de control
            </h1>
            <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 28 }}>
                Vizualizare globală a platformei Sigillium.
            </p>

            <StatsRow stats={[
                { val: Number(stats.orgs_active), label: "Organizații active", color: "#3ecf6e" },
                { val: Number(stats.orgs_pending), label: "În așteptare", color: "#c9a84c" },
                { val: Number(stats.users_total), label: "Utilizatori total" },
                { val: Number(stats.certs_total), label: "Certificate emise", color: "#e8e4db" },
            ]} />

            {pendingOrgs.length > 0 && (
                <>
                    <p style={{
                        fontSize: 10, color: "#c9a84c",
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        marginBottom: 12, marginTop: 8,
                    }}>
                        Organizații în așteptare
                    </p>
                    <OrgTable orgs={pendingOrgs} />
                </>
            )}

            <p style={{
                fontSize: 10, color: "#c9a84c",
                letterSpacing: "0.14em", textTransform: "uppercase",
                marginBottom: 12, marginTop: 24,
            }}>
                Activitate recentă
            </p>
            <div>
                {recentActivity.map(({ text, sub, badge, color },i) => (
                    <div key={i} style={{
                        background: "#131614", border: "1px solid #2e332e",
                        borderRadius: 6, padding: "12px 16px",
                        marginBottom: 8, display: "flex", alignItems: "center", gap: 12,
                    }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: "#e8e4db", marginBottom: 2 }}>{text}</div>
                            <div style={{ fontSize: 11, color: "#5c5f5a" }}>{sub}</div>
                        </div>
                        <div style={{
                            fontSize: 10, padding: "2px 8px", borderRadius: 100,
                            color, border: `1px solid ${color}33`, background: `${color}0d`,
                        }}>
                            {badge}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}