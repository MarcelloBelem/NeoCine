import Image from "next/image";
import { Star } from "lucide-react";

//Components
import { MediaHero } from "@/components/mediaHero/MediaHero";
import { MediaCard } from "@/components/mediaCard/MediaCard";

export default function Home() {
  return (
    <div className="flex flex-col gap-24">
      <MediaHero />
      <div className="flex flex-col items-center justify-center gap-10 px-6">
        <h1 className="font-orbitron text-3xl">Populares</h1>
        <MediaCard visto={false} />
        <MediaCard visto={true} />
        <MediaCard visto={false} />
      </div>
    </div>
  );
}
