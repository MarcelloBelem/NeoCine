import { NextResponse, type NextRequest } from "next/server";

const authRoutes = [{ path: "/login" }, { path: "/cadastro" }];

const privateRoutes = [
  { path: "/perfil" },
  { path: "/assistidos" },
  { path: "/minhaLista" },
];

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/login";
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = "/";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get("auth_token");
  const refreshToken = request.cookies.get("refresh_token");
  const hasSession = Boolean(authToken || refreshToken);

  const isAuthRoute = authRoutes.some((route) => route.path === path);

  // Passamos route.path para o startsWith
  const isPrivateRoute = privateRoutes.some((route) =>
    path.startsWith(route.path),
  );

  // 1. Usuário LOGADO tentando acessar página de Login ou Cadastro
  if (hasSession && isAuthRoute) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_AUTHENTICATED_ROUTE, request.url),
    );
  }

  // 2. Usuário NÃO LOGADO tentando acessar uma rota Privada
  if (!hasSession && isPrivateRoute) {
    return NextResponse.redirect(
      new URL(REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE, request.url),
    );
  }

  // 3. Rota livre ou usuário autorizado (Fallback padrão)
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de solicitação, exceto:
     * 1. /api (rotas de API)
     * 2. /_next/static (arquivos estáticos)
     * 3. /_next/image (arquivos de otimização de imagem)
     * 4. /favicon.ico (ícone do navegador)
     * 5. Imagens comuns (svg, png, jpg, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
