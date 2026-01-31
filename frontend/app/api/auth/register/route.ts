import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, password, nama, email } = body;

    // 🔍 Validasi input
    if (!id || !password || !nama || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Semua field wajib diisi",
        },
        { status: 400 },
      );
    }

    // 🧪 MOCK VALIDATION
    // simulasi ID sudah terdaftar
    if (id === "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "ID sudah terdaftar",
        },
        { status: 409 },
      );
    }

    // 🚫 TANPA DATABASE
    // data tidak benar-benar disimpan

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil",
        data: {
          user: {
            id,
            nama,
            email,
            role: "mahasiswa",
          },
          redirect: "/",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}
