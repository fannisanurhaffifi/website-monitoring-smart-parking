import { NextResponse } from "next/server";

/**
 * GET /api/parkir
 * Ambil daftar data parkir (mock)
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: "P001",
        rfid: "RFID001",
        nama: "Mahasiswa A",
        plat_nomor: "BE 1234 AB",
        waktu_masuk: "2026-01-23 08:10",
        status: "parkir",
      },
      {
        id: "P002",
        rfid: "RFID002",
        nama: "Mahasiswa B",
        plat_nomor: "BE 5678 CD",
        waktu_masuk: "2026-01-23 09:00",
        status: "parkir",
      },
    ],
  });
}

/**
 * POST /api/parkir
 * Kendaraan masuk parkir (mock)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rfid, plat_nomor } = body;

    if (!rfid || !plat_nomor) {
      return NextResponse.json(
        {
          success: false,
          message: "RFID dan plat nomor wajib diisi",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Kendaraan berhasil masuk parkir",
        data: {
          id: "P003",
          rfid,
          plat_nomor,
          waktu_masuk: new Date().toISOString(),
          status: "parkir",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("PARKIR MASUK ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}
