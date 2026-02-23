"use server";
import { cookies } from "next/headers";

//Services
import { login, register } from "@/service/api/auth";

//Types
import { LoginData, RegisterData } from "@/types/api/auth";

export async function loginAction(formData: LoginData) {
  const res = await login(formData);

  if (res.success && res.data.accessToken) {
    const cookieStore = await cookies();

    cookieStore.set("auth_token", res.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60,
      path: "/",
    });
  }

  return res;
}

export async function registerAction(formData: RegisterData) {
  const { confirmPassword, ...payload } = formData as RegisterData & {
    confirmPassword?: string;
  };

  const res = await register(payload);

  return res;
}
