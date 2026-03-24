import NavbarDashboard from "@/components/NavbarDashboard";
import Sidebar from "@/components/org/Sidebar";
import "./org.css";
import { auth } from "@/auth";

export default async function OrgLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const orgName = session?.user?.name || "Organizație";
    return (

        <main style={{ background: "#0d0f0e", minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
            <NavbarDashboard />
            <div className="org-layout-main">
                <Sidebar orgName={orgName} />
                <div className="org-content">
                    {children}
                </div>
            </div>
        </main>
    );
}