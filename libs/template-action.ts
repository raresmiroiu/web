"use server";

import { pool } from "@/libs/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// 1. CREEAZĂ UN TEMPLATE NOU
export async function createTemplateAction(name: string, htmlContent: string): Promise<{ success: boolean; message: string }> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ORG_OWNER") {
    return { success: false, message: "Acces neautorizat." };
  }

  if (!name || name.trim() === "") {
    return { success: false, message: "Numele template-ului este obligatoriu." };
  }

  if (!htmlContent || htmlContent.trim() === "") {
    return { success: false, message: "Codul HTML nu poate fi gol." };
  }

  try {
    // Găsim ID-ul organizației pe baza numelui din sesiune
    const orgResult = await pool.query(
      "SELECT id FROM organizations WHERE name = $1",
      [session.user.name]
    );
    const orgId = orgResult.rows[0]?.id;

    if (!orgId) return { success: false, message: "Organizația nu a fost găsită." };

    // Inserăm template-ul în noul tabel
    await pool.query(
      "INSERT INTO templates (org_id, name, html_content) VALUES ($1, $2, $3)",
      [orgId, name, htmlContent]
    );

    // Revalidăm paginile unde afișăm template-urile
    revalidatePath("/org/settings");
    revalidatePath("/org/certificates/new");

    return { success: true, message: "Template salvat cu succes!" };
  } catch (error) {
    console.error("Eroare la crearea template-ului:", error);
    return { success: false, message: "A apărut o eroare la salvarea template-ului." };
  }
}

// 2. ȘTERGE UN TEMPLATE
export async function deleteTemplateAction(templateId: number): Promise<{ success: boolean; message: string }> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ORG_OWNER") {
    return { success: false, message: "Acces neautorizat." };
  }

  try {
    const orgResult = await pool.query(
      "SELECT id FROM organizations WHERE name = $1",
      [session.user.name]
    );
    const orgId = orgResult.rows[0]?.id;

    if (!orgId) return { success: false, message: "Organizația nu a fost găsită." };

    await pool.query(
      "DELETE FROM templates WHERE id = $1 AND org_id = $2",
      [templateId, orgId]
    );

    revalidatePath("/org/settings");
    revalidatePath("/org/certificates/new");

    return { success: true, message: "Template șters cu succes!" };
  } catch (error) {
    console.error("Eroare la ștergerea template-ului:", error);
    return { success: false, message: "A apărut o eroare la ștergere." };
  }
}

export async function getOrgTemplatesAction() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ORG_OWNER") {
    return [];
  }

  try {
    const orgResult = await pool.query(
      "SELECT id FROM organizations WHERE name = $1",
      [session.user.name]
    );
    const orgId = orgResult.rows[0]?.id;

    if (!orgId) return [];

    const templatesResult = await pool.query(
      "SELECT id, name, html_content, created_at FROM templates WHERE org_id = $1 ORDER BY created_at DESC",
      [orgId]
    );

    return templatesResult.rows;
  } catch (error) {
    console.error("Eroare la preluarea template-urilor:", error);
    return [];
  }
}