import EditProfileForm from "@/components/me/EditProfileForm";
import { auth } from "@/auth";
import { pool } from "@/libs/db";
import { redirect } from "next/navigation";

export default async function OrgEditProfilePage() {
    const session = await auth();
    if (!session?.user?.email) {
        redirect("/login");
    }

    const result = await pool.query(
        "SELECT id, name, email, role FROM users WHERE email = $1",
        [session.user.email]
    );

    const user = result.rows[0];

    if (!user || user.role !== "ORG_OWNER") {
        redirect("/login");
    }

    return (
        <div style={{ maxWidth: 560 }}>
            <EditProfileForm user={user} backLink="/org" />
        </div>
    );
}
