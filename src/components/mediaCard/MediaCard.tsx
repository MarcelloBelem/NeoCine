import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

//Components
import { CardActions } from "./CardActions";
import getGenresByIds from "@/lib/tmdb/getGenresByIds";
import getImageUrl from "@/lib/tmdb/getImageUrl";

interface MediaCardProps {
  visto: boolean;
  title: string;
  vote_average: number;
  date: string;
  genre_ids: number[];
  media_type: "movie" | "tv";
  poster_path: string;
}

export function MediaCard({
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

  const imageUrl = getImageUrl(poster_path, "w500");

  return (
    <Link
      href={`/`}
      className={`group active:bg-primary/50 hover:bg-primary/30 relative flex h-60 w-full max-w-44 flex-col justify-between overflow-hidden rounded-2xl border p-2.5 transition-colors duration-500 md:h-100 md:max-w-xs md:p-5 ${vistoSalvo ? "border-primary" : "border-gray-600"} `}
    >
      <div className="absolute inset-0 -z-20 h-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
          priority
        />
      </div>

      <div className="from-bg-dark hover absolute inset-0 -z-10 bg-linear-to-t" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="bg-primary/70 rounded-2xl px-3 py-1 text-sm">
          {date.split("-")[0]}
        </div>

        <div className="bg-details/70 flex items-center gap-2 rounded-2xl border border-gray-600/70 px-3 py-1 backdrop-blur-md">
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm">{Math.floor(vote_average * 10) / 10}</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-2.5">
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <div className="flex gap-4">
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
