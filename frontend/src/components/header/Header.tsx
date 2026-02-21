"use client";

import { User2, Search } from "lucide-react";
import { ListItemNavBar } from "./ListItemNavBar";
import { Suspense, useEffect, useState, KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

//Components
import { MobileSearchModal } from "./MobileSearchModal";

export function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [desktopQuery, setDesktopQuery] = useState<string>("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    if (desktopQuery?.trim()) {
      router.push(`/explorar/${encodeURIComponent(desktopQuery)}`);
      setDesktopQuery("");
    }
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 flex w-full items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-bg-dark/50 px-6 py-4 shadow-lg backdrop-blur-md md:px-20"
            : "bg-transparent p-6 md:px-20 md:py-10"
        }`}
      >
        <Link
          href="/"
          className="font-orbitron text-2xl font-medium md:text-4xl"
        >
          <strong className="text-primary">Neo</strong>Cine
        </Link>
        <nav className="hidden md:block">
          <Suspense fallback={null}>
            <ul className="font-inter flex justify-between gap-10 text-base font-medium opacity-80">
              <ListItemNavBar link="explorar">Explorar</ListItemNavBar>
              <ListItemNavBar link="minhaLista">Minha Lista</ListItemNavBar>
              <ListItemNavBar link="assistidos">Assistidos</ListItemNavBar>
            </ul>
          </Suspense>
        </nav>
        <div className="flex items-center gap-10">
          <div className="group relative hidden items-center lg:flex">
            <input
              type="text"
              placeholder="Buscar títulos..."
              value={desktopQuery}
              onChange={(e) => {
                setDesktopQuery(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              className="focus:border-primary/50 w-48 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur-sm transition-all duration-500 outline-none focus:w-64 focus:bg-white/10"
            />
            <button
              onClick={handleSearch}
              className="absolute right-4 cursor-pointer"
            >
              <Search className="group-focus-within:text-primary pointer-events-none size-4 text-white/40 transition-colors" />
            </button>
          </div>
          <div className="flex items-center gap-8">
            <button
              onClick={() => setIsMobileSearchOpen(true)}
              className="active:text-primary transition-colors duration-300 md:hidden"
            >
              <Search className="size-6" />
            </button>
            <div className="from-primary rounded-full bg-linear-to-tr p-0.5 active:scale-90">
              <Link
                href="/perfil"
                className="bg-details hover:text-primary inline-flex rounded-full p-3 transition-colors duration-300"
              >
                <User2 className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <MobileSearchModal
        isOpen={isMobileSearchOpen}
        onClose={() => setIsMobileSearchOpen(false)}
      />
    </>
  );
}
