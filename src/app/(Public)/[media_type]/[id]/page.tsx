import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { MediaHero } from "@/components/mediaHero/MediaHero";

// Definição dos tipos
interface MediaPageProps {
  params: Promise<{
    media_type: string;
    id: string;
  }>;
}
async function MediaContent({
  paramsPromise,
}: {
  paramsPromise: Promise<{ media_type: string; id: string }>;
}) {
  // O await acontece aqui, seguro dentro do Suspense
  const { id, media_type } = await paramsPromise;

  const mediaRef = {
    id: Number(id),
    media_type: media_type as "movie" | "tv",
  };

  return <MediaHero mediaRef={mediaRef} />;
}

export default function MediaPage({ params }: MediaPageProps) {
  return (
    <div className="">
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Loader2 className="text-primary h-10 w-10 animate-spin" />
          </div>
        }
      >
        {/* Passamos a promise para ser resolvida lá dentro */}
        <MediaContent paramsPromise={params} />
      </Suspense>
    </div>
  );
}
