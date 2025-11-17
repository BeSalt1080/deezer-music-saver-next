import EditPlaylistForm from "./EditPlaylistForm";
import { prisma } from "@/lib/prisma";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const playlist = await prisma.playlist.findFirst({ where: { id } });

  if (!playlist) {
    return (
      <div className="container my-4">
        <div className="alert alert-warning">Playlist not found</div>
      </div>
    );
  }

  return <EditPlaylistForm id={playlist.id} initialName={playlist.name} initialDescription={playlist.description} />;
}
