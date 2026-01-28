"use client";

import { Eye, EyeClosed, Bookmark } from "lucide-react";
import { useState } from "react";

export function HeroActions() {
  const [click, setClick] = useState(false);

  return (
    <div className="flex flex-col gap-4 mt-6 w-full max-w-sm">
      {/* Botão Já Assisti - Estilo Outline/Escuro */}
      <button
        onClick={() => setClick(!click)}
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg border bg-bg-dark/50 backdrop-blur-sm font-medium hover:bg-white/10 transition-colors active:bg-white/10 ${click ? "border-gray-600 " : "border-primary "} `}
      >
        {click ? (
          <>
            <EyeClosed className="size-5" />
            Marcar visto
          </>
        ) : (
          <>
            <Eye className="size-5 text-primary" />
            Assistido
          </>
        )}
      </button>

      {/* Botão Adicionar à Lista - Estilo Sólido Branco */}
      <button
        onClick={() => setClick(!click)}
        className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors`}
      >
        {click ? (
          <>
            <Bookmark className="size-5" />
            Adicionar à lista
          </>
        ) : (
          <>
            <Bookmark className="size-5 text-yellow-500 fill-yellow-500" />
            Na lista
          </>
        )}
      </button>
    </div>
  );
}
