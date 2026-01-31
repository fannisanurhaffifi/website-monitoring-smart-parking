import AdminNavbar from "@/app/components/AdminNavbar";
import AdminSidebar from "@/app/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6F8]">
      {/* ===== NAVBAR ===== */}
      <AdminNavbar />

      {/* ===== BODY ===== */}
      <div className="flex flex-1">
        {/* SIDEBAR */}
        <AdminSidebar />

        {/* CONTENT */}
        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
