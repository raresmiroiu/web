import NavbarDashboard from "@/components/NavbarDashboard";

export default function MeLayout({ children }: { children: React.ReactNode }) {
    return (
        <main style={{ background: "#0d0f0e", minHeight: "100vh", fontFamily: "'Outfit', sans-serif" }}>
            <NavbarDashboard />
            {children}
        </main>
    );
}