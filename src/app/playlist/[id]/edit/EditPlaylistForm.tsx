"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  initialName: string;
  initialDescription?: string | null;
};

export default function EditPlaylistForm({ id, initialName, initialDescription }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/playlists/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() || undefined }),
      });
      if (res.ok) {
        router.push("/playlist");
      } else {
        const body = await res.json().catch(() => ({}));
        setError(body?.error || res.statusText || "Update failed");
      }
    } catch (e) {
      setError("Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container my-4">
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <button type="button" className="btn btn-sm btn-outline-secondary me-3" onClick={() => router.back()}>
            Back
          </button>
          <h5 className="m-0">Edit Playlist</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
            </div>
            {error ? <div className="alert alert-danger">{error}</div> : null}
            <div className="d-flex gap-2">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => router.push("/playlist")} disabled={loading}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
