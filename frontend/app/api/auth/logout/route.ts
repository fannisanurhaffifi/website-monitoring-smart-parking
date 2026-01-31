import { NextResponse } from "next/server";

export async function POST() {
  try {
    /**
     * Karena belum pakai session / JWT,
     * logout cukup mengembalikan response sukses.
     * Nanti saat pakai cookie/JWT, logic di sini tinggal ditambah.
     */

    return NextResponse.json(
      {
        success: true,
        message: "Logout berhasil",
        redirect: "/",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
      },
      { status: 500 },
    );
  }
}
