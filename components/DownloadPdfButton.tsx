"use client";

import { useState } from "react";

interface Props {
  code: string;
}

export default function DownloadPdfButton({ code }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/certificates/${code}/pdf`);

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "Eroare necunoscută" }));
        setError(error ?? "Generarea PDF-ului a eșuat.");
        return;
      }

      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `Sigillium-${code}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Eroare de rețea. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={loading}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          color: loading ? "#6b5a28" : "var(--gold, #c9a84c)",
          border: "1px solid var(--gold-dim, #6b5a28)",
          background: "var(--gold-subtle, rgba(201,168,76,.05))",
          padding: "7px 14px",
          borderRadius: 4,
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          transition: "opacity 0.15s",
        }}
      >
        {loading ? (
          <>
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              style={{ animation: "spin 1s linear infinite" }}
            >
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            Se generează...
          </>
        ) : (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Descarcă PDF
          </>
        )}
      </button>

      {error && (
        <div style={{
          marginTop: 6,
          fontSize: 11,
          color: "#e05c5c",
          background: "rgba(224,92,92,.08)",
          border: "1px solid rgba(224,92,92,.2)",
          borderRadius: 4,
          padding: "5px 10px",
        }}>
          {error}
        </div>
      )}
    </div>
  );
}