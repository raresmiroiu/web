"use client";

import { useState, useEffect, useRef } from "react";
import {
  createTemplateAction,
  deleteTemplateAction,
  getOrgTemplatesAction,
} from "@/libs/template-action";

interface Template {
  id: number;
  name: string;
  created_at: Date;
}

const VARIABLES = [
  { token: "{{recipientName}}", label: "Nume destinatar", example: "Ion Popescu" },
  { token: "{{title}}", label: "Titlu certificat", example: "Python pentru date" },
  { token: "{{type}}", label: "Tip certificat", example: "Curs profesional" },
  { token: "{{domain}}", label: "Domeniu", example: "Data science" },
  { token: "{{issuedAt}}", label: "Data emiterii", example: "14 nov. 2024" },
  { token: "{{issuer}}", label: "Organizație emitentă", example: "Academia Digitală" },
  { token: "{{code}}", label: "Cod unic", example: "SIG-A3F9C2E1" },
  { token: "{{qrCode}}", label: "QR code (src img)", example: "data:image/png;base64,..." },
];

const STARTER_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Outfit:wght@300;400;500&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: 297mm; height: 210mm; overflow: hidden; }

    body {
      background: #0d0f0e;
      font-family: 'Outfit', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .certificate {
      width: 278mm;
      height: 196mm;
      border: 1px solid #2e332e;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 60px;
      position: relative;
    }

    /* Colțuri decorative */
    .corner {
      position: absolute;
      width: 20px; height: 20px;
      border-color: #c9a84c;
      border-style: solid;
    }
    .tl { top: 10px; left: 10px; border-width: 1.5px 0 0 1.5px; }
    .tr { top: 10px; right: 10px; border-width: 1.5px 1.5px 0 0; }
    .bl { bottom: 10px; left: 10px; border-width: 0 0 1.5px 1.5px; }
    .br { bottom: 10px; right: 10px; border-width: 0 1.5px 1.5px 0; }

    .label {
      font-size: 9px;
      color: #c9a84c;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    .certifies {
      font-family: 'Cormorant Garamond', serif;
      font-size: 14px;
      color: #5c5f5a;
      font-style: italic;
      margin-bottom: 8px;
    }

    .recipient {
      font-family: 'Cormorant Garamond', serif;
      font-size: 54px;
      color: #c9a84c;
      font-style: italic;
      line-height: 1;
      margin-bottom: 14px;
    }

    .title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 22px;
      color: #e8e4db;
      font-weight: 300;
      margin-bottom: 28px;
    }

    .divider {
      width: 60px; height: 1px;
      background: #2e332e;
      margin: 0 auto 24px;
    }

    .meta {
      display: flex;
      gap: 48px;
      justify-content: center;
    }

    .meta-item { text-align: center; }

    .meta-label {
      font-size: 7px;
      color: #3d4039;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .meta-value { font-size: 11px; color: #9e9b94; }
    .meta-code { font-family: monospace; font-size: 10px; color: #6b5a28; }

    /* QR code */
    .qr {
      position: absolute;
      bottom: 16px;
      left: 18px;
      text-align: center;
    }
    .qr img { width: 68px; height: 68px; }
    .qr-label {
      font-size: 6px;
      color: #3d4039;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      margin-top: 3px;
    }

    .issuer-stamp {
      position: absolute;
      bottom: 22px;
      right: 22px;
      text-align: right;
    }
    .issuer-name { font-size: 10px; color: #5c5f5a; }
    .issuer-sub {
      font-size: 7px;
      color: #3d4039;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      margin-top: 2px;
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="corner tl"></div>
    <div class="corner tr"></div>
    <div class="corner bl"></div>
    <div class="corner br"></div>

    <div class="label">Sigillium · Certificat Digital</div>

    <div class="certifies">Prezenta certifică că</div>
    <div class="recipient">{{recipientName}}</div>
    <div class="title">{{title}}</div>

    <div class="divider"></div>

    <div class="meta">
      <div class="meta-item">
        <div class="meta-label">Emis de</div>
        <div class="meta-value">{{issuer}}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Data emiterii</div>
        <div class="meta-value">{{issuedAt}}</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Cod unic</div>
        <div class="meta-code">{{code}}</div>
      </div>
    </div>

    <!-- QR-ul este adăugat automat dacă lipsește, dar îl poți poziționa tu -->
    <div class="qr">
      <img src="{{qrCode}}" />
      <div class="qr-label">Scanează pentru verificare</div>
    </div>

    <div class="issuer-stamp">
      <div class="issuer-name">{{issuer}}</div>
      <div class="issuer-sub">Organizație acreditată Sigillium</div>
    </div>
  </div>
</body>
</html>`;

// Dummy data for preview
const PREVIEW_DATA: Record<string, string> = {
  "{{recipientName}}": "Ion Popescu",
  "{{title}}": "Python pentru Date",
  "{{type}}": "Curs profesional",
  "{{domain}}": "Data science",
  "{{issuedAt}}": "14 nov. 2024",
  "{{issuer}}": "Academia Digitală",
  "{{code}}": "SIG-A3F9C2E1",
  "{{qrCode}}":
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3MCA3MCI+PHJlY3Qgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjMGQwZjBlIi8+PHRleHQgeD0iMzUiIHk9IjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjYzlhODRjIiBmb250LXNpemU9IjkiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiPlFSIENvZGU8L3RleHQ+PC9zdmc+",
};

function applyPreviewData(html: string): string {
  let result = html;
  for (const [token, value] of Object.entries(PREVIEW_DATA)) {
    result = result.split(token).join(value);
  }
  return result;
}

export default function TemplateManager() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "idle";
    msg: string;
  }>({ type: "idle", msg: "" });
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");

  const [newName, setNewName] = useState("");
  const [newHtml, setNewHtml] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const loadTemplates = async () => {
    setLoading(true);
    const data = await getOrgTemplatesAction();
    setTemplates(data);
    setLoading(false);
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const handleCreate = async () => {
    if (!newName.trim() || !newHtml.trim()) {
      setStatus({ type: "error", msg: "Numele și codul HTML sunt obligatorii." });
      return;
    }
    setLoading(true);
    const res = await createTemplateAction(newName, newHtml);
    setStatus({ type: res.success ? "success" : "error", msg: res.message });
    if (res.success) {
      setNewName("");
      setNewHtml("");
      setIsAdding(false);
      await loadTemplates();
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Ești sigur că vrei să ștergi acest template? Certificatele deja emise vor folosi designul standard dacă sunt redescărcate.")) return;
    setLoading(true);
    const res = await deleteTemplateAction(id);
    setStatus({ type: res.success ? "success" : "error", msg: res.message });
    if (res.success) await loadTemplates();
    setLoading(false);
  };

  const insertVariable = (token: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = newHtml.slice(0, start);
    const after = newHtml.slice(end);
    const updated = before + token + after;
    setNewHtml(updated);
    // restore cursor after the inserted token
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + token.length, start + token.length);
    }, 0);
  };

  const openAdding = () => {
    setIsAdding(true);
    setActiveTab("code");
    setStatus({ type: "idle", msg: "" });
  };

  return (
    <div>
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#131614",
          border: "1px solid #2e332e",
          borderRadius: 6,
          padding: "16px 20px",
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 14, color: "#e8e4db", fontWeight: 500 }}>
            Șabloane HTML Custom
          </div>
          <div style={{ fontSize: 12, color: "#5c5f5a", marginTop: 4 }}>
            Creează un design personalizat de certificat folosind HTML &amp; CSS.
          </div>
        </div>
        {!isAdding && (
          <button
            onClick={openAdding}
            style={{
              background: "#c9a84c",
              color: "#0d0f0e",
              border: "none",
              padding: "8px 16px",
              borderRadius: 4,
              fontSize: 12,
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            + Adaugă Template
          </button>
        )}
      </div>

      {/* ── Status message ── */}
      {status.type !== "idle" && (
        <div
          style={{
            marginBottom: 16,
            fontSize: 13,
            color: status.type === "success" ? "#3ecf6e" : "#e05c5c",
            background: status.type === "success" ? "rgba(62,207,110,.08)" : "rgba(224,92,92,.08)",
            border: `1px solid ${status.type === "success" ? "rgba(62,207,110,.2)" : "rgba(224,92,92,.2)"}`,
            borderRadius: 4,
            padding: "10px 14px",
          }}
        >
          {status.msg}
        </div>
      )}

      {/* ── Creation form ── */}
      {isAdding && (
        <div
          style={{
            background: "#0d0f0e",
            border: "1px dashed #c9a84c",
            borderRadius: 6,
            padding: "20px",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontSize: 14, color: "#c9a84c" }}>Creare Template Nou</h3>
            <button
              onClick={() => {
                setNewHtml(STARTER_TEMPLATE);
                setActiveTab("code");
              }}
              style={{
                fontSize: 11,
                color: "#c9a84c",
                border: "1px solid rgba(201,168,76,0.3)",
                background: "rgba(201,168,76,0.06)",
                padding: "5px 12px",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              ✦ Folosește exemplu de pornire
            </button>
          </div>

          {/* Name field */}
          <input
            type="text"
            placeholder="Nume template (ex: Hackathon 2026)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              width: "100%",
              background: "#131614",
              border: "1px solid #2e332e",
              color: "#e8e4db",
              padding: "10px 14px",
              borderRadius: 4,
              fontSize: 13,
              marginBottom: 16,
              outline: "none",
              fontFamily: "'Outfit', sans-serif",
            }}
          />

          {/* ── Variable Reference Panel ── */}
          <div
            style={{
              background: "#0a0c0b",
              border: "1px solid #1e2420",
              borderRadius: 5,
              padding: "12px 14px",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: "#5c5f5a",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Variabile disponibile — click pe o variabilă pentru a o insera în cod
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {VARIABLES.map((v) => (
                <button
                  key={v.token}
                  title={`${v.label}\nExemplu: ${v.example}`}
                  onClick={() => {
                    setActiveTab("code");
                    insertVariable(v.token);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    background: "#131614",
                    border: "1px solid #2e332e",
                    borderRadius: 4,
                    padding: "6px 10px",
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c9a84c")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2e332e")}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 11,
                      color: "#c9a84c",
                      marginBottom: 2,
                    }}
                  >
                    {v.token}
                  </span>
                  <span style={{ fontSize: 10, color: "#5c5f5a" }}>{v.label}</span>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: "#3d4039", lineHeight: 1.6 }}>
              <strong style={{ color: "#5c5f5a" }}>Notă:</strong> Dacă nu incluzi{" "}
              <code style={{ fontFamily: "monospace", color: "#6b5a28" }}>{"{{qrCode}}"}</code>{" "}
              în template, QR-ul de verificare va fi adăugat automat în colțul din dreapta-jos.
            </div>
          </div>

          {/* ── Tabs: Code / Preview ── */}
          <div style={{ display: "flex", gap: 0, marginBottom: 0 }}>
            {(["code", "preview"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "7px 18px",
                  fontSize: 12,
                  background: activeTab === tab ? "#131614" : "transparent",
                  color: activeTab === tab ? "#e8e4db" : "#5c5f5a",
                  border: "1px solid #2e332e",
                  borderBottom: activeTab === tab ? "1px solid #131614" : "1px solid #2e332e",
                  borderRadius: tab === "code" ? "4px 0 0 0" : "0 4px 0 0",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: activeTab === tab ? 1 : 0,
                  marginBottom: -1,
                }}
              >
                {tab === "code" ? "✎ Cod HTML" : "◉ Previzualizare"}
              </button>
            ))}
          </div>

          {/* Code editor */}
          {activeTab === "code" && (
            <textarea
              ref={textareaRef}
              placeholder="Introdu codul HTML și CSS al certificatului tău..."
              value={newHtml}
              onChange={(e) => setNewHtml(e.target.value)}
              spellCheck={false}
              style={{
                width: "100%",
                background: "#131614",
                border: "1px solid #2e332e",
                borderRadius: "0 4px 4px 4px",
                color: "#e8e4db",
                padding: "14px",
                fontSize: 12,
                fontFamily: "'DM Mono', 'Fira Code', 'Consolas', monospace",
                minHeight: 320,
                outline: "none",
                resize: "vertical",
                lineHeight: 1.6,
                tabSize: 2,
              }}
            />
          )}

          {/* Preview */}
          {activeTab === "preview" && (
            <div
              style={{
                border: "1px solid #2e332e",
                borderRadius: "0 4px 4px 4px",
                background: "#131614",
                overflow: "hidden",
              }}
            >
              {newHtml.trim() ? (
                <>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#5c5f5a",
                      padding: "6px 12px",
                      borderBottom: "1px solid #1e2420",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Previzualizare cu date demo · dimensiunea reală este A4 landscape (297×210mm)
                  </div>
                  <div
                    style={{
                      overflowX: "auto",
                      background: "#0a0c0b",
                      height: 437, /* 794 * 0.55 */
                      position: "relative",
                    }}
                  >
                    <iframe
                      srcDoc={applyPreviewData(newHtml)}
                      style={{
                        width: "1123px",
                        height: "794px",
                        border: "none",
                        transform: "scale(0.55)",
                        transformOrigin: "top left",
                        display: "block",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                      sandbox="allow-same-origin"
                      title="Previzualizare template"
                    />
                  </div>
                </>
              ) : (
                <div
                  style={{
                    padding: "60px 20px",
                    textAlign: "center",
                    color: "#3d4039",
                    fontSize: 13,
                  }}
                >
                  Introdu cod HTML în tab-ul „Cod HTML" pentru a vedea previzualizarea.
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
            <button
              onClick={() => setIsAdding(false)}
              disabled={loading}
              style={{
                background: "transparent",
                color: "#9e9b94",
                border: "1px solid #2e332e",
                padding: "8px 16px",
                borderRadius: 4,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Anulează
            </button>
            <button
              onClick={handleCreate}
              disabled={loading}
              style={{
                background: "#c9a84c",
                color: "#0d0f0e",
                border: "none",
                padding: "8px 24px",
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Se salvează..." : "Salvează Template"}
            </button>
          </div>
        </div>
      )}

      {/* ── Template list ── */}
      {!isAdding && templates.length === 0 && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#5c5f5a",
            fontSize: 13,
            border: "1px solid #1e2420",
            borderRadius: 6,
          }}
        >
          Nu ai adăugat niciun template custom. Se vor folosi designurile standard Sigillium.
        </div>
      )}

      {!isAdding && templates.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#0a0c0b",
                border: "1px solid #1e2420",
                borderRadius: 6,
                padding: "12px 16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    background: "#131614",
                    border: "1px solid #2e332e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#e8e4db" }}>{tpl.name}</div>
                  <div style={{ fontSize: 11, color: "#5c5f5a", marginTop: 3 }}>
                    Adăugat pe {new Date(tpl.created_at).toLocaleDateString("ro-RO")}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDelete(tpl.id)}
                disabled={loading}
                style={{
                  background: "transparent",
                  color: "#e05c5c",
                  border: "1px solid rgba(224,92,92,0.2)",
                  padding: "6px 12px",
                  borderRadius: 4,
                  fontSize: 11,
                  cursor: "pointer",
                  opacity: loading ? 0.5 : 1,
                  transition: "all 0.2s",
                }}
              >
                Șterge
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
