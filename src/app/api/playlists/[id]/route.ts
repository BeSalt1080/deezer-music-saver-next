import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number((await params).id);
    const playlist = await prisma.playlist.findUnique({
      where: { id },
      include: { playlistMusics: { include: { music: true } } },
    });
    if (!playlist) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(playlist);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number((await params).id);
    const body = await request.json();
    const { name, description, musicIds } = body;

    const updateData: any = {};
    if (typeof name === "string") updateData.name = name;
    if (typeof description === "string") updateData.description = description;

    await prisma.playlist.update({ where: { id }, data: updateData });

    if (Array.isArray(musicIds)) {
      await prisma.playlistMusic.deleteMany({ where: { playlistId: id } });
      if (musicIds.length > 0) {
        const createData = musicIds.map((musicId: number) => ({ playlistId: id, musicId: Number(musicId) }));
        await prisma.playlistMusic.createMany({ data: createData });
      }
    }

    const playlist = await prisma.playlist.findUnique({ where: { id }, include: { playlistMusics: { include: { music: true } } } });
    return NextResponse.json(playlist);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number((await params).id);
    await prisma.playlistMusic.deleteMany({ where: { playlistId: id } });
    await prisma.playlist.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
