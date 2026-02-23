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
import { success, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/FormInput";
import { useToast } from "@/components/ImprovedToast";
import { registerAction } from "@/app/actions/api/auth";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    name: z.string().min(2, "O nome deve conter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    birthdate: z
      .string()
      .min(1, "Data de nascimento é obrigatória")
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }

        return age >= 5;
      }, "Você deve ter pelo menos 5 anos de idade"),
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
  const router = useRouter();
  const { showToast } = useToast();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  type RegisterData = z.infer<typeof registerSchema>;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (data: RegisterData) => {
    const res = await registerAction(data);

    if (!res.success) {
      showToast({ conteudo: res.message, tipo: "erro" });

      setError("email", {
        type: "manual",
        message: "Verifique seu e-mail",
      });
      setError("password", {
        type: "manual",
        message: "Senha incorreta",
      });

      return;
    }

    console.log("Sucesso! Dados do usuário:", res.data);
    showToast({ conteudo: res.data.message, tipo: "confirmado" });

    router.refresh();

    router.push("/login");
  };

  return (
    <div>
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
          id="birthdate"
          type="date"
          placeholder="DD/MM/AAAA"
          icon={<Calendar className="h-5 w-5" />}
          error={errors.birthdate}
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
