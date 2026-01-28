import Image from "next/image";
import { Star } from "lucide-react";

//Components
import { MediaHero } from "@/components/mediaHero/MediaHero";
import { MediaCard } from "@/components/mediaCard/MediaCard";

export default function Home() {
  return (
    <div className="">
      <MediaHero />
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <h1 className="font-orbitron text-3xl">Populares</h1>
        <MediaCard />
      </div>
    </div>
  );
}
