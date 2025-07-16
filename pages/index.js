import { useEffect, useRef, useState } from 'react';
import shaka from 'shaka-player';

export default function Home() {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [tmdbId, setTmdbId] = useState("1087192");

  const loadStream = async () => {
    setLoading(true);
    const res = await fetch(`/api/stream?id=${tmdbId}`);
    const data = await res.json();
    const url = data.streamUrl;

    const player = new shaka.Player(videoRef.current);
    await player.load(url);
    setLoading(false);
  };

  useEffect(() => {
    shaka.polyfill.installAll();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>🎬 TMDB Stream Player</h1>
      <input
        type="text"
        placeholder="Enter TMDB ID"
        value={tmdbId}
        onChange={(e) => setTmdbId(e.target.value)}
      />
      <button onClick={loadStream}>Load Stream</button>
      {loading && <p>Loading...</p>}
      <video
        ref={videoRef}
        width="640"
        height="360"
        controls
        autoPlay
        style={{ marginTop: 20 }}
      />
    </div>
  );
}
