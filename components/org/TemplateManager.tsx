"use client";

import { useState, useEffect } from "react";
import {
  createTemplateAction,
  deleteTemplateAction,
  getOrgTemplatesAction,
} from "@/libs/template-action";

// Definim structura unui template
interface Template {
  id: number;
  name: string;
  created_at: Date;
}

export default function TemplateUpload() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [status, setStatus] = useState<{ type: "success" | "error" | "idle"; msg: string }>({ type: "idle", msg: "" });
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Formular
  const [newName, setNewName] = useState("");
  const [newHtml, setNewHtml] = useState("");

  // Încărcăm template-urile la montarea componentei
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
      await loadTemplates(); // Reîmprospătăm lista
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Ești sigur că vrei să ștergi acest template? Certificatele deja emise vor folosi designul standard dacă sunt redescărcate.")) return;

    setLoading(true);
    const res = await deleteTemplateAction(id);
    setStatus({ type: res.success ? "success" : "error", msg: res.message });

    if (res.success) {
      await loadTemplates();
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Header informativ */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#131614", border: "1px solid #2e332e",
        borderRadius: 6, padding: "16px", marginBottom: 16,
      }}>
        <div>
          <div style={{ fontSize: 14, color: "#e8e4db", fontWeight: 500 }}>
            Șabloane HTML Custom
          </div>
          <div style={{ fontSize: 12, color: "#9e9b94", marginTop: 4 }}>
            Folosește variabile precum <code>{"{{recipientName}}"}</code>, <code>{"{{title}}"}</code>, <code>{"{{issuedAt}}"}</code> sau <code>{"{{code}}"}</code> în codul tău HTML.
          </div>
        </div>
        {!isAdding && (
          <button
            onClick={() => { setIsAdding(true); setStatus({ type: "idle", msg: "" }); }}
            style={{
              background: "#c9a84c", color: "#0d0f0e",
              border: "none", padding: "8px 16px",
              borderRadius: 4, fontSize: 12, fontWeight: 500,
              cursor: "pointer",
            }}
          >
            + Adaugă Template
          </button>
        )}
      </div>

      {/* Mesaj de status global */}
      {status.type !== "idle" && (
        <div style={{
          marginBottom: 16, fontSize: 13,
          color: status.type === "success" ? "#3ecf6e" : "#e05c5c",
          background: status.type === "success" ? "rgba(62,207,110,.08)" : "rgba(224,92,92,.08)",
          border: `1px solid ${status.type === "success" ? "rgba(62,207,110,.2)" : "rgba(224,92,92,.2)"}`,
          borderRadius: 4, padding: "10px 14px",
        }}>
          {status.msg}
        </div>
      )}

      {/* Formular Adăugare Template */}
      {isAdding && (
        <div style={{
          background: "#0d0f0e", border: "1px dashed #c9a84c",
          borderRadius: 6, padding: "20px", marginBottom: 24,
        }}>
          <h3 style={{ fontSize: 14, color: "#c9a84c", marginBottom: 16 }}>Creare Template Nou</h3>

          <input
            type="text"
            placeholder="Nume template (ex: Hackathon 2026)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{
              width: "100%", background: "#131614", border: "1px solid #2e332e",
              color: "#e8e4db", padding: "10px 14px", borderRadius: 4,
              fontSize: 13, marginBottom: 12, outline: "none",
            }}
          />

          <textarea
            placeholder="Introdu codul HTML și CSS aici..."
            value={newHtml}
            onChange={(e) => setNewHtml(e.target.value)}
            style={{
              width: "100%", background: "#131614", border: "1px solid #2e332e",
              color: "#e8e4db", padding: "14px", borderRadius: 4,
              fontSize: 12, fontFamily: "monospace", minHeight: "250px",
              outline: "none", resize: "vertical", marginBottom: 16,
            }}
          />

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button
              onClick={() => setIsAdding(false)}
              disabled={loading}
              style={{
                background: "transparent", color: "#9e9b94",
                border: "1px solid #2e332e", padding: "8px 16px",
                borderRadius: 4, fontSize: 12, cursor: "pointer",
              }}
            >
              Anulează
            </button>
            <button
              onClick={handleCreate}
              disabled={loading}
              style={{
                background: "#c9a84c", color: "#0d0f0e",
                border: "none", padding: "8px 24px",
                borderRadius: 4, fontSize: 12, fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Se salvează..." : "Salvează"}
            </button>
          </div>
        </div>
      )}

      {/* Lista de Template-uri */}
      {!isAdding && templates.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "40px 20px", color: "#5c5f5a", fontSize: 13, border: "1px solid #1e2420", borderRadius: 6 }}>
          Nu ai adăugat niciun template custom încă. Se vor folosi designurile standard Sigillium.
        </div>
      )}

      {!isAdding && templates.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {templates.map((tpl) => (
            <div key={tpl.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#0a0c0b", border: "1px solid #1e2420",
              borderRadius: 6, padding: "12px 16px",
            }}>
              <div>
                <div style={{ fontSize: 14, color: "#e8e4db" }}>{tpl.name}</div>
                <div style={{ fontSize: 11, color: "#5c5f5a", marginTop: 4 }}>
                  Adăugat pe {new Date(tpl.created_at).toLocaleDateString("ro-RO")}
                </div>
              </div>

              <button
                onClick={() => handleDelete(tpl.id)}
                disabled={loading}
                style={{
                  background: "transparent", color: "#e05c5c",
                  border: "1px solid rgba(224,92,92,0.2)", padding: "6px 12px",
                  borderRadius: 4, fontSize: 11, cursor: "pointer",
                  opacity: loading ? 0.5 : 1, transition: "all 0.2s"
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