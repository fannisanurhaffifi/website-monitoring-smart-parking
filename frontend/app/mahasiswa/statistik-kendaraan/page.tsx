"use client";

import { useEffect, useState } from "react";
import StatistikKendaraan from "@/app/components/statistik-kendaraan";
import { io } from "socket.io-client";

export default function StatistikKendaraanPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const socketHost = window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : `http://${window.location.hostname}:5000`;

    const socket = io(socketHost);

    socket.on("parking_update", (payload: any) => {
      console.log("📈 Statistik real-time refresh:", payload);
      setRefreshKey(prev => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* ===== DESKRIPSI ===== */}
      <div className="rounded-lg bg-gray-200 p-4 text-sm text-gray-700">
        <p>
          Data parkir diperbarui secara real-time untuk membantu pengguna
          mengambil keputusan sebelum memasuki area parkir.
        </p>

        <button
          onClick={handleRefresh}
          className="mt-3 rounded bg-[#1F3A93] px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-[#162C6E]"
        >
          Perbarui Data
        </button>
      </div>

      {/* ===== STATISTIK ===== */}
      <StatistikKendaraan refreshKey={refreshKey} />
    </div>
  );
}
