import Image from "next/image";
import { Star } from "lucide-react";
import { HeroActions } from "./HeroActions";

export function MediaHero() {
  return (
    <div className="relative px-6 p-40">
      {/* Capa do filme */}
      <div className="absolute inset-0 -z-20 h-full mask-b-to-transparent ">
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
        <div className="flex items-center gap-4 text-gray-300 text-sm md:text-base font-medium">
          <div className="flex items-center gap-1 text-primary">
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
          <span className="uppercase text-gray-400 font-bold tracking-wider">
            Gênero
          </span>
          <div className="flex gap-4">
            <span className="bg-white/10 px-2 py-1 rounded backdrop-blur-md">
              Suspense
            </span>
            <span className="bg-white/10 px-2 py-1 rounded backdrop-blur-md">
              Ação
            </span>
          </div>
        </div>

        <h1 className="font-bebas text-5xl tracking-wide uppercase drop-shadow-lg">
          Fallout
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed">
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
