import PlaylistTable from "./PlaylistTable";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const playlists = await prisma.playlist.findMany({ orderBy: { id: "desc" } });

  console.log("Playlists:", playlists);
  const plain = playlists.map((p) => ({ id: p.id, name: p.name, description: p.description }));

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 m-0">Playlists</h1>
        <div>
          <a href="/music" className="btn btn-outline-primary me-2">
            Explore Music
          </a>
          <a href="/playlist/create" className="btn btn-primary">
            Create
          </a>
        </div>
      </div>

      <PlaylistTable playlists={plain} />
    </div>
  );
}
