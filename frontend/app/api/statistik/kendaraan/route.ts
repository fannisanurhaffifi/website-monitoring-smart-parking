import { NextResponse } from "next/server";

/**
 * GET /api/statistik/kendaraan
 * Statistik kendaraan (mock)
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      total_kendaraan_hari_ini: 87,
      kendaraan_sedang_parkir: 40,
      kendaraan_keluar: 47,
      kendaraan_masuk_per_jam: [
        { jam: "08:00", jumlah: 10 },
        { jam: "09:00", jumlah: 18 },
        { jam: "10:00", jumlah: 25 },
        { jam: "11:00", jumlah: 20 },
        { jam: "12:00", jumlah: 14 },
      ],
    },
  });
}
