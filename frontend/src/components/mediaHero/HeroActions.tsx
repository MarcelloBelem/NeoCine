"use client";

import { Eye, EyeClosed, Bookmark } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroActionsProps } from "./MediaHero.types";

export function HeroActions({
  isAuthenticated,
  updateStatusAction,
  initialStatus,
}: HeroActionsProps) {
  const router = useRouter();
  const [isWatched, setIsWatched] = useState(initialStatus.isWatched);
  const [inWatchlist, setInWatchlist] = useState(initialStatus.isWatchlist);

  const handleToggleWatched = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const nextValue = !isWatched;
    setIsWatched(nextValue);
    await updateStatusAction({ isWatched: nextValue });
  };

  const handleToggleWatchlist = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const nextValue = !inWatchlist;
    setInWatchlist(nextValue);
    await updateStatusAction({ inWatchlist: nextValue });
  };

  return (
    <div className="mt-6 flex w-full max-w-sm flex-col gap-4 md:flex-row">
      {/* Botão Já Assisti - Estilo Outline/Escuro */}
      <button
        onClick={handleToggleWatched}
        className={`bg-bg-dark/50 flex w-full items-center justify-center gap-2 rounded-lg border py-3 font-medium backdrop-blur-sm transition-colors hover:bg-white/10 active:bg-white/10 ${isWatched ? "border-gray-600" : "border-primary"} `}
      >
        {isWatched ? (
          <>
            <Eye className="text-primary size-5" />
            Assistido
          </>
        ) : (
          <>
            <EyeClosed className="size-5" />
            Marcar visto
          </>
        )}
      </button>

      {/* Botão Adicionar à Lista - Estilo Sólido Branco */}
      <button
        onClick={handleToggleWatchlist}
        className={`flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-bold text-black transition-colors hover:bg-gray-200`}
      >
        {inWatchlist ? (
          <>
            <Bookmark className="size-5 fill-yellow-500 text-yellow-500" />
            Na lista
          </>
        ) : (
          <>
            <Bookmark className="size-5" />
            Adicionar à lista
          </>
        )}
      </button>
    </div>
  );
}
