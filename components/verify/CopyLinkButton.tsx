"use client";
import { useState } from "react";

export default function CopyLinkButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            style={{
                fontSize: 12, color: copied ? "#3ecf6e" : "var(--text-muted)",
                border: `1px solid ${copied ? "rgba(62,207,110,.25)" : "var(--border2)"}`,
                background: copied ? "rgba(62,207,110,.05)" : "none",
                padding: "7px 14px", borderRadius: 4, cursor: "pointer",
                transition: "all 0.15s",
            }}
        >
            {copied ? "Link copiat" : "Copiază link"}
        </button>
    );
}