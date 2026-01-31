import StatCard from "@/app/components/StatCard";
import DataKendaraanParkir from "@/app/components/DataKendaraanParkir";

export default function DataParkirAdminPage() {
  return (
    <div className="space-y-6">
      {/* ================= STAT CARD ================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Slot" value="200" />
        <StatCard title="Terisi" value="180" />
        <StatCard title="Tersedia" value="20" />
      </div>

      {/* ================= FILTER ================= */}
      <section className="rounded-xl border border-gray-300 bg-[#E9EBEE] p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Cari */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Cari Nama / Plat Motor
            </label>
            <input
              type="text"
              placeholder="Cari Nama / Plat Motor"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
              focus:border-[#1F3A93] focus:outline-none focus:ring-1 focus:ring-[#1F3A93]"
            />
          </div>

          {/* Tanggal Mulai */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Tanggal Mulai
            </label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
              focus:border-[#1F3A93] focus:outline-none focus:ring-1 focus:ring-[#1F3A93]"
            />
          </div>

          {/* Tanggal Sampai */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Tanggal Sampai
            </label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm
              focus:border-[#1F3A93] focus:outline-none focus:ring-1 focus:ring-[#1F3A93]"
            />
          </div>
        </div>
      </section>

      {/* ================= DATA PARKIR ================= */}
      <section>
        <DataKendaraanParkir />
      </section>

      {/* ================= PLACEHOLDER BAWAH ================= */}
      <div className="h-14 rounded-xl bg-gray-300" />
    </div>
  );
}
