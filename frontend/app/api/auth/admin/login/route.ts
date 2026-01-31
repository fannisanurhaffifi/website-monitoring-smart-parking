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

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, password }),
      },
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { success: false, message: data.message },
        { status: backendRes.status },
      );
    }

    return NextResponse.json(
      { success: true, data: data.data },
      { status: 200 },
    );
  } catch (error) {
    console.error("LOGIN ADMIN ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
