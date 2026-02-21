"use client";

import { Eye, EyeClosed, Bookmark } from "lucide-react";
import { useState } from "react";

export function HeroActions() {
  const [click, setClick] = useState(false);

  return (
    <div className="mt-6 flex w-full max-w-sm flex-col gap-4 md:flex-row">
      {/* Botão Já Assisti - Estilo Outline/Escuro */}
      <button
        onClick={() => setClick(!click)}
        className={`bg-bg-dark/50 flex w-full items-center justify-center gap-2 rounded-lg border py-3 font-medium backdrop-blur-sm transition-colors hover:bg-white/10 active:bg-white/10 ${click ? "border-gray-600" : "border-primary"} `}
      >
        {click ? (
          <>
            <EyeClosed className="size-5" />
            Marcar visto
          </>
        ) : (
          <>
            <Eye className="text-primary size-5" />
            Assistido
          </>
        )}
      </button>

      {/* Botão Adicionar à Lista - Estilo Sólido Branco */}
      <button
        onClick={() => setClick(!click)}
        className={`flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-bold text-black transition-colors hover:bg-gray-200`}
      >
        {click ? (
          <>
            <Bookmark className="size-5" />
            Adicionar à lista
          </>
        ) : (
          <>
            <Bookmark className="size-5 fill-yellow-500 text-yellow-500" />
            Na lista
          </>
        )}
      </button>
    </div>
  );
}
