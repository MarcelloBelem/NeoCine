import { User2, Search } from "lucide-react";
import ListItemNavBar from "./ListItemNavBar";

//Components

export function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex w-full justify-between items-center p-6 md:px-20 md:py-10 ">
        <h1
          className="font-orbitron text-2xl font-medium md:text-4xl 
        "
        >
          <strong className="text-primary">Neo</strong>Cine
        </h1>
        <nav className="hidden md:block">
          <ul className="flex justify-between gap-10 text-base font-medium font-inter opacity-80">
            <ListItemNavBar link="minhaLista">Minha Lista</ListItemNavBar>
            <ListItemNavBar link="assistidos">Assistidos</ListItemNavBar>
            <ListItemNavBar link="explorar">Explorar</ListItemNavBar>
          </ul>
        </nav>
        <div className="flex items-center gap-10 ">
          <div className="hidden bg-details/50 py-3 px-5 rounded-full gap-5 max-w-3xs lg:flex">
            <input type="text" className="w-full outline-0 " />
            <button className="hover:text-primary transition-colors duration-300">
              <Search className="size-6" />
            </button>
          </div>
          <div className="flex gap-8 items-center">
            <button className="md:hidden  active:text-primary transition-colors duration-300 ">
              <Search className="size-6" />
            </button>
            <div className="bg-linear-to-tr from-primary rounded-full p-0.5">
              <div className="bg-details p-3 rounded-full hover:text-primary transition-colors duration-300">
                <User2 className="size-5" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
