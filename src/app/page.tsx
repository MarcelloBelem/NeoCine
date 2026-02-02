import Image from "next/image";
import { Star } from "lucide-react";

//Components
import { MediaHero } from "@/components/mediaHero/MediaHero";
import { MediaGrid } from "@/components/MediaGrid";
import { getTrending } from "@/lib/tmdb";

export default async function Home() {
  const movies = await getTrending();

  return (
    <div className="flex flex-col gap-24">
      <MediaHero />
      <MediaGrid title="Populares" movies={movies} />
    </div>
  );
}
