"use client";

import { getUserMediaAction } from "@/app/actions/api/users";
import { MediaGrid } from "@/components/MediaGrid";
import { TMDBContent } from "@/types/tmdb";
import { useEffect, useState } from "react";

export default function Watched() {
  const [media, setMedia] = useState<TMDBContent[] | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchWatchlist = async () => {
      const res = await getUserMediaAction({ isWatched: true });

      if (!isMounted) return;

      if (!res?.success || !Array.isArray(res.data)) {
        setMedia([]);
        return;
      }

      const mappedMedia = res.data
        .map((item: any) => {
          const dbMedia = item?.media;

          if (!dbMedia) return null;

          const mediaType = dbMedia.type === "tv" ? "tv" : "movie";
          const genreIds = Array.isArray(dbMedia.genres)
            ? dbMedia.genres.filter(
                (genre: unknown) => typeof genre === "number",
              )
            : [];

          const baseMedia = {
            id: dbMedia.tmdbId,
            adult: false,
            backdrop_path: null,
            poster_path: dbMedia.poster_path ?? null,
            overview: "",
            original_language: "",
            popularity: 0,
            vote_average: dbMedia.vote_average ?? 0,
            vote_count: 0,
            genre_ids: genreIds,
            media_type: mediaType,
          };

          if (mediaType === "movie") {
            return {
              ...baseMedia,
              media_type: "movie" as const,
              title: dbMedia.title,
              release_date: "",
            };
          }

          return {
            ...baseMedia,
            media_type: "tv" as const,
            name: dbMedia.title,
            first_air_date: "",
          };
        })
        .filter(Boolean) as TMDBContent[];

      setMedia(mappedMedia);
    };

    void fetchWatchlist();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadMoreSearch = async () => {
    return [];
  };

  return (
    <div className="flex flex-col gap-24">
      <MediaGrid media={media} fetchMoreAction={loadMoreSearch} />
    </div>
  );
}
