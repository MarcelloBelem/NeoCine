import Image from "next/image";
import { Star } from "lucide-react";
import getImageUrl from "@/service/tmdb/getImageUrl";
import { getMediaDetails } from "@/service/tmdb/tmdb";

//Components
import { HeroActions } from "./HeroActions";

//Types
import { MediaHeroProps, genres } from "./MediaHero.types";
import { TMDBMovieDetails, TMDBTVDetails } from "@/types/tmdb";
import {
  getStatusMediaAction,
  updateStatusMediaAction,
} from "@/app/actions/api/media";
import { cookies } from "next/headers";

export async function MediaHero({ mediaRef }: MediaHeroProps) {
  const cookieStore = await cookies();
  const isAuthenticated = Boolean(cookieStore.get("auth_token")?.value);

  const res = await getMediaDetails(mediaRef.id, mediaRef.media_type);

  if (!res) {
    return null; // Se não carregou, não exibe nada (ou retorne um esqueleto/erro)
  }

  const media = res.data;

  const mediaType = res.mediaType;

  const mediaStatusRes = await getStatusMediaAction(mediaRef.id);
  const mediaStatus =
    mediaStatusRes.success && "data" in mediaStatusRes
      ? mediaStatusRes.data
      : { id: null, isWatched: false, isWatchlist: false };

  const imageBackdropUrl = getImageUrl(media.backdrop_path, "original");
  const imagePosterUrl = getImageUrl(media.poster_path, "original");

  const isMovie =
    mediaType === "movie"
      ? {
          title: (media as TMDBMovieDetails).title,
          date: (media as TMDBMovieDetails).release_date,
          length: (media as TMDBMovieDetails).runtime,
          lengthUnit: "min",
        }
      : {
          title: (media as TMDBTVDetails).name,
          date: (media as TMDBTVDetails).first_air_date,
          length: (media as TMDBTVDetails).number_of_seasons,
          lengthUnit: "Temporadas",
        };

  const createUpdateStatusAction = async (updateData: {
    isWatched?: boolean;
    inWatchlist?: boolean;
  }) => {
    "use server";
    const data = {
      id: media.id,
      type: mediaType,
      title: isMovie.title,
      genres: media.genres,
      vote_average: media.vote_average,
      poster_path: media.poster_path,
      duration: isMovie.length,
      ...updateData,
    };
    return updateStatusMediaAction(data);
  };

  return (
    <div className="pt-16">
      {/* Capa do filme */}
      <div className="absolute inset-0 -z-20 h-full max-h-screen mask-b-to-transparent">
        {/* Desktop */}
        <Image
          src={imageBackdropUrl}
          alt={isMovie.title}
          fill
          className="hidden object-cover object-top opacity-60 md:block"
          priority
          quality={90}
        />

        {/* Mobile */}
        <Image
          src={imagePosterUrl}
          alt={isMovie.title}
          fill
          className="block object-cover object-top opacity-60 md:hidden"
          priority
          quality={90}
        />

        {/* <div className="bg-bg-dark/60 absolute inset-0" /> */}
      </div>

      <div className="flex flex-col justify-center gap-5 md:w-[50vw]">
        {/* Metadados */}
        <div className="flex items-center gap-4 text-sm font-medium text-gray-300 md:text-base">
          <div className="flex items-center gap-2">
            <Star className="size-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm">
              {(Math.floor(media.vote_average * 10) / 10).toFixed(1)}
            </span>
          </div>
          <span className="h-4 w-px bg-gray-500/50" />
          <span>
            <span>{isMovie.date ? isMovie.date.split("-")[0] : "S/D"}</span>
          </span>
          <span className="h-4 w-px bg-gray-500/50" />
          <span className="flex items-end justify-center gap-1">
            <div>{isMovie.length}</div>
            <div>{isMovie.lengthUnit}</div>
          </span>
        </div>

        {/* Gênero */}
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <span className="font-bold tracking-wider text-gray-400 uppercase">
            Gênero
          </span>
          <div className="flex gap-4">
            {media.genres.slice(0, 2).map((genreName: genres) => (
              <span
                className="rounded bg-white/10 px-2 py-1 backdrop-blur-md"
                key={genreName.id}
              >
                {genreName.name}
              </span>
            ))}
          </div>
        </div>

        <h1 className="font-bebas text-5xl tracking-wide uppercase drop-shadow-lg">
          {isMovie.title}
        </h1>
        <p className="text-sm leading-relaxed text-gray-300">
          {media.overview}
        </p>

        <HeroActions
          isAuthenticated={isAuthenticated}
          updateStatusAction={createUpdateStatusAction}
          initialStatus={{
            isWatched: mediaStatus.isWatched,
            isWatchlist: mediaStatus.isWatchlist,
          }}
        />
      </div>
    </div>
  );
}
