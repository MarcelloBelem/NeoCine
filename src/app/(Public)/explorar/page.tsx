import { Search, ArrowUpIcon } from "lucide-react";

export default function Explore() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      {/* Ícone ilustrativo (Lupa ou Filme) */}
      <div className="group relative mb-8">
        <div className="bg-primary/40 absolute -inset-2 rounded-full blur-lg transition-all duration-500 group-hover:blur-2xl" />
        <div className="bg-details border-detailsLight relative flex h-24 w-24 items-center justify-center rounded-full border-2 shadow-2xl">
          <Search className="text-primary h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>

      {/* O H1 que você pediu */}
      <h1 className="mb-2 text-2xl font-bold text-white md:text-4xl">
        O que vamos procurar hoje?
      </h1>

      <p className="mb-8 hidden max-w-md text-lg text-gray-400 md:block">
        Digite o nome de um filme ou série na barra acima para começar sua
        busca.
      </p>
      <p className="mb-8 max-w-md text-base text-gray-400 md:hidden">
        Clique na lupa acima para começar sua busca.
      </p>
    </div>
  );
}
