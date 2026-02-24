import { editProfileData, getUserMediaRoute } from "@/types/api/users";
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

export async function getUserMedia(route: getUserMediaRoute) {
  try {
    const searchParams = new URLSearchParams();

    if (route.isWatched !== undefined) {
      searchParams.set("isWatched", String(route.isWatched));
    }

    if (route.inWatchlist !== undefined) {
      searchParams.set("inWatchlist", String(route.inWatchlist));
    }

    const queryString = searchParams.toString();
    const path = queryString
      ? `users/me/media?${queryString}`
      : "users/me/media";

    const res = await fetchAuth(path);

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Erro desconhecido" };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: "Falha na conexão com o servidor" };
  }
}
