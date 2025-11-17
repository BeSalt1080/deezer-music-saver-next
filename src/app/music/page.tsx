import MusicSearch from "./MusicSearch";

export default function Page() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
      <div className="container">
        <MusicSearch />
      </div>
    </div>
  );
}
