import { NextResponse } from "next/server";

/**
 * GET /api/rfid
 * Ambil daftar kartu RFID terdaftar (mock)
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: "RFID001",
        pemilik: "Mahasiswa A",
        status: "active",
      },
      {
        id: "RFID002",
        pemilik: "Mahasiswa B",
        status: "blocked",
      },
    ],
  });
}

/**
 * POST /api/rfid
 * Tambah / daftarkan RFID (mock)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rfid, pemilik } = body;

    if (!rfid || !pemilik) {
      return NextResponse.json(
        {
          success: false,
          message: "RFID dan pemilik wajib diisi",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "RFID berhasil didaftarkan",
        data: {
          rfid,
          pemilik,
          status: "active",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("RFID REGISTER ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}
