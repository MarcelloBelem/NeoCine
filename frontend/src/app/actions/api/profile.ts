"use server";
import { editProfile, getProfile } from "@/service/api/profile";
import { editProfileData } from "@/types/api/profile";

export async function getProfileAction() {
  const res = await getProfile();

  return res;
}

export async function updateProfileAction(editData: editProfileData) {
  const res = await editProfile(editData);

  return res;
}
