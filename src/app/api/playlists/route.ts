import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const playlists = await prisma.playlist.findMany({
      include: {
        playlistMusics: {
          include: { music: true },
        },
      },
    });
    return NextResponse.json(playlists);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, musicIds } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "`name` is required" }, { status: 400 });
    }

    const data: any = { name, description };

    if (Array.isArray(musicIds) && musicIds.length > 0) {
      data.playlistMusics = {
        create: musicIds.map((musicId: number) => ({ music: { connect: { id: Number(musicId) } } })),
      };
    }

    const playlist = await prisma.playlist.create({ data, include: { playlistMusics: { include: { music: true } } } });

    return NextResponse.json(playlist, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
