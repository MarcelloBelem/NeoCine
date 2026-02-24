"use server";
import { editProfile, getProfile, getUserMedia } from "@/service/api/users";
import { editProfileData, getUserMediaRoute } from "@/types/api/users";

export async function getProfileAction() {
  const res = await getProfile();

  return res;
}

export async function updateProfileAction(editData: editProfileData) {
  const res = await editProfile(editData);

  return res;
}

export async function getUserMediaAction(route: getUserMediaRoute) {
  console.log("Rote recebido na action:", route);
  const res = await getUserMedia(route);

  return res;
}
