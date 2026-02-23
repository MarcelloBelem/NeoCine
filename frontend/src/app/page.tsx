import { getTrendingMedia } from "@/service/tmdb/tmdb";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

//componets
import { MediaHero } from "@/components/mediaHero/MediaHero";
import { MediaGrid } from "@/components/MediaGrid";

export default async function Home() {
  const media = await getTrendingMedia();

  if (!media || media.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-red-500">Erro ao carregar conteúdo inicial.</p>
      </div>
    );
  }

  const heroItem = media[0];
  const heroItemData = {
    id: heroItem.id,
    media_type: heroItem.media_type as "movie" | "tv",
  };

  const gridItems = media.slice(1);

  async function loadMoreTrending(page: number) {
    "use server";
    const result = await getTrendingMedia(page);
    return result ?? [];
  }

  return (
    <div className="flex flex-col gap-24">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Loader2 className="text-primary h-10 w-10 animate-spin" />
          </div>
        }
      >
        <MediaHero mediaRef={heroItemData} />
        <MediaGrid
          title="Populares"
          media={gridItems}
          fetchMoreAction={loadMoreTrending}
        />
      </Suspense>
    </div>
  );
}
