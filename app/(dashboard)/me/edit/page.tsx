import NavbarDashboard from "@/components/NavbarDashboard";
import EditProfileForm from "@/components/me/EditProfileForm";
import { auth } from "@/auth";
import { pool } from "@/libs/db";
import { redirect } from "next/navigation";

export default async function EditProfilePage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const result = await pool.query(
    "SELECT id, name, email, role FROM users WHERE email = $1",
    [session.user.email],
  );

  const user = result.rows[0];

  if (!user) {
    redirect("/login");
  }

  return (
    <main
      style={{
        background: "#0d0f0e",
        minHeight: "100vh",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <NavbarDashboard />
      <div
        style={{ maxWidth: 560, margin: "0 auto", padding: "100px 24px 60px" }}
      >
        <EditProfileForm user={user} backLink="/me" />
      </div>
    </main>
  );
}
