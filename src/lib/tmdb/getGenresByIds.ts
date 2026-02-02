export const movieGenres = {
  28: "Ação",
  12: "Aventura",
  16: "Animação",
  35: "Comédia",
  80: "Crime",
  99: "Documentário",
  18: "Drama",
  10751: "Família",
  14: "Fantasia",
  36: "História",
  27: "Terror",
  10402: "Música",
  9648: "Mistério",
  10749: "Romance",
  878: "Ficção científica",
  10770: "Cinema TV",
  53: "Thriller",
  10752: "Guerra",
  37: "Faroeste",
};

export const tvGenres = {
  10759: "Ação & Aventura",
  16: "Animação",
  35: "Comédia",
  80: "Crime",
  99: "Documentário",
  18: "Drama",
  10751: "Família",
  10762: "Infantil",
  9648: "Mistério",
  10763: "Notícias",
  10764: "Reality",
  10765: "Sci-Fi & Fantasia",
  10766: "Novela",
  10767: "Talk Show",
  10768: "Guerra & Política",
  37: "Faroeste",
};

export default function getGenresByIds(
  genreIds: number[],
  mediaTypes: string,
): string[] {
  if (!mediaTypes || !genreIds) return [];

  const map = mediaTypes === "movie" ? movieGenres : tvGenres;

  return (
    genreIds.map((id) => map[id as keyof typeof map]).filter(Boolean) || []
  );
}
