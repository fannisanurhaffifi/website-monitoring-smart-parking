import StatistikKendaraan from "@/app/components/statistik-kendaraan";
import LaporanExport from "@/app/components/LaporanExport";

export default function StatistikPenggunaAdminPage() {
  return (
    <div className="space-y-6">
      {/* ================= STATISTIK KENDARAAN ================= */}
      <section className="rounded-xl border border-gray-300 bg-[#E9EBEE] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800">
            Statistik Kendaraan
          </h2>
        </div>

        <StatistikKendaraan />
      </section>

      {/* ================= EXPORT LAPORAN ================= */}
      <section className="rounded-xl border border-gray-300 bg-[#E9EBEE] p-6">
        <LaporanExport />
      </section>

      {/* ================= PLACEHOLDER FOOTER CONTENT ================= */}
      <div className="h-16 rounded-xl bg-gray-300" />
    </div>
  );
}
