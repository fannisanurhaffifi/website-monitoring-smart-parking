import { NextResponse } from "next/server";

/**
 * POST /api/rfid/scan
 * Scan kartu RFID oleh alat (mock)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rfid } = body;

    if (!rfid) {
      return NextResponse.json(
        {
          success: false,
          message: "RFID tidak boleh kosong",
        },
        { status: 400 },
      );
    }

    /**
     * =========================
     * SIMULASI DATA RFID
     * =========================
     */
    if (rfid === "RFID002") {
      return NextResponse.json(
        {
          success: false,
          message: "Akses ditolak, kartu diblokir",
        },
        { status: 403 },
      );
    }

    if (rfid === "RFID001") {
      return NextResponse.json({
        success: true,
        message: "Akses diterima",
        data: {
          rfid,
          pemilik: "Mahasiswa A",
          izin_parkir: true,
        },
      });
    }

    // RFID tidak dikenal
    return NextResponse.json(
      {
        success: false,
        message: "RFID tidak terdaftar",
      },
      { status: 404 },
    );
  } catch (error) {
    console.error("RFID SCAN ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}
