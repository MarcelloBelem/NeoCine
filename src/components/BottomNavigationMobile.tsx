"use client";

import { Compass, ListVideo, PlayCircle, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNavigationMobile() {
  const pathname = usePathname(); // Pega a rota atual (ex: /, /explorar)

  const menuItems = [
    {
      name: "Início",
      href: "/",
      icon: <Home size={24} />,
    },
    {
      name: "Explorar",
      href: "/explorar",
      icon: <Compass size={24} />,
    },
    {
      name: "Minha Lista",
      href: "/minhaLista",
      icon: <ListVideo size={24} />,
    },
    {
      name: "Assistidos",
      href: "/assistidos",
      icon: <PlayCircle size={24} />,
    },
  ];

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
      {/* Container com Glassmorphism */}
      <nav className="pb-safe bg-bg-dark/90 flex h-20 w-full items-center justify-around border-t border-white/5 px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`h-full w-full transition-all duration-300 active:scale-90`}
            >
              <div
                className={`flex h-full w-full flex-col items-center justify-center gap-1 transition-all duration-300 ${isActive ? "text-primary" : "text-gray-500 hover:text-gray-300"} `}
              >
                {/* Ícone com animação e brilho se ativo */}
                <div
                  className={`relative rounded-xl p-1 transition-all duration-300 ${isActive ? "-translate-y-1" : ""} `}
                >
                  {item.icon}

                  {/* Ponto de luz Neon atrás do ícone ativo */}
                  {isActive && (
                    <span className="bg-primary/20 absolute inset-0 rounded-full blur-lg" />
                  )}
                </div>

                {/* Texto (Opcional - em muitos apps modernos é só ícone ou texto bem pequeno) */}
                <span
                  className={`text-[10px] font-medium ${isActive ? "opacity-100" : "scale-0 opacity-0"} transition-all duration-300`}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
