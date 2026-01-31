import StatCard from "@/app/components/StatCard";
import StatistikKendaraan from "@/app/components/statistik-kendaraan";
import DataKendaraanParkir from "@/app/components/DataKendaraanParkir";

export default function AdminDashboardPage() {
  return (
    <div className="flex gap-6">
      {/* Sidebar & Navbar sudah ditangani oleh admin/layout.tsx */}

      <div className="flex-1 space-y-6">
        {/* ================= STAT CARD ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Slot" value="200" />
          <StatCard title="Terisi" value="180" />
          <StatCard title="Tersedia" value="20" />
          <StatCard title="Pengguna Aktif" value="150" />
        </div>

        {/* ================= STATISTIK ================= */}
        <div className="rounded-xl border border-gray-300 bg-[#E9EBEE] p-5">
          <StatistikKendaraan />
        </div>

        {/* ================= DATA PARKIR ================= */}
        <DataKendaraanParkir />
      </div>
    </div>
  );
}
