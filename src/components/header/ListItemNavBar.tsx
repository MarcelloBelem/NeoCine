import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Para saber qual página está ativa

export const ListItemNavBar = ({
  children,
  link,
}: {
  children: ReactNode;
  link: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === `/${link}`;

  return (
    <li className="group relative list-none">
      <Link
        href={`/${link}`}
        className={`flex flex-col items-center text-sm font-semibold transition-all duration-300 ${isActive ? "text-primary" : "text-white/70 group-hover:text-white"}`}
      >
        {children}

        <span
          className={`bg-primary absolute -bottom-1 h-[2px] transition-all duration-300 ${isActive ? "w-full" : "group-hover:width-full w-0"} `}
        />

        <span className="bg-primary/0 group-hover:bg-primary/5 absolute -inset-x-2 -inset-y-1 -z-10 rounded-md transition-all" />
      </Link>
    </li>
  );
};
