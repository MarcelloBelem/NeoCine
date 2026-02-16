"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/FormInput";
import { ImprovedToast } from "@/components/ImprovedToast";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  type LoginData = z.infer<typeof loginSchema>;

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data: LoginData) => {
    console.log("Logando...", data);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("Login finalizado");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="relative z-10 space-y-5"
      >
        <FormInput
          id="email"
          type="email"
          placeholder="seu@email.com"
          icon={<Mail className="h-5 w-5" />}
          error={errors.email}
          register={register}
        />

        <FormInput
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          icon={<Lock className="h-5 w-5" />}
          error={errors.password}
          register={register}
          showActionButton={
            showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )
          }
          onActionClick={() => setShowPassword(!showPassword)}
        />

        <div className="flex items-center justify-end pt-2">
          <Link
            href="/forgot-password"
            className="text-primary hover:text-secondary text-sm transition-colors"
          >
            Esqueci a senha
          </Link>
        </div>

        <button
          type="submit"
          className="group from-primary to-secondary hover:shadow-primary/50 relative mt-8 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r px-6 py-3.5 font-medium text-white transition-all duration-300 hover:shadow-lg"
        >
          <span>{isSubmitting ? "Entrando..." : "Entrar"}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="relative z-10 mt-6 border-t border-gray-600/20 pt-6 text-center">
        <p className="text-white/70">
          Não tem uma conta?{" "}
          <Link
            href="/cadastro"
            className="text-primary hover:text-secondary font-medium transition-colors"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
