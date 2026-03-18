"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifySearch({ defaultValue = "" }: { defaultValue?: string }) {
    const router = useRouter();
    const [code, setCode] = useState(defaultValue);

    const handleSubmit = () => {
        const trimmed = code.trim().toUpperCase();
        if (!trimmed) return;
        router.push(`/verify/${trimmed}`);
    };

    return (
        <div className="verify-search">
            <input
                value={code}
                onChange={e => setCode(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
                placeholder="SIG-XXXXXXXX"
                style={{
                    flex: 1, padding: "11px 16px",
                    background: "var(--surface)", border: "1px solid var(--border2)",
                    borderRadius: 4, color: "var(--text)", fontSize: 14,
                    outline: "none", fontFamily: "monospace", letterSpacing: "0.05em",
                    minWidth: 0,
                }}
                onFocus={e => e.target.style.borderColor = "var(--gold)"}
                onBlur={e => e.target.style.borderColor = "var(--border2)"}
            />
            <button
                onClick={handleSubmit}
                style={{
                    padding: "11px 22px",
                    background: "var(--gold)", color: "var(--bg)",
                    border: "none", borderRadius: 4,
                    fontSize: 13, fontWeight: 500, cursor: "pointer",
                    whiteSpace: "nowrap",
                }}
            >
                Verifică
            </button>
        </div>
    );
}
