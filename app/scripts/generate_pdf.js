#!/usr/bin/env node
/**
 * Sigillium PDF Generator — Puppeteer + @sparticuz/chromium
 * Usage: node generate_pdf.js '<json>' [template_base64]
 * Writes PDF bytes to stdout.
 */

const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const { PdfReader, PdfWriter } = require("pdf-lib"); // overlay for custom templates

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATES
// ─────────────────────────────────────────────────────────────────────────────

const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Outfit:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
`;

const BASE = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 297mm; height: 210mm; overflow: hidden; }
`;

// ── Template 1: Absolvire — dark formal ──────────────────────────────────────
function tmplAbsolvire(d) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${FONT_IMPORT} ${BASE}
  body {
    background: #0d0f0e;
    font-family: 'Outfit', sans-serif;
    display: flex; align-items: center; justify-content: center;
  }
  .outer {
    width: 278mm; height: 196mm;
    border: 1px solid #2e332e;
    display: flex; align-items: stretch;
    position: relative; overflow: hidden;
  }
  .sidebar {
    width: 9mm; flex-shrink: 0;
    background: linear-gradient(180deg, #c9a84c 0%, #6b5a28 50%, #c9a84c 100%);
  }
  .main {
    flex: 1;
    border: 1px solid #1e2420;
    margin: 10px 10px 10px 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 28px 44px;
    position: relative;
  }
  .corner { position: absolute; width: 18px; height: 18px; border-color: #c9a84c; border-style: solid; }
  .tl { top:7px; left:7px; border-width:1.5px 0 0 1.5px; }
  .tr { top:7px; right:7px; border-width:1.5px 1.5px 0 0; }
  .bl { bottom:7px; left:7px; border-width:0 0 1.5px 1.5px; }
  .br { bottom:7px; right:7px; border-width:0 1.5px 1.5px 0; }
  .watermark {
    position: absolute; top:50%; left:50%;
    transform: translate(-50%,-50%);
    font-family:'Cormorant Garamond',serif;
    font-size: 100px; color: rgba(201,168,76,0.03);
    white-space: nowrap; letter-spacing: 0.3em; pointer-events:none;
  }
  .eyebrow { font-size:8px; color:#c9a84c; letter-spacing:0.26em; text-transform:uppercase; margin-bottom:14px; }
  .certifies { font-size:12px; color:#5c5f5a; font-style:italic; font-family:'Cormorant Garamond',serif; margin-bottom:8px; }
  .recipient {
    font-family:'Cormorant Garamond',serif;
    font-size:52px; color:#c9a84c; font-style:italic; font-weight:400;
    margin-bottom:10px; line-height:1;
  }
  .preposition { font-size:11px; color:#5c5f5a; letter-spacing:0.08em; margin-bottom:6px; }
  .cert-title {
    font-family:'Cormorant Garamond',serif;
    font-size:22px; color:#e8e4db; font-weight:300; margin-bottom:6px;
  }
  .domain { font-size:9px; color:#6b5a28; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:24px; }
  .divider { width:60px; height:1px; background:#2e332e; margin:0 auto 20px; }
  .footer { display:flex; gap:52px; justify-content:center; }
  .fi { text-align:center; }
  .fi-label { font-size:7px; color:#3d4039; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:4px; }
  .fi-value { font-size:11px; color:#9e9b94; }
  .fi-code { font-family:'DM Mono',monospace; font-size:10px; color:#6b5a28; letter-spacing:0.06em; }
  .sig { position:absolute; bottom:20px; right:24px; text-align:right; }
  .sig-org { font-size:9px; color:#5c5f5a; }
  .sig-sub { font-size:7px; color:#3d4039; letter-spacing:0.14em; text-transform:uppercase; margin-top:2px; }
  </style></head><body>
  <div class="outer">
    <div class="sidebar"></div>
    <div class="main">
      <div class="corner tl"></div><div class="corner tr"></div>
      <div class="corner bl"></div><div class="corner br"></div>
      <div class="watermark">SIGILLIUM</div>
      <div class="eyebrow">Sigillium · Platformă de Certificare Digitală</div>
      <div class="certifies">Prezenta certifică că</div>
      <div class="recipient">${d.recipientName}</div>
      <div class="preposition">a absolvit cu succes programul</div>
      <div class="cert-title">${d.title}</div>
      <div class="domain">${d.domain}</div>
      <div class="divider"></div>
      <div class="footer">
        <div class="fi">
          <div class="fi-label">Organizație emitentă</div>
          <div class="fi-value">${d.issuer}</div>
        </div>
        <div class="fi">
          <div class="fi-label">Data emiterii</div>
          <div class="fi-value">${d.issuedAt}</div>
        </div>
        <div class="fi">
          <div class="fi-label">Cod unic de verificare</div>
          <div class="fi-code">${d.code}</div>
        </div>
      </div>
      <div class="sig">
        <div class="sig-org">${d.issuer}</div>
        <div class="sig-sub">Organizație acreditată Sigillium</div>
      </div>
    </div>
  </div>
  </body></html>`;
}

// ── Template 2: Curs profesional — split panel ───────────────────────────────
function tmplCursProfesional(d) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${FONT_IMPORT} ${BASE}
  body { background:#f8f7f4; font-family:'Outfit',sans-serif; display:flex; align-items:center; justify-content:center; }
  .outer {
    width:278mm; height:196mm;
    background:white;
    display:flex; align-items:stretch;
    box-shadow:0 0 0 1px #e0ddd8;
    overflow:hidden;
  }
  .left {
    width:96mm; flex-shrink:0;
    background:#0d0f0e;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    padding:32px 28px; text-align:center;
    position:relative;
  }
  .left-accent { position:absolute; top:0; left:0; right:0; height:4px; background:linear-gradient(90deg,#c9a84c,#6b5a28); }
  .badge-ring {
    width:68px; height:68px; border-radius:50%;
    border:1.5px solid #c9a84c;
    display:flex; align-items:center; justify-content:center;
    margin-bottom:20px;
  }
  .l-type { font-size:8px; color:#c9a84c; letter-spacing:0.22em; text-transform:uppercase; margin-bottom:10px; }
  .l-title {
    font-family:'Cormorant Garamond',serif;
    font-size:19px; color:#e8e4db; font-style:italic; font-weight:300;
    line-height:1.3; margin-bottom:12px;
  }
  .l-domain { font-size:8px; color:#3d4039; letter-spacing:0.16em; text-transform:uppercase; }
  .l-divider { width:32px; height:1px; background:#2e332e; margin:14px auto; }
  .l-org { font-size:9px; color:#6b5a28; letter-spacing:0.1em; }
  .right {
    flex:1;
    display:flex; flex-direction:column; justify-content:center;
    padding:36px 44px; position:relative;
  }
  .r-eyebrow { font-size:8px; color:#c0bdb8; letter-spacing:0.22em; text-transform:uppercase; margin-bottom:16px; }
  .r-certifies { font-family:'Cormorant Garamond',serif; font-size:13px; color:#9e9b94; font-style:italic; margin-bottom:6px; }
  .r-recipient {
    font-family:'Cormorant Garamond',serif;
    font-size:54px; color:#0d0f0e; font-style:italic; font-weight:400;
    line-height:1; margin-bottom:18px;
  }
  .r-body { font-size:11px; color:#9e9b94; line-height:1.75; max-width:140mm; margin-bottom:28px; }
  .r-meta { display:flex; gap:32px; }
  .rm { border-top:1px solid #e8e6e3; padding-top:9px; }
  .rm-label { font-size:7px; color:#c0bdb8; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:3px; }
  .rm-value { font-size:11px; color:#5c5f5a; }
  .rm-code { font-family:'DM Mono',monospace; font-size:10px; color:#c9a84c; letter-spacing:0.04em; }
  .r-mark { position:absolute; bottom:18px; right:24px; font-size:7px; color:#e0ddd8; letter-spacing:0.2em; text-transform:uppercase; }
  </style></head><body>
  <div class="outer">
    <div class="left">
      <div class="left-accent"></div>
      <div class="badge-ring">
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path d="M20 2L23.5 8.5L30.5 6.5L29.5 13.5L36 16L32 22L36 28L29.5 30.5L30.5 37.5L23.5 35.5L20 42L16.5 35.5L9.5 37.5L10.5 30.5L4 28L8 22L4 16L10.5 13.5L9.5 6.5L16.5 8.5L20 2Z" stroke="#c9a84c" stroke-width="1.5" fill="none"/>
          <circle cx="20" cy="22" r="7" stroke="#c9a84c" stroke-width="1.2" fill="none"/>
          <path d="M16 22L18.5 24.5L24 19" stroke="#c9a84c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="l-type">${d.type}</div>
      <div class="l-title">${d.title}</div>
      <div class="l-domain">${d.domain}</div>
      <div class="l-divider"></div>
      <div class="l-org">${d.issuer}</div>
    </div>
    <div class="right">
      <div class="r-eyebrow">Certificat de finalizare</div>
      <div class="r-certifies">Prezenta certifică că</div>
      <div class="r-recipient">${d.recipientName}</div>
      <div class="r-body">
        a parcurs și finalizat cu succes programul de formare profesională,
        demonstrând competențele necesare în domeniu.
      </div>
      <div class="r-meta">
        <div class="rm">
          <div class="rm-label">Data emiterii</div>
          <div class="rm-value">${d.issuedAt}</div>
        </div>
        <div class="rm">
          <div class="rm-label">Organizație</div>
          <div class="rm-value">${d.issuer}</div>
        </div>
        <div class="rm">
          <div class="rm-label">Cod verificare</div>
          <div class="rm-code">${d.code}</div>
        </div>
      </div>
      <div class="r-mark">Sigillium · Certificare Digitală</div>
    </div>
  </div>
  </body></html>`;
}

// ── Template 3: Competiție — event bold ──────────────────────────────────────
function tmplCompetitie(d) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${FONT_IMPORT} ${BASE}
  body {
    background:#0a0c0b;
    font-family:'Outfit',sans-serif;
    display:flex; align-items:center; justify-content:center;
  }
  .outer {
    width:278mm; height:196mm;
    background:#0d0f0e;
    position:relative; overflow:hidden;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    text-align:center;
  }
  .glow {
    position:absolute; top:35%; left:50%;
    transform:translate(-50%,-50%);
    width:200mm; height:120mm;
    background:radial-gradient(ellipse,rgba(201,168,76,0.07) 0%,transparent 65%);
    pointer-events:none;
  }
  .bar-t { position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,#c9a84c,transparent); }
  .bar-b { position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,transparent,#c9a84c,transparent); }
  .bar-l { position:absolute; top:0; bottom:0; left:0; width:3px; background:linear-gradient(180deg,transparent,#c9a84c,transparent); }
  .bar-r { position:absolute; top:0; bottom:0; right:0; width:3px; background:linear-gradient(180deg,transparent,#c9a84c,transparent); }
  .corner { position:absolute; width:22px; height:22px; border-color:#c9a84c; border-style:solid; }
  .tl { top:10px; left:10px; border-width:1.5px 0 0 1.5px; }
  .tr { top:10px; right:10px; border-width:1.5px 1.5px 0 0; }
  .bl { bottom:10px; left:10px; border-width:0 0 1.5px 1.5px; }
  .br { bottom:10px; right:10px; border-width:0 1.5px 1.5px 0; }
  .eyebrow { font-size:8px; color:#c9a84c; letter-spacing:0.3em; text-transform:uppercase; margin-bottom:10px; }
  .ev-type { font-size:10px; color:#5c5f5a; letter-spacing:0.22em; text-transform:uppercase; margin-bottom:6px; }
  .award {
    font-family:'Cormorant Garamond',serif;
    font-size:13px; color:#5c5f5a; font-style:italic; margin-bottom:12px;
  }
  .recipient {
    font-family:'Cormorant Garamond',serif;
    font-size:62px; color:#c9a84c; font-style:italic; font-weight:400;
    line-height:1; margin-bottom:8px;
  }
  .ev-name {
    font-family:'Cormorant Garamond',serif;
    font-size:24px; color:#e8e4db; font-weight:300; margin-bottom:6px;
  }
  .domain-tag {
    display:inline-block;
    font-size:8px; color:#6b5a28; letter-spacing:0.22em; text-transform:uppercase;
    border:1px solid #2e332e; padding:3px 14px; margin-bottom:24px;
  }
  .hrule { width:80px; height:1px; background:linear-gradient(90deg,transparent,#c9a84c,transparent); margin:0 auto 20px; }
  .footer { display:flex; gap:64px; justify-content:center; }
  .fi { text-align:center; }
  .fi-label { font-size:7px; color:#3d4039; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:4px; }
  .fi-value { font-size:11px; color:#9e9b94; }
  .fi-code { font-family:'DM Mono',monospace; font-size:10px; color:#6b5a28; letter-spacing:0.06em; }
  </style></head><body>
  <div class="outer">
    <div class="glow"></div>
    <div class="bar-t"></div><div class="bar-b"></div>
    <div class="bar-l"></div><div class="bar-r"></div>
    <div class="corner tl"></div><div class="corner tr"></div>
    <div class="corner bl"></div><div class="corner br"></div>
    <div class="eyebrow">Sigillium · Certificat oficial</div>
    <div class="ev-type">${d.type}</div>
    <div class="award">Prezenta certifică participarea lui</div>
    <div class="recipient">${d.recipientName}</div>
    <div class="award">la evenimentul</div>
    <div class="ev-name">${d.title}</div>
    <div class="domain-tag">${d.domain}</div>
    <div class="hrule"></div>
    <div class="footer">
      <div class="fi">
        <div class="fi-label">Organizat de</div>
        <div class="fi-value">${d.issuer}</div>
      </div>
      <div class="fi">
        <div class="fi-label">Data</div>
        <div class="fi-value">${d.issuedAt}</div>
      </div>
      <div class="fi">
        <div class="fi-label">Cod verificare</div>
        <div class="fi-code">${d.code}</div>
      </div>
    </div>
  </div>
  </body></html>`;
}

function tmplGeneric(d) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${FONT_IMPORT} ${BASE}
  body { background:#0d0f0e; font-family:'Outfit',sans-serif; display:flex; align-items:center; justify-content:center; }
  .outer {
    width:278mm; height:196mm;
    border:1px solid #2e332e;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    text-align:center; padding:32px 52px;
    position:relative;
  }
  .top { position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#c9a84c,#6b5a28); }
  .corner { position:absolute; width:16px; height:16px; border-color:#c9a84c; border-style:solid; }
  .tl{top:8px;left:8px;border-width:1.5px 0 0 1.5px;}
  .tr{top:8px;right:8px;border-width:1.5px 1.5px 0 0;}
  .bl{bottom:8px;left:8px;border-width:0 0 1.5px 1.5px;}
  .br{bottom:8px;right:8px;border-width:0 1.5px 1.5px 0;}
  .eyebrow { font-size:8px; color:#c9a84c; letter-spacing:0.24em; text-transform:uppercase; margin-bottom:18px; }
  .type { font-size:10px; color:#5c5f5a; letter-spacing:0.16em; text-transform:uppercase; margin-bottom:10px; }
  .certifies { font-family:'Cormorant Garamond',serif; font-size:13px; color:#5c5f5a; font-style:italic; margin-bottom:10px; }
  .recipient {
    font-family:'Cormorant Garamond',serif;
    font-size:52px; color:#c9a84c; font-style:italic; font-weight:400;
    margin-bottom:10px; line-height:1;
  }
  .title { font-family:'Cormorant Garamond',serif; font-size:20px; color:#e8e4db; font-weight:300; margin-bottom:24px; }
  .divider { width:50px; height:1px; background:#2e332e; margin:0 auto 20px; }
  .footer { display:flex; gap:52px; justify-content:center; }
  .fi-label { font-size:7px; color:#3d4039; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:4px; }
  .fi-value { font-size:11px; color:#9e9b94; }
  .fi-code { font-family:'DM Mono',monospace; font-size:10px; color:#6b5a28; }
  </style></head><body>
  <div class="outer">
    <div class="top"></div>
    <div class="corner tl"></div><div class="corner tr"></div>
    <div class="corner bl"></div><div class="corner br"></div>
    <div class="eyebrow">Sigillium · Certificat Digital</div>
    <div class="type">${d.type}</div>
    <div class="certifies">Se certifică că</div>
    <div class="recipient">${d.recipientName}</div>
    <div class="title">${d.title}</div>
    <div class="divider"></div>
    <div class="footer">
      <div>
        <div class="fi-label">Emis de</div>
        <div class="fi-value">${d.issuer}</div>
      </div>
      <div>
        <div class="fi-label">Data</div>
        <div class="fi-value">${d.issuedAt}</div>
      </div>
      <div>
        <div class="fi-label">Cod</div>
        <div class="fi-code">${d.code}</div>
      </div>
    </div>
  </div>
  </body></html>`;
}

const TEMPLATE_MAP = [
  { keys: ["absolvire", "licenta", "licență", "diploma", "diplomă"], fn: tmplAbsolvire },
  { keys: ["curs profesional", "curs", "training", "formare", "workshop"], fn: tmplCursProfesional },
  { keys: ["competitie", "competiție", "participare", "hackathon", "concurs", "olimpiada", "olimpiadă"], fn: tmplCompetitie },
];

function pickTemplate(certType) {
  const key = certType.toLowerCase().trim();
  for (const { keys, fn } of TEMPLATE_MAP) {
    if (keys.some((k) => key.includes(k) || k.includes(key))) return fn;
  }
  return tmplGeneric;
}

async function generateOverlay(data, templateBytes, page) {
  const overlayHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
  ${FONT_IMPORT} ${BASE}
  body {
    background: transparent;
    font-family: 'Outfit', sans-serif;
    display: flex; align-items: center; justify-content: center;
    text-align: center;
  }
  .content { padding: 20px; }
  .type { font-size: 9px; color: #5c5f5a; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 12px; }
  .recipient { font-family: 'Cormorant Garamond', serif; font-size: 52px; color: #1a0a00; font-style: italic; margin-bottom: 10px; line-height: 1; }
  .title { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: #3d2200; margin-bottom: 8px; }
  .meta { font-size: 10px; color: #6b5040; margin-top: 16px; }
  .code { font-family: 'DM Mono', monospace; font-size: 9px; color: #8b6914; margin-top: 4px; }
  </style></head><body>
  <div class="content">
    <div class="type">${data.type}</div>
    <div class="recipient">${data.recipientName}</div>
    <div class="title">${data.title}</div>
    <div class="meta">${data.issuer} · ${data.issuedAt}</div>
    <div class="code">${data.code}</div>
  </div>
  </body></html>`;

  await page.setContent(overlayHtml, { waitUntil: "networkidle0" });
  const overlayPdfBytes = await page.pdf({
    format: "A4",
    landscape: true,
    printBackground: false, // transparent bg
  });

  const { PDFDocument } = require("pdf-lib");
  const templateDoc = await PDFDocument.load(templateBytes);
  const overlayDoc = await PDFDocument.load(overlayPdfBytes);

  const templatePage = templateDoc.getPages()[0];
  const [embeddedPage] = await templateDoc.embedPages([overlayDoc.getPages()[0]]);

  const { width, height } = templatePage.getSize();
  templatePage.drawPage(embeddedPage, { x: 0, y: 0, width, height });

  return await templateDoc.save();
}

async function main() {
  const dataJson = process.argv[2];
  const templateB64 = process.argv[3]; // "null" or base64 string

  if (!dataJson) {
    process.stderr.write('Usage: node generate_pdf.js \'<json>\' [template_base64]\n');
    process.exit(1);
  }

  const data = JSON.parse(dataJson);

let browser;
  
  if (process.platform === "win32" || process.platform === "darwin") {
    // Pentru dezvoltare locală pe Windows sau macOS folosim pachetul 'puppeteer' complet
    const puppeteerLocal = require("puppeteer");
    browser = await puppeteerLocal.launch({
      headless: true,
    });
  } else {
    // Pentru mediul de producție (Linux/Vercel) folosim @sparticuz/chromium
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1123, height: 794 }); //a4

    let pdfBytes;

    if (templateB64 && templateB64 !== "null") {
      const templateBytes = Buffer.from(templateB64, "base64");
      pdfBytes = await generateOverlay(data, templateBytes, page);
    } else {
      const templateFn = pickTemplate(data.type || "");
      const html = templateFn(data);
      await page.setContent(html, { waitUntil: "networkidle0" });
      pdfBytes = await page.pdf({
        format: "A4",
        landscape: true,
        printBackground: true,
      });
    }

    process.stdout.write(pdfBytes);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  process.stderr.write(String(err) + "\n");
  process.exit(1);
});