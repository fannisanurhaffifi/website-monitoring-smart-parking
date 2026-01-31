import { NextResponse } from "next/server";

/**
 * GET /api/parkir/:id
 * Detail parkir berdasarkan ID (mock)
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  return NextResponse.json({
    success: true,
    data: {
      id: params.id,
      rfid: "RFID001",
      nama: "Mahasiswa A",
      plat_nomor: "BE 1234 AB",
      waktu_masuk: "2026-01-23 08:10",
      status: "parkir",
    },
  });
}

/**
 * PUT /api/parkir/:id
 * Kendaraan keluar parkir (mock)
 */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    return NextResponse.json({
      success: true,
      message: "Kendaraan berhasil keluar parkir",
      data: {
        id: params.id,
        waktu_keluar: new Date().toISOString(),
        status: "keluar",
      },
    });
  } catch (error) {
    console.error("PARKIR KELUAR ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}
