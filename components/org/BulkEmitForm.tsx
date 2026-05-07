"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { bulkGenerateCertificates, BulkRow, BulkResult } from "@/libs/bulk-generate-action";
import { getOrgTemplatesAction } from "@/libs/template-action";
import CertificatePreview from "./CertificatePreview";

// ─── helpers ──────────────────────────────────────────────────────────────────

const CSV_HEADERS = ["recipientName", "recipientEmail", "title", "type", "domain", "issuedAt"];
const CSV_EXAMPLE = `recipientName,recipientEmail,title,type,domain,issuedAt
Ion Popescu,ion@exemplu.com,Python pentru Date,Curs profesional,Data science,2024-11-14
Maria Ionescu,maria@exemplu.com,React Avansat,Curs profesional,Web development,2024-11-14`;

function parseCSV(text: string): BulkRow[] {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const header = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/\s+/g, ""));
  const rows: BulkRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    const row: Record<string, string> = {};
    header.forEach((h, idx) => { row[h] = cols[idx] ?? ""; });
    rows.push({
      recipientName: row["recipientname"] ?? row["name"] ?? "",
      recipientEmail: row["recipientemail"] ?? row["email"] ?? "",
      title: row["title"] ?? "",
      type: row["type"] ?? "",
      domain: row["domain"] ?? "",
      issuedAt: row["issuedat"] ?? row["date"] ?? "",
    });
  }
  return rows;
}

