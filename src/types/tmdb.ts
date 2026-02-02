export interface TMDBBaseMedia {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  media_type?: "movie" | "tv";
}

export interface TMDBMovie extends TMDBBaseMedia {
  title: string;
  release_date: string;
  name?: never; // Garante que filme não tem 'name'
  first_air_date?: never;
}

export interface TMDBTV extends TMDBBaseMedia {
  name: string;
  first_air_date: string;
  title?: never; // Garante que série não tem 'title'
  release_date?: never;
}

export type TMDBContent = TMDBMovie | TMDBTV;
