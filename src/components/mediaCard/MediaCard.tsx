import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

//Components
import { CardActions } from "./CardActions";
import getGenresByIds from "@/lib/tmdb/getGenresByIds";
import getImageUrl from "@/lib/tmdb/getImageUrl";

//Types
import { MediaCardProps } from "./MediaCard.types";

export function MediaCard({
  id,
  visto,
  title,
  vote_average,
  date,
  genre_ids,
  media_type,
  poster_path,
}: MediaCardProps) {
  const vistoSalvo = visto;

  const genres =
    genre_ids && media_type ? getGenresByIds(genre_ids, media_type) : [];

  const imageUrl = getImageUrl(poster_path, "w342");

  return (
    <Link
      href={`/${media_type}/${id}`}
      className={`group active:bg-primary/50 hover:bg-primary/30 relative flex h-80 w-full flex-col justify-between overflow-hidden rounded-2xl border p-2.5 transition-colors duration-500 md:h-100 md:max-w-xs md:p-5 ${vistoSalvo ? "border-primary" : "border-gray-600"} `}
    >
      <div className="absolute inset-0 -z-20 h-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
          quality={60}
        />
      </div>

      <div className="from-bg-dark hover absolute inset-0 -z-10 bg-linear-to-t" />

      <div className="relative z-10 flex items-center justify-between">
        {/* <div className="bg-primary/70 rounded-2xl px-3 py-1 text-sm">
          {date.split("-")[0]}
        </div> */}

        <div className="bg-primary/70 flex items-center gap-2 rounded-2xl border border-gray-600/70 px-3 py-1 text-sm backdrop-blur-md">
          {media_type === "movie" ? "Filme" : "Serie"}
        </div>

        <div className="bg-details/70 flex items-center gap-2 rounded-2xl border border-gray-600/70 px-3 py-1 backdrop-blur-md">
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm">
            {(Math.floor(vote_average * 10) / 10).toFixed(1)}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-2.5">
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <div className="flex flex-col items-start justify-center gap-1">
            {genres.slice(0, 2).map(
              (
                genreName, // Pegamos apenas os 2 primeiros para não poluir
              ) => (
                <span
                  key={genreName}
                  className="rounded bg-white/10 px-2 py-1 backdrop-blur-md"
                >
                  {genreName}
                </span>
              ),
            )}
          </div>
        </div>
        <div className="flex items-end justify-between">
          <h1 className="font-orbitron line-clamp-2 text-xs font-medium tracking-wider md:text-base">
            {title}
          </h1>
          <div className="hidden">
            <CardActions />
          </div>
        </div>
      </div>
    </Link>
  );
}
