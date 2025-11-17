import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    if (!query) return NextResponse.json({ error: "query parameter `q` is required" }, { status: 400 });

    const res = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
