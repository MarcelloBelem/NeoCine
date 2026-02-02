import { movieGenres, tvGenres } from "@/types/tmdb";

export function getGenresByIds(
  genreIds: number[],
  mediaTypes: string,
): string[] {
  if (!mediaTypes || !genreIds) return [];

  const map = mediaTypes === "movie" ? movieGenres : tvGenres;

  return genreIds.map((id) => map[id]).filter(Boolean) || [];
}

export function getImageUrl(path: string | null, size: string = "w500") {
  // Se não tiver imagem (path for null), retorna uma imagem padrão do seu projeto
  if (!path) return "/placeholder-movie.jpg";

  return `https://image.tmdb.org/t/p/${size}${path}`;
}
