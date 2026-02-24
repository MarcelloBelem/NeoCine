import { editProfileData } from "@/types/api/profile";
import { fetchAuth } from "./fetchAuth";

export async function getProfile() {
  try {
    const res = await fetchAuth("users/me");

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Erro desconhecido" };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: "Falha na conexão com o servidor" };
  }
}

export async function editProfile(editData: editProfileData) {
  try {
    const res = await fetchAuth("users/me/edit", {
      method: "PATCH",
      body: JSON.stringify(editData),
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
