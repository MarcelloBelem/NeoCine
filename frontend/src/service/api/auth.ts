import { LoginData, RegisterData } from "@/types/api/auth";

const API_URL = process.env.API_BASE_URL;

const headers = {
  "Content-Type": "application/json",
};

export async function login(formData: LoginData) {
  try {
    const res = await fetch(`${API_URL}auth/login`, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
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

export async function register(formData: RegisterData) {
  try {
    const res = await fetch(`${API_URL}auth/register`, {
      method: "POST",
      headers,
      body: JSON.stringify(formData),
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

export async function refreshAccessToken(refreshToken: string) {
  try {
    const res = await fetch(`${API_URL}auth/refresh`, {
      method: "POST",
      headers,
      body: JSON.stringify({ refreshToken }),
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
