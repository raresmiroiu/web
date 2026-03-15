import EmitForm from "@/components/org/EmitForm";

export default function NewCertificatePage() {
    return (
        <div>
            <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 300,
                color: "#e8e4db", marginBottom: 4,
            }}>
                Emite <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Certificat nou</em>
            </h1>
            <p style={{ fontSize: 13, color: "#5c5f5a", marginBottom: 32 }}>
                Completează datele beneficiarului pentru a genera un certificat oficial.
            </p>

            <EmitForm />
        </div>
    );
}
