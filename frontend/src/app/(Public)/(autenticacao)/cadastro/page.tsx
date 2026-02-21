"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Calendar,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/FormInput";
import { ImprovedToast } from "@/components/ImprovedToast";

const registerSchema = z
  .object({
    name: z.string().min(2, "O nome deve conter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A senha deve conter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  type RegisterData = z.infer<typeof registerSchema>;

  const [toast, setToast] = useState<{
    message: string;
    type: "erro" | "confirmado" | "cuidado";
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (data: RegisterData) => {
    console.log("Cadastrando...", data);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setToast({
        message: `Bem-vindo! Conta criada com sucesso.`,
        type: "confirmado",
      });
    } catch (error) {
      setToast({
        message: "Erro ao criar conta. Tente novamente.",
        type: "erro",
      });
    }
  };

  return (
    <div>
      {/* Toast de feedback */}
      {toast && (
        <ImprovedToast
          conteudo={toast.message}
          tipo={toast.type}
          duration={toast.type === "confirmado" ? 3000 : 4000}
          onClose={() => setToast(null)}
        />
      )}

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="relative z-10 flex flex-col gap-4"
      >
        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <FormInput
            id="name"
            type="text"
            placeholder="Seu nome completo"
            icon={<User className="h-5 w-5" />}
            error={errors.name}
            register={register}
          />

          <FormInput
            id="email"
            type="email"
            placeholder="seu@email.com"
            icon={<Mail className="h-5 w-5" />}
            error={errors.email}
            register={register}
          />
        </div>

        <FormInput
          id="birthDate"
          type="date"
          placeholder="DD/MM/AAAA"
          icon={<Calendar className="h-5 w-5" />}
          error={errors.birthDate}
          register={register}
        />

        <div className="mb-4 grid gap-4 md:grid-cols-2">
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

          <FormInput
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            icon={<Lock className="h-5 w-5" />}
            error={errors.confirmPassword}
            register={register}
            showActionButton={
              showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )
            }
            onActionClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </div>

        <button
          type="submit"
          className="group from-primary to-secondary hover:shadow-primary/50 relative mt-8 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r px-6 py-3.5 font-medium text-white transition-all duration-300 hover:shadow-lg"
        >
          <span>{isSubmitting ? "Criando conta..." : "Criar Conta"}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      <div className="relative z-10 mt-6 border-t border-gray-600/20 pt-6 text-center">
        <p className="text-white/70">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-primary hover:text-secondary font-medium transition-colors"
          >
            Entre aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
