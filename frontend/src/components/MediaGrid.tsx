"use client";

import { MediaCard } from "@/components/mediaCard/MediaCard";
import { TMDBContent } from "@/types/tmdb";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface MediaGridProps {
  title?: string;
  media: TMDBContent[] | null;
  fetchMoreAction: (page: number) => Promise<TMDBContent[]>;
}

export function MediaGrid({ title, media, fetchMoreAction }: MediaGridProps) {
  const [mediaList, setMediaList] = useState<TMDBContent[]>(media || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    setMediaList(media ?? []);
    setPage(1);
    setHasMore(true);
  }, [media]);

  useEffect(() => {
    // Se o elemento final está visível e temos mais páginas para carregar
    if (inView && hasMore && !isLoading) {
      loadMore();
    }
  }, [inView, hasMore, isLoading]);

  const loadMore = async () => {
    if (isLoading) return; // Previne múltiplas chamadas simultâneas

    setIsLoading(true);
    const nextPage = page + 1;

    try {
      const newMedia = (await fetchMoreAction(nextPage)) as TMDBContent[];

      if (newMedia && newMedia.length > 0) {
        setMediaList((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const unique = newMedia.filter((m) => !existingIds.has(m.id));
          return [...prev, ...unique];
        });
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar mais filmes:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mediaList || mediaList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-10">
        {title && <h1 className="font-orbitron text-3xl">{title}</h1>}
        <div className="rounded-lg p-10 text-center">
          <p className="font-bold text-gray-500">
            Não foi possível carregar as Mídias.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {title && <h1 className="font-orbitron text-3xl">{title}</h1>}
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:gap-6">
        {mediaList.map((mediaItem, index) => {
          if (mediaItem.media_type === "person") return null;
          const uniqueKey = `${mediaItem.id}-${index}`;
          const isMovie = mediaItem.media_type === "movie";
          return (
            <MediaCard
              key={uniqueKey}
              id={mediaItem.id}
              title={isMovie ? mediaItem.title : mediaItem.name}
              visto={false}
              vote_average={mediaItem.vote_average}
              date={isMovie ? mediaItem.release_date : mediaItem.first_air_date}
              genre_ids={mediaItem.genre_ids || []}
              media_type={mediaItem.media_type}
              poster_path={mediaItem.poster_path || ""}
            />
          );
        })}
      </div>
      {hasMore && (
        <div ref={ref} className="flex w-full justify-center p-4">
          {/* Loading Spinner Opcional */}
          <Loader2 className="text-primary-dark h-8 w-8 animate-spin" />
        </div>
      )}
    </div>
  );
}
