import { MediaStatus, UpdateStatusMedia } from "@/types/api/media";
import { fetchAuth } from "./fetchAuth";

type GetStatusMediaResult =
  | { success: true; data: MediaStatus }
  | { success: false; message: string };

export async function updateStatusMedia(mediaData: UpdateStatusMedia) {
  try {
    console.log("Updating media status with data:", mediaData);
    const res = await fetchAuth(`media/${mediaData.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        type: mediaData.type,
        duration: mediaData.duration,
        isWatched: mediaData.isWatched,
        inWatchlist: mediaData.inWatchlist,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Erro desconhecido" };
    }

    return { success: true, data };
  } catch (error) {
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
  } catch (error) {
    return { success: false, message: "Falha na conexão com o servidor" };
  }
}
