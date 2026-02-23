import { cookies } from "next/headers";

const API_URL = process.env.API_BASE_URL;

export async function fetchAuth(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Token não encontrado");
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return res;
}
