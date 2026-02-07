export interface TMDBBaseMedia {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
  original_language: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  media_type?: "movie" | "tv" | "person" | string;
}

export interface TMDBMovie extends TMDBBaseMedia {
  media_type: "movie";
  title: string;
  release_date: string;
}

export interface TMDBTV extends TMDBBaseMedia {
  media_type: "tv";
  name: string;
  first_air_date: string;
}

export interface TMDBPerson extends TMDBBaseMedia {
  media_type: "person";
  name: string;
  gender: number;
}

// Detalhes geralmente trazem generos como array de objetos, não IDs
export interface TMDBMovieDetails extends TMDBMovie {
  genres: { id: number; name: string }[];
  runtime?: number;
}

export interface TMDBTVDetails extends TMDBTV {
  genres: { id: number; name: string }[];
  number_of_episodes?: number;
  number_of_seasons?: number;
}

export type TMDBContent = TMDBMovie | TMDBTV | TMDBPerson;
export type TMDBContentDetails = TMDBMovieDetails | TMDBTVDetails;
