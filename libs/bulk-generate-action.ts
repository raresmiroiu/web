"use server";

import { pool } from "@/libs/db";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { auth } from "@/auth";

function generateCode(): string {
  return "SIG-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

async function uniqueCode(): Promise<string> {
  let code = generateCode();
  let exists = true;
  while (exists) {
    const check = await pool.query(
      "SELECT id FROM certificates WHERE code = $1",
      [code],
    );
    exists = check.rows.length > 0;
    if (exists) code = generateCode();
  }
  return code;
}

export interface BulkRow {
  recipientName: string;
  recipientEmail: string;
  title: string;
  type: string;
  domain: string;
  issuedAt: string; // YYYY-MM-DD
}

export interface BulkResult {
  row: number;
  email: string;
  name: string;
  success: boolean;
  code?: string;
  error?: string;
}

export async function bulkGenerateCertificates(
  rows: BulkRow[],
  templateId: number | null,
): Promise<{ results: BulkResult[]; issued: number; failed: number }> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ORG_OWNER") {
    return {
      results: [],
      issued: 0,
      failed: rows.length,
    };
  }

  const orgResult = await pool.query(
    "SELECT id FROM organizations WHERE name = $1",
    [session.user.name],
  );
  const orgId = orgResult.rows[0]?.id;
  if (!orgId) {
    return { results: [], issued: 0, failed: rows.length };
  }

  const results: BulkResult[] = [];
  let issued = 0;
  let failed = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    // Validate required fields
    if (
      !row.recipientEmail?.trim() ||
      !row.title?.trim() ||
      !row.type?.trim() ||
      !row.domain?.trim()
    ) {
      results.push({
        row: i + 1,
        email: row.recipientEmail ?? "",
        name: row.recipientName ?? "",
        success: false,
        error: "Câmpuri lipsă (email, titlu, tip sau domeniu)",
      });
      failed++;
      continue;
    }

    // Look up recipient
    const recipientResult = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [row.recipientEmail.trim()],
    );

    if (recipientResult.rows.length === 0) {
      results.push({
        row: i + 1,
        email: row.recipientEmail,
        name: row.recipientName,
        success: false,
        error: "Utilizatorul nu există în platformă",
      });
      failed++;
      continue;
    }

    const recipientId = recipientResult.rows[0].id;
    const code = await uniqueCode();
    const issuedAt =
      row.issuedAt?.trim() || new Date().toISOString().split("T")[0];

    try {
      await pool.query(
        `INSERT INTO certificates (code, title, type, domain, recipient_id, org_id, issued_at, template_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          code,
          row.title.trim(),
          row.type.trim(),
          row.domain.trim(),
          recipientId,
          orgId,
          issuedAt,
          templateId,
        ],
      );

      results.push({
        row: i + 1,
        email: row.recipientEmail,
        name: row.recipientName,
        success: true,
        code,
      });
      issued++;
    } catch (err: any) {
      results.push({
        row: i + 1,
        email: row.recipientEmail,
        name: row.recipientName,
        success: false,
        error: err?.message ?? "Eroare la inserare",
      });
      failed++;
    }
  }

  revalidatePath("/org/certificates");
  return { results, issued, failed };
}
