"use client";

import { useState, useRef } from "react";
import { uploadTemplateAction, removeTemplateAction } from "@/libs/template-action";

interface Props {
  hasTemplate: boolean;
}

export default function TemplateUpload({ hasTemplate }: Props) {
  const [status, setStatus] = useState<{
    type: "success" | "error" | "idle";
    msg: string;
  }>({ type: "idle", msg: "" });
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setStatus({ type: "error", msg: "Fișierul trebuie să fie PDF." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setStatus({ type: "error", msg: "Fișierul depășește limita de 5MB." });
      return;
    }
    setSelectedFile(file);
    setStatus({ type: "idle", msg: "" });
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const fd = new FormData();
    fd.append("template", selectedFile);
    const res = await uploadTemplateAction(fd);
    setStatus({ type: res.success ? "success" : "error", msg: res.message });
    if (res.success) setSelectedFile(null);
    setLoading(false);
  };

  const handleRemove = async () => {
    if (!confirm("Ești sigur că vrei să ștergi template-ul custom?")) return;
    setLoading(true);
    const res = await removeTemplateAction();
    setStatus({ type: res.success ? "success" : "error", msg: res.message });
    setLoading(false);
  };

  return (
    <div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#131614", border: "1px solid #2e332e",
        borderRadius: 6, padding: "12px 16px", marginBottom: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: hasTemplate ? "#3ecf6e" : "#5c5f5a",
          }} />
          <div>
            <div style={{ fontSize: 13, color: "#e8e4db" }}>
              {hasTemplate ? "Template custom activ" : "Niciun template custom"}
            </div>
            <div style={{ fontSize: 11, color: "#5c5f5a", marginTop: 1 }}>
              {hasTemplate
                ? "Certificatele tale folosesc template-ul tău."
                : "Se folosesc template-urile standard Sigillium."}
            </div>
          </div>
        </div>
        {hasTemplate && (
          <button
            onClick={handleRemove}
            disabled={loading}
            style={{
              fontSize: 11, color: "#e05c5c",
              border: "1px solid rgba(224,92,92,.2)", background: "none",
              padding: "5px 12px", borderRadius: 4, cursor: "pointer",
              opacity: loading ? 0.5 : 1,
            }}
          >
            Elimină template
          </button>
        )}
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `1px dashed ${dragOver ? "#c9a84c" : selectedFile ? "#3ecf6e" : "#2e332e"}`,
          borderRadius: 6,
          padding: "28px 20px",
          textAlign: "center",
          cursor: "pointer",
          background: dragOver
            ? "rgba(201,168,76,0.04)"
            : selectedFile
            ? "rgba(62,207,110,0.04)"
            : "#0d0f0e",
          transition: "all 0.2s",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        {selectedFile ? (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3ecf6e" strokeWidth="1.5" style={{ marginBottom: 8 }}>
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <div style={{ fontSize: 13, color: "#3ecf6e", marginBottom: 3 }}>
              {selectedFile.name}
            </div>
            <div style={{ fontSize: 11, color: "#5c5f5a" }}>
              {(selectedFile.size / 1024).toFixed(1)} KB · click pentru a schimba
            </div>
          </>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5c5f5a" strokeWidth="1.5" style={{ marginBottom: 8 }}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <div style={{ fontSize: 13, color: "#9e9b94", marginBottom: 3 }}>
              Trage PDF-ul aici sau <span style={{ color: "#c9a84c" }}>alege fișierul</span>
            </div>
            <div style={{ fontSize: 11, color: "#5c5f5a" }}>
              PDF · max 5MB · format A4 landscape recomandat
            </div>
          </>
        )}
      </div>

      {/* Guidance */}
      <div style={{
        marginTop: 12,
        padding: "10px 14px",
        background: "rgba(201,168,76,0.04)",
        border: "1px solid rgba(201,168,76,0.12)",
        borderRadius: 4,
        fontSize: 11, color: "#6b5a28", lineHeight: 1.6,
      }}>
        <strong style={{ color: "#c9a84c" }}>Ghid template custom:</strong> Creează un PDF A4 landscape cu
        design-ul tău (logo, culori, chenar). Lasă centrul liber — Sigillium va
        scrie automat numele beneficiarului, titlul, data și codul de verificare.
      </div>

      {/* Status message */}
      {status.type !== "idle" && (
        <div style={{
          marginTop: 10,
          fontSize: 12,
          color: status.type === "success" ? "#3ecf6e" : "#e05c5c",
          background: status.type === "success"
            ? "rgba(62,207,110,.08)"
            : "rgba(224,92,92,.08)",
          border: `1px solid ${status.type === "success"
            ? "rgba(62,207,110,.2)"
            : "rgba(224,92,92,.2)"}`,
          borderRadius: 4,
          padding: "8px 12px",
        }}>
          {status.msg}
        </div>
      )}

      {/* Upload button */}
      {selectedFile && (
        <button
          onClick={handleUpload}
          disabled={loading}
          style={{
            marginTop: 12,
            background: "#c9a84c", color: "#0d0f0e",
            border: "none", padding: "9px 20px",
            borderRadius: 4, fontSize: 13, fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            letterSpacing: "0.04em",
          }}
        >
          {loading ? "Se încarcă..." : "Salvează template"}
        </button>
      )}
    </div>
  );
}