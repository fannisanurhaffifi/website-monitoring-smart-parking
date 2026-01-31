"use client";

import { useState } from "react";
import StatCard from "@/app/components/StatCard";

/* ===== TIPE DATA RIWAYAT ===== */
type RiwayatMasuk = {
  tanggal: string;
  waktuMasuk: string;
  slot: string;
  status: "Masuk" | "Keluar";
};

/* ===== DUMMY RIWAYAT USER LOGIN ===== */
const riwayatUser: RiwayatMasuk[] = [
  {
    tanggal: "17/01/2026",
    waktuMasuk: "08:10",
    slot: "A01",
    status: "Masuk",
  },
  {
    tanggal: "16/01/2026",
    waktuMasuk: "09:00",
    slot: "B03",
    status: "Keluar",
  },
];

export default function InformasiParkirPage() {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);

    // ⏳ nanti diganti fetch realtime
    setTimeout(() => {
      setLoading(false);
      alert("Data parkir diperbarui");
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* ================= STATUS PARKIR ================= */}
      <div className="flex items-center gap-3 text-sm">
        <span className="font-semibold text-gray-700">Status Parkir:</span>
        <span className="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white">
          Penuh
        </span>
      </div>

      {/* ================= KETERSEDIAAN PARKIR ================= */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-gray-800">
            Ketersediaan Parkir
          </h3>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="rounded bg-[#1F3A93] px-4 py-1.5 text-xs font-semibold text-white
              transition hover:bg-[#162C6E] disabled:opacity-60"
          >
            {loading ? "Memperbarui..." : "Perbarui Data"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Slot" value="200 Slot" />
          <StatCard title="Terisi" value="180 Kendaraan" />
          <StatCard title="Tersedia" value="20 Slot" />
          <StatCard title="Kesempatan Parkir" value="10%" />
        </div>
      </section>

      {/* ================= RIWAYAT MASUK KENDARAAN USER ================= */}
      <section className="rounded-xl border border-gray-300 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-800">
          Riwayat Masuk Kendaraan Anda
        </h3>

        {riwayatUser.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <Th>Tanggal</Th>
                  <Th>Waktu Masuk</Th>
                  <Th>Waktu Keluar</Th>
                  <Th>Status</Th>
                </tr>
              </thead>

              <tbody>
                {riwayatUser.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t text-center transition hover:bg-[#F4F6F8]"
                  >
                    <Td>{item.tanggal}</Td>
                    <Td>{item.waktuMasuk}</Td>
                    <Td>{item.waktuKeluar}</Td>
                    <Td>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold
                          ${
                            item.status === "Masuk"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                      >
                        {item.status}
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-gray-500">Belum ada riwayat parkir</p>
        )}
      </section>
    </div>
  );
}

/* ================= REUSABLE TABLE CELL ================= */
function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-3 py-2 text-xs font-semibold text-gray-700">
      {children}
    </th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2 text-xs">{children}</td>;
}
