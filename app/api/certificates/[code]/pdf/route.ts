import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/libs/db";
import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";

const execFileAsync = promisify(execFile);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const result = await pool.query(
    `SELECT
      c.code, c.title, c.type, c.domain,
      c.issued_at, c.revoked,
      u.name  AS recipient_name,
      o.name  AS issuer,
      o.pdf_template
    FROM certificates c
    LEFT JOIN users u ON c.recipient_id = u.id
    LEFT JOIN organizations o ON c.org_id = o.id
    WHERE c.code = $1`,
    [code.toUpperCase()]
  );

  const row = result.rows[0];
  if (!row) {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  }
  if (row.revoked) {
    return NextResponse.json({ error: "Certificate has been revoked" }, { status: 410 });
  }

  const data = {
    recipientName: row.recipient_name ?? "—",
    title: row.title,
    type: row.type,
    domain: row.domain,
    issuer: row.issuer ?? "—",
    issuedAt: new Date(row.issued_at).toLocaleDateString("ro-RO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    code: row.code,
  };

  const scriptPath = path.join(process.cwd(), "scripts", "generate_pdf.js");
  const dataJson   = JSON.stringify(data);
  const templateArg = row.pdf_template
    ? Buffer.from(row.pdf_template).toString("base64")
    : "null";

  try {
    const { stdout } = await execFileAsync(
      "node",
      [scriptPath, dataJson, templateArg],
      {
        encoding: "buffer",
        maxBuffer: 20 * 1024 * 1024,
        timeout: 40_000,
      }
    );

    return new NextResponse(stdout, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Sigillium-${row.code}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json({ error: "PDF generation failed" }, { status: 500 });
  }
}