"use client";

import React, { useState } from "react";

export default function MusicSearch() {
  const [query, setQuery] = useState("");
  type ResultItem = {
    id: string | number;
    title: string;
    artist?: { name?: string } | null;
    album?: { title?: string } | null;
    duration?: number | string;
    preview?: string | null;
  };

  const [results, setResults] = useState<ResultItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setResults(null);
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/music/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data?.error) {
        setResults([]);
        return;
      }
      setResults(Array.isArray(data?.data) ? data.data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-100">
      <form className="d-flex justify-content-center" onSubmit={handleSearch}>
        <div style={{ maxWidth: 720, width: "100%" }}>
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Search music..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </form>

      <div className="d-flex justify-content-center mt-4">
        <div style={{ maxWidth: 960, width: "100%" }}>
          {results && results.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Artist</th>
                    <th>Album</th>
                    <th>Duration</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>{item.artist?.name}</td>
                      <td>{item.album?.title}</td>
                      <td>{formatDuration(item.duration)}</td>
                      <td>
                        {item.preview ? (
                          <a className="btn btn-sm btn-outline-secondary" href={item.preview} target="_blank" rel="noreferrer">
                            Preview
                          </a>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : results && results.length === 0 ? (
            <div className="alert alert-secondary">No results</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function formatDuration(d: number | string | undefined) {
  const sec = Number(d || 0);
  if (!sec) return "0:00";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
