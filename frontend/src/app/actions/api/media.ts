"use server";

import { getStatusMedia, updateStatusMedia } from "@/service/api/media";
import { UpdateStatusMedia } from "@/types/api/media";

export async function updateStatusMediaAction(updateData: UpdateStatusMedia) {
  try {
    return await updateStatusMedia(updateData);
  } catch {
    return { success: false, message: "Erro ao atualizar status" };
  }
}

export async function getStatusMediaAction(mediaId: number) {
  const res = await getStatusMedia(mediaId);

  return res;
}
