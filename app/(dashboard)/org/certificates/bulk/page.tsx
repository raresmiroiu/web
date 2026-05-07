import BulkEmitForm from "@/components/org/BulkEmitForm";
import Link from "next/link";
import { auth } from "@/auth";

export default async function BulkCertificatesPage() {
  const session = await auth();
  const orgName = session?.user?.name ?? "";

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 28,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
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
            Emitere{" "}
            <em style={{ color: "#c9a84c", fontStyle: "italic" }}>în masă</em>
          </h1>
          <p style={{ fontSize: 13, color: "#5c5f5a" }}>
            Încarcă un fișier CSV pentru a emite mai multe certificate simultan.
          </p>
        </div>
        <Link
          href="/org/certificates/new"
          style={{
            fontSize: 12,
            color: "#9e9b94",
            border: "1px solid #2e332e",
            background: "transparent",
            padding: "8px 16px",
            borderRadius: 4,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          ← Emitere individuală
        </Link>
      </div>

      <BulkEmitForm issuerName={orgName} />
    </div>
  );
}
