import { getTrendingMedia } from "@/lib/tmdb/tmdb";

export async function fetchMoreTrendingMedia(page: number) {
  const data = await getTrendingMedia(page);
  return data;
}
