import { MediaCard } from "@/components/mediaCard/MediaCard";

export function MediaGrid({ title, movies }) {
  console.log(movies);
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      {title && <h1 className="font-orbitron text-3xl">{title}</h1>}

      {!movies ? (
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
              title={movie.title || movie.name}
              visto={false}
              vote_average={movie.vote_average}
              date={movie.release_date || movie.first_air_date}
              genre_ids={movie.genre_ids}
              media_type={movie.media_type}
              poster_path={movie.poster_path}
            />
          ))}
        </div>
      )}
    </div>
  );
}
