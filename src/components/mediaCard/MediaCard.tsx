import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

//Components
import { CardActions } from "./CardActions";

interface MediaCardProps {
  visto: boolean;
}

export function MediaCard({ visto }: MediaCardProps) {
  const vistoSalvo = visto;

  return (
    <Link
      href={`/`}
      className={`group active:bg-primary/50 hover:bg-primary/30 relative flex h-100 w-full max-w-xs flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-colors duration-500 ${vistoSalvo ? "border-primary" : "border-gray-600"} `}
    >
      <div className="absolute inset-0 -z-20 h-full">
        <Image
          src="/fallout-bg.jpg"
          alt="Fallout Poster"
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
          priority
        />
      </div>

      <div className="from-bg-dark hover absolute inset-0 -z-10 bg-linear-to-t" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="bg-primary/70 rounded-2xl px-3 py-1 text-sm">2021</div>

        <div className="bg-details/70 flex items-center gap-2 rounded-2xl border border-gray-600/70 px-3 py-1 backdrop-blur-md">
          <Star className="size-4 fill-yellow-500 text-yellow-500" />
          <span className="text-sm">9.8</span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-2.5">
        <div className="flex items-center gap-4 text-xs md:text-sm">
          <div className="flex gap-4">
            <span className="rounded bg-white/10 px-2 py-1 backdrop-blur-md">
              Suspense
            </span>
            <span className="rounded bg-white/10 px-2 py-1 backdrop-blur-md">
              Ação
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <h1 className="font-orbitron line-clamp-2 font-medium tracking-wider">
            Missão Impossivel: Imposivel so agora corram!
          </h1>
          <CardActions />
        </div>
      </div>
    </Link>
  );
}