function downloadCSVTemplate() {
  const blob = new Blob([CSV_EXAMPLE], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sigillium_bulk_template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ─── styles ───────────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 13px",
  background: "#0d0f0e",
  border: "1px solid #2e332e",
  borderRadius: 4,
  color: "#e8e4db",
  fontSize: 13,
  outline: "none",
  fontFamily: "'Outfit', sans-serif",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  color: "#9e9b94",
  letterSpacing: "0.06em",
  marginBottom: 7,
};

// ─── component ────────────────────────────────────────────────────────────────

type Step = "upload" | "preview" | "results";

export default function BulkEmitForm({ issuerName }: { issuerName: string }) {
  const [step, setStep] = useState<Step>("upload");
  const [rows, setRows] = useState<BulkRow[]>([]);
  const [results, setResults] = useState<BulkResult[]>([]);
  const [issuedCount, setIssuedCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [templates, setTemplates] = useState<{ id: number; name: string }[]>([]);
  const [templateId, setTemplateId] = useState<number | null>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getOrgTemplatesAction().then(setTemplates);
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
      setError("Te rog încarcă un fișier .csv");
      return;
    }
    setError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const parsed = parseCSV(text);
      if (parsed.length === 0) {
        setError("CSV-ul este gol sau are un format incorect.");
        return;
      }
      setRows(parsed);
      setStep("preview");
    };
    reader.readAsText(file);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleIssue = async () => {
    setLoading(true);
    setProgress(0);

    // Simulate incremental progress while waiting
    const timer = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 90));
    }, 300);

    const res = await bulkGenerateCertificates(rows, templateId);
    clearInterval(timer);
    setProgress(100);

    setTimeout(() => {
      setResults(res.results);
      setIssuedCount(res.issued);
      setFailedCount(res.failed);
      setStep("results");
      setLoading(false);
    }, 400);
  };

  const reset = () => {
    setStep("upload");
    setRows([]);
    setResults([]);
    setError("");
    setProgress(0);
    setSelectedRowIndex(0);
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── STEP: Upload ─────────────────────────────────────────────────────────────
  if (step === "upload") {
    return (
      <div style={{ maxWidth: 620 }}>
        {/* Info banner */}
        <div
          style={{
            background: "#0a0c0b",
            border: "1px solid #1e2420",
            borderRadius: 6,
            padding: "14px 18px",
            marginBottom: 24,
            fontSize: 12,
            color: "#9e9b94",
            lineHeight: 1.7,
          }}
        >
          <div style={{ fontSize: 12, color: "#c9a84c", marginBottom: 6, fontWeight: 500 }}>
            Format CSV așteptat
          </div>
          <code
            style={{
              display: "block",
              background: "#131614",
              border: "1px solid #2e332e",
              borderRadius: 4,
              padding: "10px 12px",
              fontFamily: "monospace",
              fontSize: 11,
              color: "#e8e4db",
              whiteSpace: "pre",
              overflowX: "auto",
              marginBottom: 10,
            }}
          >
            {CSV_EXAMPLE}
          </code>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 11, color: "#5c5f5a" }}>
            <span>✓ Prima linie = antet (header)</span>
            <span>✓ Câmpul <code style={{ color: "#c9a84c" }}>issuedAt</code> este opțional (format YYYY-MM-DD)</span>
            <span>✓ Emailul trebuie să existe în platformă</span>
          </div>
          <button
            onClick={downloadCSVTemplate}
            style={{
              marginTop: 10,
              fontSize: 11,
              color: "#c9a84c",
              border: "1px solid rgba(201,168,76,0.3)",
              background: "rgba(201,168,76,0.05)",
              padding: "5px 14px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            ↓ Descarcă template CSV
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? "#c9a84c" : "#2e332e"}`,
            borderRadius: 8,
            padding: "48px 32px",
            textAlign: "center",
            cursor: "pointer",
            background: dragOver ? "rgba(201,168,76,0.04)" : "#0a0c0b",
            transition: "all 0.2s",
            marginBottom: 20,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={dragOver ? "#c9a84c" : "#5c5f5a"} strokeWidth="1.5" style={{ marginBottom: 12 }}>
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div style={{ fontSize: 14, color: dragOver ? "#c9a84c" : "#e8e4db", marginBottom: 6 }}>
            Trage fișierul CSV aici sau dă click pentru a alege
          </div>
          <div style={{ fontSize: 12, color: "#5c5f5a" }}>Acceptat: .csv</div>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            style={{ display: "none" }}
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
        </div>

        {/* Template selector */}
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Șablon certificat (opțional)</label>
          <select
            value={templateId ?? ""}
            onChange={(e) => setTemplateId(e.target.value ? Number(e.target.value) : null)}
            style={{
              ...inputStyle,
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239e9b94' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: 36,
              cursor: "pointer",
            }}
          >
            <option value="">Design standard Sigillium</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        {error && (
          <div style={{ fontSize: 13, color: "#e05c5c", background: "rgba(224,92,92,.08)", border: "1px solid rgba(224,92,92,.2)", borderRadius: 4, padding: "8px 12px", marginBottom: 12 }}>
            {error}
          </div>
        )}
      </div>
    );
  }

  // ── STEP: Preview ─────────────────────────────────────────────────────────────
  if (step === "preview") {
    const selectedTemplate = templates.find((t) => t.id === templateId) as any;
    const previewRow = rows[selectedRowIndex] || rows[0];
    const previewData = previewRow ? {
      recipientName: previewRow.recipientName,
      title: previewRow.title,
      type: previewRow.type,
      domain: previewRow.domain,
      issuedAt: previewRow.issuedAt,
      issuer: issuerName,
    } : { issuer: issuerName };

    return (
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap", maxWidth: 1200 }}>
        <div style={{ flex: "1 1 600px", minWidth: 0 }}>
          <div
            style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 14, color: "#e8e4db", fontWeight: 500 }}>
              Previzualizare import
            </div>
            <div style={{ fontSize: 12, color: "#5c5f5a", marginTop: 3 }}>
              {rows.length} {rows.length === 1 ? "rând detectat" : "rânduri detectate"} · Verifică datele înainte de emitere
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={reset}
              style={{
                fontSize: 12,
                color: "#9e9b94",
                border: "1px solid #2e332e",
                background: "transparent",
                padding: "8px 16px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              ← Înapoi
            </button>
            <button
              onClick={handleIssue}
              disabled={loading}
              style={{
                fontSize: 12,
                color: "#0d0f0e",
                background: "#c9a84c",
                border: "none",
                padding: "8px 20px",
                borderRadius: 4,
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 500,
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Se emite..." : `Emite ${rows.length} certificate`}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {loading && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#5c5f5a", marginBottom: 6 }}>
              <span>Se procesează...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 4, background: "#1e2420", borderRadius: 100, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #c9a84c, #e8c96e)",
                  borderRadius: 100,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        )}

        {/* Table preview */}
        <div style={{ overflowX: "auto", border: "1px solid #2e332e", borderRadius: 6 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #2e332e", background: "#0f1110" }}>
                {["#", "Nume", "Email", "Titlu", "Tip", "Domeniu", "Data emiterii"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#5c5f5a", fontWeight: 400, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr 
                  key={i} 
                  onClick={() => setSelectedRowIndex(i)}
                  style={{ 
                    cursor: "pointer",
                    borderBottom: "1px solid #1e2420", 
                    background: i === selectedRowIndex ? "rgba(201,168,76,0.1)" : (i % 2 === 0 ? "#0a0c0b" : "#0d0f0e") 
                  }}
                >
                  <td style={{ padding: "9px 14px", color: i === selectedRowIndex ? "#c9a84c" : "#5c5f5a", fontFamily: "monospace" }}>{i + 1}</td>
                  <td style={{ padding: "9px 14px", color: "#e8e4db" }}>{row.recipientName || <span style={{ color: "#3d4039" }}>—</span>}</td>
                  <td style={{ padding: "9px 14px", color: "#9e9b94" }}>{row.recipientEmail}</td>
                  <td style={{ padding: "9px 14px", color: "#e8e4db" }}>{row.title}</td>
                  <td style={{ padding: "9px 14px", color: "#9e9b94" }}>{row.type}</td>
                  <td style={{ padding: "9px 14px", color: "#9e9b94" }}>{row.domain}</td>
                  <td style={{ padding: "9px 14px", color: "#9e9b94", fontFamily: "monospace", fontSize: 11 }}>
                    {row.issuedAt || <span style={{ color: "#3d4039" }}>azi</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: 11, color: "#5c5f5a", marginTop: 8 }}>
          Click pe un rând pentru a-i vedea previzualizarea.
        </div>
      </div>

      <div style={{ flex: "0 0 340px", minWidth: 0 }}>
        <CertificatePreview template={selectedTemplate} data={previewData} />
      </div>
    </div>
  );
}

  // ── STEP: Results ─────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 900 }}>
      {/* Summary */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 140, background: "#0a0c0b", border: "1px solid rgba(62,207,110,.2)", borderRadius: 6, padding: "16px 20px" }}>
          <div style={{ fontSize: 28, color: "#3ecf6e", fontFamily: "monospace", fontWeight: 500 }}>{issuedCount}</div>
          <div style={{ fontSize: 11, color: "#5c5f5a", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>Emise cu succes</div>
        </div>
        {failedCount > 0 && (
          <div style={{ flex: 1, minWidth: 140, background: "#0a0c0b", border: "1px solid rgba(224,92,92,.2)", borderRadius: 6, padding: "16px 20px" }}>
            <div style={{ fontSize: 28, color: "#e05c5c", fontFamily: "monospace", fontWeight: 500 }}>{failedCount}</div>
            <div style={{ fontSize: 11, color: "#5c5f5a", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>Eșuate</div>
          </div>
        )}
        <div style={{ flex: 1, minWidth: 140, background: "#0a0c0b", border: "1px solid #2e332e", borderRadius: 6, padding: "16px 20px" }}>
          <div style={{ fontSize: 28, color: "#e8e4db", fontFamily: "monospace", fontWeight: 500 }}>{rows.length}</div>
          <div style={{ fontSize: 11, color: "#5c5f5a", marginTop: 4, letterSpacing: "0.08em", textTransform: "uppercase" }}>Total procesate</div>
        </div>
      </div>

      {/* Results table */}
      <div style={{ overflowX: "auto", border: "1px solid #2e332e", borderRadius: 6, marginBottom: 20 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2e332e", background: "#0f1110" }}>
              {["#", "Nume", "Email", "Status", "Cod / Eroare"].map((h) => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#5c5f5a", fontWeight: 400, letterSpacing: "0.08em" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #1e2420", background: i % 2 === 0 ? "#0a0c0b" : "#0d0f0e" }}>
                <td style={{ padding: "9px 14px", color: "#5c5f5a", fontFamily: "monospace" }}>{r.row}</td>
                <td style={{ padding: "9px 14px", color: "#e8e4db" }}>{r.name || "—"}</td>
                <td style={{ padding: "9px 14px", color: "#9e9b94" }}>{r.email}</td>
                <td style={{ padding: "9px 14px" }}>
                  <span style={{
                    fontSize: 10,
                    padding: "2px 8px",
                    borderRadius: 100,
                    color: r.success ? "#3ecf6e" : "#e05c5c",
                    border: r.success ? "1px solid rgba(62,207,110,.2)" : "1px solid rgba(224,92,92,.2)",
                    background: r.success ? "rgba(62,207,110,.05)" : "rgba(224,92,92,.05)",
                  }}>
                    {r.success ? "Emis" : "Eșuat"}
                  </span>
                </td>
                <td style={{ padding: "9px 14px", fontFamily: "monospace", fontSize: 11 }}>
                  {r.success
                    ? <span style={{ color: "#c9a84c" }}>{r.code}</span>
                    : <span style={{ color: "#e05c5c" }}>{r.error}</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={reset}
          style={{
            fontSize: 12,
            color: "#0d0f0e",
            background: "#c9a84c",
            border: "none",
            padding: "9px 20px",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          + Import nou
        </button>
        <a
          href="/org/certificates"
          style={{
            fontSize: 12,
            color: "#9e9b94",
            border: "1px solid #2e332e",
            background: "transparent",
            padding: "9px 20px",
            borderRadius: 4,
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Vezi toate certificatele →
        </a>
      </div>
    </div>
  );
}
