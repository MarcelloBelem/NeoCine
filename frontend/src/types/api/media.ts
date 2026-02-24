export interface UpdateStatusMedia {
  id: number;
  type: "tv" | "movie";
  title: string;
  genres: (number | { id: number; name: string })[];
  vote_average: number;
  poster_path: string | null;
  duration?: number;
  isWatched?: boolean;
  inWatchlist?: boolean;
}

export interface MediaStatus {
  id: number | null;
  isWatched: boolean;
  isWatchlist: boolean;
}
