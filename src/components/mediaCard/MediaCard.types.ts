export interface MediaCardProps {
  id: number;
  visto: boolean;
  title: string;
  vote_average: number;
  date: string;
  genre_ids: number[];
  media_type: "movie" | "tv";
  poster_path: string;
}
