import { MediaCard } from "@/components/mediaCard/MediaCard";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex flex-col gap-24">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="font-orbitron text-3xl">Assistidos</h1>
        <div className="flex flex-wrap justify-center gap-5">
          <MediaCard visto={false} />
          <MediaCard visto={true} />
          <MediaCard visto={false} />
          <MediaCard visto={false} />
          <MediaCard visto={false} />
          <MediaCard visto={false} />
          <MediaCard visto={false} />
          <MediaCard visto={false} />
        </div>
      </div>
    </div>
  );
}
