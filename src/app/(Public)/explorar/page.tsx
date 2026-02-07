import { MediaGrid } from "@/components/MediaGrid";
import { getTrendingMedia } from "@/lib/tmdb/tmdb";

export default async function Home() {
  const media = await getTrendingMedia();

  return (
    <div className="flex flex-col gap-24">
      <MediaGrid title="Populares" media={media} />
    </div>
  );
}
