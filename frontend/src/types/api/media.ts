export interface UpdateStatusMedia {
  id: number;
  type: "tv" | "movie";
  duration?: number;
  isWatched?: boolean;
  inWatchlist?: boolean;
}

export interface MediaStatus {
  id: number | null;
  isWatched: boolean;
  isWatchlist: boolean;
}
