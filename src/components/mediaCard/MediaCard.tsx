import { Star } from "lucide-react";

export function MediaCard() {
  return (
    <div className="bg-bg-dark flex flex-col h-[400] max-w-xs w-full rounded-2xl p-5 justify-between border border-gray-600">
      <div className="flex justify-between">
        <div>2021</div>
        <div className="flex gap-2 items-center">
          <Star className="size-4" />
          <span>9.8</span>
        </div>
      </div>
      <div>
        <h1>Titulo</h1>
        <div>Salva | Ver</div>
      </div>
    </div>
  );
}
