import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nama, password } = await req.json();

    if (!nama || !password) {
      return NextResponse.json(
        { success: false, message: "Nama dan password wajib diisi" },
        { status: 400 },
      );
    }

    // ✅ FIX ENDPOINT BACKEND
    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, password }),
      },
    );

    const data = await backendRes.json();

    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.error("ADMIN LOGIN ROUTE ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
