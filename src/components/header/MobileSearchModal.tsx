"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSearchModal({ isOpen, onClose }: MobileSearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  if (!isOpen) return null;

  const handleSearch = () => {
    if (query?.trim()) {
      router.push(`/explorar/${encodeURIComponent(query)}`);
      setQuery("");
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-bg-dark/95 animate-in fade-in fixed inset-0 z-50 flex flex-col p-6 backdrop-blur-xl duration-200">
      <div className="flex items-center justify-end">
        <button
          onClick={onClose}
          className="hover:text-primary p-2 text-white/70 transition-colors"
        >
          <X className="size-8" />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center pt-20">
        <div className="relative w-full">
          <input
            autoFocus
            type="text"
            placeholder="O que você procura?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="focus:border-primary w-full border-b border-white/20 bg-transparent py-4 text-2xl font-light text-white transition-colors outline-none placeholder:text-white/30"
          />
          <button
            onClick={handleSearch}
            className="text-primary absolute top-4 right-0"
          >
            <Search className="size-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
