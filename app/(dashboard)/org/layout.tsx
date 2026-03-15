import NavbarDashboard from "@/components/NavbarDashboard";
import Sidebar from "@/components/org/Sidebar";
import "./org.css";

export default function OrgLayout({ children }: { children: React.ReactNode }) {
    return (
        <main style={{ background: "#0d0f0e", minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
            <NavbarDashboard />
            <div className="org-layout-main">
                <Sidebar />
                <div className="org-content">
                    {children}
                </div>
            </div>
        </main>
    );
}