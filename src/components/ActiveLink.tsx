"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Estendemos as props do Link padrão do Next.js
interface ActiveLinkProps extends LinkProps {
  children: ReactNode;
  className?: string; // Classe padrão (inativo)
  activeClassName: string; // Classe que será adicionada SÓ quando ativo
}

export function ActiveLink({
  children,
  className = "",
  activeClassName,
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname();

  const isActive =
    props.href === "/"
      ? pathname === "/"
      : pathname === props.href || pathname.startsWith(`${props.href}/`);

  return (
    <Link
      {...props}
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </Link>
  );
}
