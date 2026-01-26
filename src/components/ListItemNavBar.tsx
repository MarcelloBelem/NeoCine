import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

const ListItemNavBar = ({ children, className = "" }: Props) => {
    return (
        <li
            className={`cursor-pointer hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:text-lg ${className}`}
        >
            {children}
        </li>
    );
};

export default ListItemNavBar;
