"use client";

import { useState } from "react";

type Kendaraan = {
  id: number;
  nama: string;
  plat: string;
  tanggal: string;
  hari: string;
  masuk: string;
  keluar: string;
  status: "Terparkir" | "Keluar";
};

/* ===== DUMMY DATA ===== */
const dummyData: Kendaraan[] = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  nama: `Pengguna ${i + 1}`,
  plat: `BE ${1000 + i} XX`,
  tanggal: "2026-01-17",
  hari: "Jumat",
  masuk: "08:00",
  keluar: i % 2 === 0 ? "-" : "10:30",
  status: i % 2 === 0 ? "Terparkir" : "Keluar",
}));

export default function DataKendaraanParkir() {
  const [limit, setLimit] = useState<number | "all">(10);

  const displayedData = limit === "all" ? dummyData : dummyData.slice(0, limit);

  return (
    <section className="rounded-xl bg-[#E9EBEE] p-6 shadow-sm">
      {/* ===== HEADER ===== */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold text-gray-800">
          Data Kendaraan Parkir
        </h2>

        {/* ===== SELECT JUMLAH DATA ===== */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-600">Tampilkan</span>
          <select
            value={limit}
            onChange={(e) =>
              setLimit(
                e.target.value === "all" ? "all" : Number(e.target.value),
              )
            }
            className="rounded-md border border-gray-300 px-2 py-1
              focus:border-[#1F3A93] focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="all">Semua</option>
          </select>
          <span className="text-gray-600">data</span>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto rounded-lg bg-white">
        <table className="w-full border-collapse text-xs">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <Th>No</Th>
              <Th>Nama</Th>
              <Th>Plat Motor</Th>
              <Th>Tanggal</Th>
              <Th>Hari</Th>
              <Th>Masuk</Th>
              <Th>Keluar</Th>
              <Th>Status</Th>
            </tr>
          </thead>

          <tbody>
            {displayedData.map((item, index) => (
              <tr
                key={item.id}
                className="border-t text-center transition hover:bg-[#F4F6F8]"
              >
                <Td>{index + 1}</Td>
                <Td>{item.nama}</Td>
                <Td>{item.plat}</Td>
                <Td>{item.tanggal}</Td>
                <Td>{item.hari}</Td>
                <Td>{item.masuk}</Td>
                <Td>{item.keluar}</Td>
                <Td>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-semibold
                      ${
                        item.status === "Terparkir"
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

      {/* ===== INFO JUMLAH DATA ===== */}
      <div className="mt-3 text-xs text-gray-600">
        Menampilkan {displayedData.length} dari {dummyData.length} data
      </div>
    </section>
  );
}

/* ===== REUSABLE CELL ===== */
function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 font-semibold text-gray-700">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2">{children}</td>;
}
