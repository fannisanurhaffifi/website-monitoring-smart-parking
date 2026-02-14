"use client";

import { useEffect, useState } from "react";
import StatCard from "@/app/components/StatCard";
import StatistikKendaraan from "@/app/components/statistik-kendaraan";
import DataKendaraanParkir from "@/app/components/DataKendaraanParkir";

type DashboardSummary = {
  total_slot: number;
  terisi: number;
  tersedia: number;
  pengguna_aktif: number;
};

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary>({
    total_slot: 0,
    terisi: 0,
    tersedia: 0,
    pengguna_aktif: 0,

  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [newSlot, setNewSlot] = useState<number>(0);
  const [updatingSlot, setUpdatingSlot] = useState<boolean>(false);

  const fetchSummary = async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/admin/dashboard/summary", {
        cache: "no-store",
        signal,
      });

      if (!res.ok) {
        throw new Error("Gagal mengambil data dashboard");
      }

      const json = await res.json();

      if (json.status === "success") {
        setSummary(json.data);
        setNewSlot(json.data.total_slot);
      } else {
        throw new Error(json.message || "Terjadi kesalahan");
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error(err);
        setError("Gagal memuat data dashboard");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSlot = async () => {
    if (newSlot < 0) {
      alert("Jumlah slot tidak boleh negatif");
      return;
    }

    setUpdatingSlot(true);
    try {
      const res = await fetch("/api/admin/slot", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jumlah: newSlot }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Slot parkir berhasil diperbarui");
        fetchSummary();
      } else {
        alert(data.message || "Gagal memperbarui slot");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan sistem");
    } finally {
      setUpdatingSlot(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchSummary(controller.signal);
    return () => controller.abort();
  }, []);



  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-600">Loading dashboard...</div>
    );
  }

  if (error) {
    return <div className="p-6 text-sm text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* ================= STAT CARD ================= */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {/* CUSTOM SLOT CARD WITH INLINE EDIT */}
        <div className="rounded-xl bg-gray-200 p-3 md:p-5 shadow-sm transition hover:shadow-md">
          <p className="text-xs md:text-sm font-semibold text-gray-700">Total Slot</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-end gap-1">
              <span className="text-xl md:text-2xl font-bold text-[#1F3A93]">
                {summary.total_slot}
              </span>
              <span className="text-xs md:text-sm font-medium text-gray-600">Slot</span>
            </div>

            {/* INLINE EDIT FORM */}
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={newSlot}
                onChange={(e) => setNewSlot(parseInt(e.target.value) || 0)}
                className="w-16 rounded-md border border-gray-300 px-2 py-0.5 text-xs focus:border-[#1F3A93] focus:outline-none focus:ring-1 focus:ring-[#1F3A93]"
              />
              <button
                onClick={handleUpdateSlot}
                disabled={updatingSlot}
                className="rounded-md bg-[#1F3A93] px-2 py-0.5 text-[10px] font-semibold text-white transition hover:bg-[#162C6E] disabled:opacity-60"
              >
                {updatingSlot ? "..." : "Update"}
              </button>
            </div>
          </div>
          <p className="mt-1 text-[10px] text-gray-500 italic">Kapasitas total saat ini</p>
        </div>

        <StatCard title="Terisi" value={summary.terisi} unit="Kendaraan" />
        <StatCard title="Tersedia" value={summary.tersedia} unit="Slot" />
        <StatCard title="Pengguna Aktif" value={summary.pengguna_aktif} unit="User" />
      </div>

      {/* ================= STATISTIK ================= */}
      <div className="rounded-xl border border-gray-300 bg-[#E9EBEE] p-4 md:p-6">
        <StatistikKendaraan />
      </div>

      {/* ================= DATA PARKIR ================= */}
      <DataKendaraanParkir />
    </div>
  );
}
