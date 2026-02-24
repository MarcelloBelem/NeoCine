export interface MediaHeroProps {
  mediaRef: { id: number; media_type: "movie" | "tv" };
}

export interface UpdateStatusPayload {
  isWatched?: boolean;
  inWatchlist?: boolean;
}

export interface HeroActionsProps {
  isAuthenticated: boolean;
  updateStatusAction: (updateData: UpdateStatusPayload) => Promise<void>;
  initialStatus: {
    isWatched: boolean;
    isWatchlist: boolean;
  };
}

export interface genres {
  id: number;
  name: string;
}
