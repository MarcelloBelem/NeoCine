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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Container com Glassmorphism */}
      <nav
        className="
        flex justify-around items-center
        w-full h-20 pb-safe px-2 
        bg-bg-dark/90 backdrop-blur-xl
        border-t border-white/5
        shadow-[0_-5px_20px_rgba(0,0,0,0.5)]
      "
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                w-full h-full
                transition-all duration-300
              `}
            >
              <div
                className={`
                  flex flex-col items-center justify-center gap-1
                  w-full h-full
                  transition-all duration-300
                  ${isActive ? "text-primary" : "text-gray-500 hover:text-gray-300"}
                `}
              >
                {/* Ícone com animação e brilho se ativo */}
                <div
                  className={`
                    relative p-1 rounded-xl transition-all duration-300
                    ${isActive ? "-translate-y-1" : ""}
                  `}
                >
                  {item.icon}

                  {/* Ponto de luz Neon atrás do ícone ativo */}
                  {isActive && (
                    <span className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
                  )}
                </div>

                {/* Texto (Opcional - em muitos apps modernos é só ícone ou texto bem pequeno) */}
                <span
                  className={`text-[10px] font-medium ${isActive ? "opacity-100" : "opacity-0 scale-0"} transition-all duration-300`}
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
