import Image from "next/image";
import { Star } from "lucide-react";
import { HeroActions } from "./HeroActions";

export function MediaHero() {
  return (
    <div className="relative px-6 pt-40">
      {/* Capa do filme */}
      <div className="absolute inset-0 -z-20 h-full mask-b-to-transparent">
        <Image
          src="/fallout-bg.jpg"
          alt="Fallout Poster"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="flex flex-col gap-5">
        {/* Metadados */}
        <div className="flex items-center gap-4 text-sm font-medium text-gray-300 md:text-base">
          <div className="text-primary flex items-center gap-1">
            <Star className="fill-primary text-primary size-4" />
            <span>9.9</span>
          </div>
          <span className="h-4 w-px bg-gray-500/50" />
          <span>2025</span>
          <span className="h-4 w-px bg-gray-500/50" />
          <span>112min</span>
        </div>

        {/* Gênero */}
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <span className="font-bold tracking-wider text-gray-400 uppercase">
            Gênero
          </span>
          <div className="flex gap-4">
            <span className="rounded bg-white/10 px-2 py-1 backdrop-blur-md">
              Suspense
            </span>
            <span className="rounded bg-white/10 px-2 py-1 backdrop-blur-md">
              Ação
            </span>
          </div>
        </div>

        <h1 className="font-bebas text-5xl tracking-wide uppercase drop-shadow-lg">
          Fallout
        </h1>
        <p className="text-sm leading-relaxed text-gray-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse
          pariatur at quaerat debitis tenetur! Accusamus repellendus magnam
          saepe doloremque perspiciatis corporis debitis rerum beatae, pariatur
          laborum fugit molestiae earum consequatur.
        </p>

        <HeroActions />
      </div>
    </div>
  );
}
