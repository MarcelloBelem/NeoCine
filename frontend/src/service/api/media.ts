import { MediaStatus, UpdateStatusMedia } from "@/types/api/media";
import { fetchAuth } from "./fetchAuth";

type GetStatusMediaResult =
  | { success: true; data: MediaStatus }
  | { success: false; message: string };

export async function updateStatusMedia(mediaData: UpdateStatusMedia) {
  try {
    const genreIds = Array.isArray(mediaData.genres)
      ? mediaData.genres.map((g: any) => (typeof g === "object" ? g.id : g))
      : [];

    const body = JSON.stringify({
      type: mediaData.type,
      title: mediaData.title,
      genres: genreIds,
      vote_average: mediaData.vote_average,
      poster_path: mediaData.poster_path,
      duration: mediaData.duration,
      isWatched: mediaData.isWatched,
      inWatchlist: mediaData.inWatchlist,
    });

    const res = await fetchAuth(`media/${mediaData.id}`, {
      method: "PATCH",
      body,
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Erro desconhecido" };
    }

    return { success: true, data };
  } catch {
    return { success: false, message: "Falha na conexão com o servidor" };
  }
}

export async function getStatusMedia(
  mediaId: number,
): Promise<GetStatusMediaResult> {
  try {
    const res = await fetchAuth(`media/${mediaId}/status`);
    const data: MediaStatus = await res.json();

    if (!res.ok) {
      return { success: false, message: "Erro ao buscar status da mídia" };
    }

    return { success: true, data };
  } catch {
    return { success: false, message: "Falha na conexão com o servidor" };
  }
}
