export default function getImageUrl(
  path: string | null,
  size: string = "w500",
) {
  // Se não tiver imagem (path for null), retorna uma imagem padrão do seu projeto
  if (!path) return "/placeholder-movie.jpg";

  return `https://image.tmdb.org/t/p/${size}${path}`;
}
