"use client";
import { useState } from "react";
import CertificateCard, { Certificate } from "./CertificateCard";

interface Props {
  certificates: Certificate[];
}

export default function CertificateList({ certificates }: Props) {
  const [search, setSearch] = useState("");

  const filtered = certificates.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.issuer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Caută după titlu sau emitător..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "8px 14px",
            background: "#131614", border: "1px solid #2e332e",
            borderRadius: 4, color: "#9e9b94", fontSize: 13,
            fontFamily: "'Outfit', sans-serif", outline: "none",
            boxSizing: "border-box",
          }}
          onFocus={e => e.target.style.borderColor = "#c9a84c"}
          onBlur={e => e.target.style.borderColor = "#2e332e"}
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: "#5c5f5a", fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>
          Niciun certificat găsit.
        </div>
      ) : (
        filtered.map(cert => (
          <CertificateCard key={cert.id} cert={cert} />
        ))
      )}
    </div>
  );
}