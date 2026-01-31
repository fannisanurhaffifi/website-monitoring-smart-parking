import { NextResponse } from "next/server";

/**
 * GET /api/statistik/pengguna
 * Statistik pengguna parkir (mock)
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      total_pengguna: 120,
      pengguna_aktif: 95,
      pengguna_diblokir: 25,
      pengguna_parkir_hari_ini: 80,
      pengguna_tidak_parkir: 40,
    },
  });
}
