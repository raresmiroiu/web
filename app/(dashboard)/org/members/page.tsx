import { auth } from "@/auth";
import MemberList, { Member } from "@/components/org/MemberList";
import { pool } from "@/libs/db"

export default async function MembersPage() {
    const session = await auth();
    const orgName = session?.user?.name;
    const orgResult = await pool.query(
        "SELECT id FROM organizations WHERE name = $1",
        [orgName]
    );
    const orgId = orgResult.rows[0]?.id;

    const membersResult = await pool.query(
        `SELECT 
            u.id, u.name, u.email,
            COUNT(c.id) as certificate_count
        FROM users u
        JOIN certificates c ON c.recipient_id = u.id
        WHERE c.org_id = $1
        GROUP BY u.id, u.name, u.email
        ORDER BY u.name`,
        [orgId]
    );

    const members: Member[] = membersResult.rows.map(row => ({
        id: String(row.id),
        name: row.name ?? row.email,
        email: row.email,
        certificateCount: Number(row.certificate_count),
    }));

    return (
        <div style={{ maxWidth: 600 }}>
            <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300,
                color: "#e8e4db", marginBottom: 4,
            }}>
                Membrii <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Echipei</em>
            </h1>
            <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 28 }}>
                Persoanele cu acces la panoul acestei organizații.
            </p>

            <MemberList members={members} />
        </div>
    );
}
