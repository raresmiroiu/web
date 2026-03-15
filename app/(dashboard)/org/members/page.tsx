import MemberList, { Member } from "@/components/org/MemberList";

export default async function MembersPage() {
    // TODO: fetch din DB
    const members: Member[] = [
        { id: "1", name: "Administrator Principal", email: "admin@academia.ro", certificateCount: 0 },
        { id: "2", name: "Mihai Eminescu", email: "mihai@academia.ro", certificateCount: 45 },
        { id: "3", name: "Tudor Arghezi", email: "tudor@academia.ro", certificateCount: 12 },
        { id: "4", name: "Lucian Blaga", email: "lucian@academia.ro", certificateCount: 8 },
        { id: "5", name: "George Bacovia", email: "george@academia.ro", certificateCount: 23 },
    ];

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
