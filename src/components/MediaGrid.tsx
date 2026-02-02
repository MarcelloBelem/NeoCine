import { MediaCard } from "@/components/mediaCard/MediaCard";
import { TMDBBaseMedia, TMDBContent } from "@/types/tmdb";

interface MediaGridProps {
  title: string;
  movies: TMDBContent[] | null;
  error?: string | null;
}

export async function MediaGrid({ title, movies, error }: MediaGridProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      {title && <h1 className="font-orbitron text-3xl">{title}</h1>}

      {!movies || error ? (
        <div className="rounded-lg p-10 text-center">
          <p className="font-bold text-red-500">
            Não foi possível carregar os filmes {title?.toLowerCase()}.
          </p>
          <span className="text-sm text-gray-400">
            Tente atualizar a página em instantes.
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-between gap-5">
          {movies.map((movie) => (
            <MediaCard
              key={movie.id}
              title={movie.title || movie.name || "Sem título"}
              visto={false}
              vote_average={movie.vote_average}
              date={movie.release_date || movie.first_air_date || ""}
              genre_ids={movie.genre_ids || []}
              media_type={(movie.media_type || "movie") as "movie" | "tv"}
              poster_path={movie.poster_path || ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}
