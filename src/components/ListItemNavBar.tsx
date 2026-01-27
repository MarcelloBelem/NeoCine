import { ReactNode } from "react";
import Link from "next/link";

type Props = {
  children: ReactNode;
  className?: string;
  link: string;
};

const ListItemNavBar = ({ children, className = "", link }: Props) => {
  return (
    <Link href={link}>
      <li
        className={`cursor-pointer hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:text-lg ${className}`}
      >
        {children}
      </li>
    </Link>
  );
};

export default ListItemNavBar;
