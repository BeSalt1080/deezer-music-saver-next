import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="h-100">
      <div className={`${styles.hero} rounded-3`}>
        <div className={styles.mask}>
          <div className="d-flex justify-content-center align-items-center h-100 w-100">
            <div className={styles.content}>
              <h1 className="mb-3">Playlist Creation</h1>
              <h4 className="mb-3">Shinichi Wijaya - 535240025</h4>
              <Link
                className="btn btn-outline-light btn-lg"
                href="/playlist"
                role="button"
              >
                Start Creating Playlists
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
