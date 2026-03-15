import NavbarDashboard from "@/components/NavbarDashboard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "./admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        background: "#0d0f0e",
        minHeight: "100vh",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <NavbarDashboard />
      <div className="admin-layout-main">
        <AdminSidebar />
        <div className="admin-content">{children}</div>
      </div>
    </main>
  );
}
