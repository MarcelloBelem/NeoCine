"use client";

import { Eye, EyeClosed, Bookmark } from "lucide-react";
import { useState } from "react";

export function CardActions() {
  const [click, setClick] = useState(false);

  return (
    <div className="flex gap-2">
      {/* Botão Já Assisti - Estilo Outline/Escuro */}
      <button onClick={() => setClick(!click)}>
        {click ? (
          <>
            <EyeClosed className="size-5" />
          </>
        ) : (
          <>
            <Eye className="size-5 text-primary" />
          </>
        )}
      </button>

      {/* Botão Adicionar à Lista - Estilo Sólido Branco */}
      <button onClick={() => setClick(!click)}>
        {click ? (
          <>
            <Bookmark className="size-5" />
          </>
        ) : (
          <>
            <Bookmark className="size-5 text-yellow-500 fill-yellow-500" />
          </>
        )}
      </button>
    </div>
  );
}
