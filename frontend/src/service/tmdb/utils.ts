import { TMDBContent } from "@/types/tmdb";

export function filterAndSortResults(results: TMDBContent[]): TMDBContent[] {
  return results
    .filter((item) => {
      return (
        item.media_type !== "person" &&
        item.vote_count >= 10 &&
        item.overview.trim().length > 0
      );
    })
    .sort((a, b) => b.popularity - a.popularity);
}
