"use client";

import { useState } from "react";

type Playlist = {
  id: number;
  name: string;
  description?: string | null;
};

export default function PlaylistTable({ playlists }: { playlists: Playlist[] }) {
  const [rows, setRows] = useState<Playlist[]>(playlists || []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this playlist?")) return;
    try {
      const res = await fetch(`/api/playlists/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRows((s) => s.filter((r) => r.id !== id));
      } else {
        const err = await res.json().catch(() => ({}));
        alert("Delete failed: " + (err?.error || res.statusText));
      }
    } catch (_) {
      alert("Delete request failed");
    }
  }

  return (
    <div className="card">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.description || ""}</td>
                  <td>
                    <a className="btn btn-sm btn-outline-secondary me-2" href={`/playlist/${p.id}`}>
                      Show
                    </a>
                    <a className="btn btn-sm btn-outline-primary me-2" href={`/playlist/${p.id}/edit`}>
                      Edit
                    </a>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
