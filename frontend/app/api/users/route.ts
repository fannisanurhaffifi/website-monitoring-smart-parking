import { NextResponse } from "next/server";

/**
 * GET /api/users
 * Ambil daftar semua pengguna (mock)
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: "2017051001",
        nama: "Mahasiswa A",
        npm: "2017051001",
        email: "mahasiswaa@email.com",
        rfid: "RFID001",
        parking_attempt: 10,
        status: "active",
      },
      {
        id: "2017051002",
        nama: "Mahasiswa B",
        npm: "2017051002",
        email: "mahasiswab@email.com",
        rfid: "RFID002",
        parking_attempt: 0,
        status: "blocked",
      },
    ],
  });
}

/**
 * POST /api/users
 * Tambah pengguna baru (mock)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama, npm, email, rfid } = body;

    if (!nama || !npm || !email || !rfid) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pengguna berhasil ditambahkan",
        data: {
          id: npm,
          nama,
          npm,
          email,
          rfid,
          parking_attempt: 10,
          status: "active",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}
