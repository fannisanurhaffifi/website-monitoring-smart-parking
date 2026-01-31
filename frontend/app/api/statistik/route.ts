import { NextResponse } from "next/server";

/**
 * GET /api/statistik
 * Statistik global sistem parkir (mock)
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      total_pengguna: 120,
      pengguna_aktif: 95,
      pengguna_diblokir: 25,
      total_kendaraan_parkir: 40,
      kapasitas_parkir: 100,
      sisa_slot: 60,
    },
  });
}
