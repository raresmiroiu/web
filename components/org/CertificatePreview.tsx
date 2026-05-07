"use client";

const QR_PLACEHOLDER =
  "data:image/svg+xml;base64," +
  btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70">
    <rect width="70" height="70" fill="#0d0f0e"/>
    <text x="35" y="30" text-anchor="middle" fill="#c9a84c" font-size="8" font-family="monospace">QR Code</text>
    <text x="35" y="44" text-anchor="middle" fill="#5c5f5a" font-size="7" font-family="monospace">Verificare</text>
    <rect x="10" y="50" width="50" height="1" fill="#2e332e"/>
    <text x="35" y="60" text-anchor="middle" fill="#3d4039" font-size="6" font-family="monospace">Previzualizare</text>
  </svg>`);

function buildDefaultPreviewHtml(d: Record<string, string>): string {
  const fill = (s: string) =>
    s
      .split("{{recipientName}}").join(d.recipientName || "Nume Beneficiar")
      .split("{{title}}").join(d.title || "Titlul Certificatului")
      .split("{{type}}").join(d.type || "Tip certificat")
      .split("{{domain}}").join(d.domain || "Domeniu")
      .split("{{issuedAt}}").join(d.issuedAt || "—")
      .split("{{issuer}}").join(d.issuer || "Organizație")
      .split("{{code}}").join("SIG-PREVIEW")
      .split("{{qrCode}}").join(QR_PLACEHOLDER);

  return fill(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Outfit:wght@300;400;500&family=DM+Mono&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    html,body{width:297mm;height:210mm;overflow:hidden;}
    body{background:#0d0f0e;font-family:'Outfit',sans-serif;display:flex;align-items:center;justify-content:center;}
    .outer{width:278mm;height:196mm;border:1px solid #2e332e;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:32px 52px;position:relative;}
    .top{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#c9a84c,#6b5a28);}
    .c{position:absolute;width:16px;height:16px;border-color:#c9a84c;border-style:solid;}
    .tl{top:8px;left:8px;border-width:1.5px 0 0 1.5px;}.tr{top:8px;right:8px;border-width:1.5px 1.5px 0 0;}
    .bl{bottom:8px;left:8px;border-width:0 0 1.5px 1.5px;}.br{bottom:8px;right:8px;border-width:0 1.5px 1.5px 0;}
    .eyebrow{font-size:8px;color:#c9a84c;letter-spacing:0.24em;text-transform:uppercase;margin-bottom:18px;}
    .type{font-size:10px;color:#5c5f5a;letter-spacing:0.16em;text-transform:uppercase;margin-bottom:10px;}
    .certifies{font-family:'Cormorant Garamond',serif;font-size:13px;color:#5c5f5a;font-style:italic;margin-bottom:10px;}
    .recipient{font-family:'Cormorant Garamond',serif;font-size:52px;color:#c9a84c;font-style:italic;font-weight:400;margin-bottom:10px;line-height:1;}
    .title{font-family:'Cormorant Garamond',serif;font-size:20px;color:#e8e4db;font-weight:300;margin-bottom:24px;}
    .divider{width:50px;height:1px;background:#2e332e;margin:0 auto 20px;}
    .footer{display:flex;gap:52px;justify-content:center;}
    .fi-label{font-size:7px;color:#3d4039;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px;}
    .fi-value{font-size:11px;color:#9e9b94;}.fi-code{font-family:'DM Mono',monospace;font-size:10px;color:#6b5a28;}
    .qr{position:absolute;bottom:16px;left:16px;}.qr img{width:70px;height:70px;}
    .qr-label{font-size:6px;color:#3d4039;letter-spacing:0.16em;text-transform:uppercase;text-align:center;margin-top:3px;}
  </style></head><body>
    <div class="outer">
      <div class="top"></div><div class="c tl"></div><div class="c tr"></div><div class="c bl"></div><div class="c br"></div>
      <div class="eyebrow">Sigillium · Certificat Digital</div>
      <div class="type">{{type}}</div>
      <div class="certifies">Se certifică că</div>
      <div class="recipient">{{recipientName}}</div>
      <div class="title">{{title}}</div>
      <div class="divider"></div>
      <div class="footer">
        <div><div class="fi-label">Emis de</div><div class="fi-value">{{issuer}}</div></div>
        <div><div class="fi-label">Data</div><div class="fi-value">{{issuedAt}}</div></div>
        <div><div class="fi-label">Cod</div><div class="fi-code">SIG-PREVIEW</div></div>
      </div>
      <div class="qr"><img src="{{qrCode}}"/><div class="qr-label">Scanează</div></div>
    </div>
  </body></html>`);
}

function applyData(html: string, d: Record<string, string>): string {
  return html
    .split("{{recipientName}}").join(d.recipientName || "Nume Beneficiar")
    .split("{{title}}").join(d.title || "Titlul Certificatului")
    .split("{{type}}").join(d.type || "Tip certificat")
    .split("{{domain}}").join(d.domain || "Domeniu")
    .split("{{issuedAt}}").join(d.issuedAt || "—")
    .split("{{issuer}}").join(d.issuer || "Organizație")
    .split("{{code}}").join("SIG-PREVIEW")
    .split("{{qrCode}}").join(QR_PLACEHOLDER);
}

export interface CertificatePreviewData {
  recipientName?: string;
  title?: string;
  type?: string;
  domain?: string;
  issuedAt?: string;
  issuer?: string;
}

interface Props {
  template?: { id: number; name: string; html_content: string } | null;
  data: CertificatePreviewData;
}

export default function CertificatePreview({ template, data }: Props) {
  const previewData = {
    recipientName: data.recipientName || "",
    title: data.title || "",
    type: data.type || "",
    domain: data.domain || "",
    issuedAt: data.issuedAt || "",
    issuer: data.issuer || "",
  };

  const previewHtml = template
    ? applyData(template.html_content, previewData)
    : buildDefaultPreviewHtml(previewData);

  return (
    <div style={{ flex: 1, minWidth: 320 }}>
      <div style={{ fontSize: 11, color: "#5c5f5a", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3ecf6e", display: "inline-block", flexShrink: 0 }} />
        Previzualizare live · dimensiunea reală este A4 landscape
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingBottom: "56.25%", // 16:9 aspect ratio
          border: "1px solid #2e332e",
          borderRadius: 6,
          overflow: "hidden",
          background: "#0a0c0b",
        }}
      >
        <iframe
          key={previewHtml.slice(0, 80)} // re-mount if template changes completely
          srcDoc={previewHtml}
          sandbox="allow-same-origin"
          title="Previzualizare certificat"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1123px",  // A4 landscape px at 96dpi
            height: "794px",
            border: "none",
            transformOrigin: "top left",
            transform: `scale(var(--preview-scale, 0.5))`,
          }}
          ref={(el) => {
            if (!el) return;
            const resize = () => {
              const container = el.parentElement;
              if (!container) return;
              const scale = container.offsetWidth / 1123;
              el.style.transform = `scale(${scale})`;
              container.style.paddingBottom = `${794 * scale}px`;
            };
            resize();
            const ro = new ResizeObserver(resize);
            ro.observe(el.parentElement!);
            return () => ro.disconnect();
          }}
        />
      </div>

      <div style={{ marginTop: 8, fontSize: 11, color: "#3d4039", textAlign: "center" }}>
        {template
          ? `Șablon custom: "${template.name}"`
          : "Design standard Sigillium (ales automat în funcție de tipul certificatului)"}
      </div>
    </div>
  );
}
