"use client";

import { generateCertificate } from "@/libs/generateCertificate-action";
import { getOrgTemplatesAction } from "@/libs/template-action";
import { useState, useEffect } from "react";

// ── Styles ────────────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 13px",
  background: "#0d0f0e",
  border: "1px solid #2e332e",
  borderRadius: 4,
  color: "#e8e4db",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'Outfit', sans-serif",
  transition: "border-color 0.15s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 11,
  color: "#9e9b94",
  letterSpacing: "0.06em",
  marginBottom: 7,
};

import CertificatePreview from "./CertificatePreview";

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  issuerName: string;
}

interface Template {
  id: number;
  name: string;
  html_content: string;
}

export default function EmitForm({ issuerName }: Props) {
  const [error, setError] = useState("");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  // Controlled fields
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [issuedAt, setIssuedAt] = useState("");
  const [domain, setDomain] = useState("");
  const [templateId, setTemplateId] = useState("");

  useEffect(() => {
    getOrgTemplatesAction().then((data) => setTemplates(data as Template[]));
  }, []);

  // Build preview HTML
  const previewData: Record<string, string> = {
    recipientName,
    title,
    type,
    domain,
    issuedAt,
    issuer: issuerName,
  };

  const selectedTemplate = templates.find((t) => String(t.id) === templateId);

  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = "#c9a84c");
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = "#2e332e");

  return (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
      {/* ── Form ── */}
      <div style={{ flex: "0 0 520px", minWidth: 0, maxWidth: 520 }}>
        <form
          action={async (formData) => {
            const res = await generateCertificate(formData);
            if (res?.success === false) setError(res.message);
          }}
        >
          <div className="org-form-grid">
            <div>
              <label style={labelStyle}>Nume beneficiar</label>
              <input
                style={inputStyle} placeholder="Ion Popescu"
                name="recipientName" value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                onFocus={focus} onBlur={blur}
              />
            </div>
            <div>
              <label style={labelStyle}>Email beneficiar</label>
              <input
                style={inputStyle} type="email" placeholder="ion@exemplu.com"
                name="recipientEmail" value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                onFocus={focus} onBlur={blur}
              />
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Titlu certificat</label>
            <input
              style={inputStyle} placeholder="ex. Curs React Avansat"
              name="title" value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={focus} onBlur={blur}
            />
          </div>

          <div className="org-form-grid">
            <div>
              <label style={labelStyle}>Tip certificat</label>
              <input
                style={inputStyle} placeholder="ex. Curs profesional"
                name="type" value={type}
                onChange={(e) => setType(e.target.value)}
                onFocus={focus} onBlur={blur}
              />
            </div>
            <div>
              <label style={labelStyle}>Data emiterii</label>
              <input
                style={inputStyle} type="date"
                name="issuedAt" value={issuedAt}
                onChange={(e) => setIssuedAt(e.target.value)}
                onFocus={focus} onBlur={blur}
              />
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Domeniu / specializare</label>
            <input
              style={inputStyle} placeholder="ex. Inginerie software"
              name="domain" value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onFocus={focus} onBlur={blur}
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Șablon certificat</label>
            <select
              name="templateId" value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              style={{
                ...inputStyle,
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239e9b94' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                paddingRight: 36,
                cursor: "pointer",
              }}
              onFocus={focus} onBlur={blur}
            >
              <option value="">Design standard Sigillium</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            {templates.length === 0 && (
              <div style={{ fontSize: 11, color: "#5c5f5a", marginTop: 6 }}>
                Poți adăuga șabloane custom din pagina de Setări.
              </div>
            )}
          </div>

          {error && (
            <div style={{ fontSize: 12, color: "#e05c5c", background: "rgba(224,92,92,.08)", border: "1px solid rgba(224,92,92,.2)", borderRadius: 4, padding: "8px 12px", marginBottom: 16 }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button
              type="submit"
              style={{ background: "#c9a84c", color: "#0d0f0e", border: "none", padding: "10px 24px", borderRadius: 4, fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: "0.04em" }}
            >
              Generează certificat
            </button>
            <button
              type="button"
              onClick={() => setShowPreview((p) => !p)}
              style={{
                background: "transparent",
                color: showPreview ? "#c9a84c" : "#9e9b94",
                border: `1px solid ${showPreview ? "rgba(201,168,76,0.4)" : "#2e332e"}`,
                padding: "9px 18px",
                borderRadius: 4,
                fontSize: 13,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "all 0.2s",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              {showPreview ? "Ascunde preview" : "Previzualizează"}
            </button>
          </div>
        </form>
      </div>

      {/* ── Preview panel ── */}
      {showPreview && (
        <CertificatePreview template={selectedTemplate} data={previewData} />
      )}
    </div>
  );
}
