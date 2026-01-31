import DataPenggunaTable from "@/app/components/DataPenggunaTable";

export default function PenggunaParkirAdminPage() {
  return (
    <div className="space-y-6">
      {/* ================= SEARCH & FILTER ================= */}
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-800">
          Pencarian & Filter Pengguna
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari Nama / NPM / No Kendaraan"
            className="rounded-md border border-gray-300 px-3 py-2 text-xs transition
              focus:border-[#1F3A93] focus:outline-none focus:ring-1 focus:ring-[#1F3A93]"
          />

          {/* FILTER STATUS */}
          <select
            className="rounded-md border border-gray-300 px-3 py-2 text-xs transition
              focus:border-[#1F3A93] focus:outline-none focus:ring-1 focus:ring-[#1F3A93]"
          >
            <option value="">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Menunggu">Menunggu Validasi</option>
            <option value="Diblokir">Diblokir</option>
          </select>
        </div>
      </section>

      {/* ================= DATA TABLE ================= */}
      <DataPenggunaTable />

      {/* ================= FOOTER SPACE ================= */}
      <div className="h-10" />
    </div>
  );
}
