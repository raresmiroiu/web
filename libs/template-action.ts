"use server";

import { pool } from "@/libs/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function uploadTemplateAction(formData: FormData): Promise<{
  success: boolean;
  message: string;
}> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ORG_OWNER") {
    return { success: false, message: "Acces neautorizat." };
  }

  const orgName = session.user.name;
  const file = formData.get("template") as File | null;

  if (!file || file.size === 0) {
    return { success: false, message: "Niciun fișier selectat." };
  }

  if (file.type !== "application/pdf") {
    return { success: false, message: "Fișierul trebuie să fie PDF." };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return { success: false, message: "Fișierul depășește limita de 5MB." };
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await pool.query(
    "UPDATE organizations SET pdf_template = $1 WHERE name = $2",
    [buffer, orgName]
  );

  revalidatePath("/org/settings");
  return { success: true, message: "Template încărcat cu succes." };
}

export async function removeTemplateAction(): Promise<{
  success: boolean;
  message: string;
}> {
  const session = await auth();
  if (!session?.user || session.user.role !== "ORG_OWNER") {
    return { success: false, message: "Acces neautorizat." };
  }

  const orgName = session.user.name;

  await pool.query(
    "UPDATE organizations SET pdf_template = NULL WHERE name = $1",
    [orgName]
  );

  revalidatePath("/org/settings");
  return { success: true, message: "Template șters." };
}