import { MediaGrid } from "@/components/MediaGrid";
import { getTrending } from "@/lib/tmdb";

export default async function Home() {
  const movies = await getTrending();
  return (
    <div className="flex flex-col gap-24">
      <MediaGrid title="Populares" movies={movies} />
    </div>
  );
}
