import { NextResponse } from "next/server";

/**
 * POST /api/logout
 * Proxy ke Backend Express
 */
export async function POST() {
  try {
    const res = await fetch("http://localhost:5000/api/logout", {
      method: "POST",
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Logout gagal",
      },
      { status: 500 },
    );
  }
}
