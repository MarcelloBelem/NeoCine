import { cookies } from "next/headers";
import { refreshAccessToken } from "./auth";

const API_URL = process.env.API_BASE_URL;

async function requestWithToken(
  path: string,
  token: string,
  options: RequestInit = {},
) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
}

export async function fetchAuth(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  let token = cookieStore.get("auth_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!token && refreshToken) {
    const refreshRes = await refreshAccessToken(refreshToken);

    if (refreshRes.success && refreshRes.data.accessToken) {
      token = refreshRes.data.accessToken;

      cookieStore.set("auth_token", refreshRes.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/",
      });

      if (refreshRes.data.refreshToken) {
        cookieStore.set("refresh_token", refreshRes.data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
      }
    }
  }

  if (!token) {
    throw new Error("Token não encontrado");
  }

  let res = await requestWithToken(path, token, options);

  if (res.status === 401 && refreshToken) {
    const refreshRes = await refreshAccessToken(refreshToken);

    if (refreshRes.success && refreshRes.data.accessToken) {
      token = refreshRes.data.accessToken;

      cookieStore.set("auth_token", refreshRes.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/",
      });

      if (refreshRes.data.refreshToken) {
        cookieStore.set("refresh_token", refreshRes.data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });
      }

      if (token) {
        res = await requestWithToken(path, token, options);
      }
    } else {
      cookieStore.delete("auth_token");
      cookieStore.delete("refresh_token");
    }
  }

  return res;
}
