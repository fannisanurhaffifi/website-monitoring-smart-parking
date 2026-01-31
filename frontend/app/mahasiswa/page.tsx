import StatCard from "../components/StatCard";
import StatistikKendaraan from "../components/statistik-kendaraan";

export default function BerandaMahasiswa() {
  return (
    <div className="space-y-6">
      {/* ===== STAT CARD ===== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard title="Terisi" value="120 Kendaraan" />

        <StatCard title="Kesempatan Parkir" value="80 Slot Tersedia" />
      </div>

      {/* ===== STATISTIK KENDARAAN ===== */}
      <StatistikKendaraan />
    </div>
  );
}
