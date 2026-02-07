import { ReactNode } from "react";
import { ActiveLink } from "../ActiveLink";

export const ListItemNavBar = ({
  children,
  link,
}: {
  children: ReactNode;
  link: string;
}) => {
  const href = `/${link}`;

  return (
    <li className="group relative list-none">
      <ActiveLink
        href={href}
        className="hover:text-primary transition-colors duration-300"
        activeClassName="text-primary font-bold shadow-primary/50 drop-shadow-md"
      >
        {children}
      </ActiveLink>
    </li>
  );
};
