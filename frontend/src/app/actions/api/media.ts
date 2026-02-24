"use server";

import { getStatusMedia, updateStatusMedia } from "@/service/api/media";
import { UpdateStatusMedia } from "@/types/api/media";

export async function updateStatusMediaAction(updateData: UpdateStatusMedia) {
  const res = await updateStatusMedia(updateData);

  return res;
}

export async function getStatusMediaAction(mediaId: number) {
  const res = await getStatusMedia(mediaId);

  return res;
}
