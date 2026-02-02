import { NextResponse } from "next/server";

/**
 * GET /api/statcard/parkir
 * Proxy ke Backend Express
 */
export async function GET() {
  try {
    const BACKEND_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

    const res = await fetch(`${BACKEND_URL}/api/statcard/parkir`, {
      method: "GET",
      cache: "no-store", // selalu ambil data terbaru
    });

    // kalau backend error
    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || "Backend error",
        },
        { status: res.status },
      );
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ StatCard API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data statcard",
      },
      { status: 500 },
    );
  }
}
