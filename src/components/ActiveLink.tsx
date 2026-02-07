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

  // Verifica se a URL atual corresponde ao link
  const isActive = pathname === props.href.toString();

  return (
    <Link
      {...props}
      // Combina a classe padrão com a ativa (se for o caso)
      className={`${className} ${isActive ? activeClassName : ""}`}
    >
      {children}
    </Link>
  );
}
