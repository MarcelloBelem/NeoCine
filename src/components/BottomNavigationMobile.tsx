import { Compass, ListVideo, PlayCircle, Home } from "lucide-react";
import { ActiveLink } from "./ActiveLink";
import { Suspense } from "react";

export function BottomNavigationMobile() {
  const menuItems = [
    { name: "Início", href: "/", icon: <Home size={24} /> },
    { name: "Explorar", href: "/explorar", icon: <Compass size={24} /> },
    { name: "Minha Lista", href: "/minhaLista", icon: <ListVideo size={24} /> },
    { name: "Assistidos", href: "/assistidos", icon: <PlayCircle size={24} /> },
  ];

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
      <nav className="pb-safe bg-bg-dark/90 flex h-20 w-full items-center justify-around border-t border-white/5 px-2 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <Suspense fallback={null}>
          {menuItems.map((item) => (
            <ActiveLink
              key={item.name}
              href={item.href}
              className="group h-full w-full transition-all duration-300 active:scale-90"
              activeClassName="text-primary"
            >
              <div className="group-[.text-primary]:text-primary flex h-full w-full flex-col items-center justify-center gap-1 text-gray-500 transition-all duration-300 hover:text-gray-300">
                <div className="relative rounded-xl p-1 transition-all duration-300 group-[.text-primary]:-translate-y-1">
                  {item.icon}
                  <span className="bg-primary/20 absolute inset-0 hidden rounded-full blur-lg group-[.text-primary]:block" />
                </div>
                <span className="scale-0 text-[10px] font-medium opacity-0 transition-all duration-300 group-[.text-primary]:scale-100 group-[.text-primary]:opacity-100">
                  {item.name}
                </span>
              </div>
            </ActiveLink>
          ))}
        </Suspense>
      </nav>
    </div>
  );
}
