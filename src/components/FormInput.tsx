import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface FormInputProps {
  id: string;
  type: string;
  placeholder: string;
  icon: ReactNode;
  error?: FieldError;
  register: any;
  showActionButton?: ReactNode;
  onActionClick?: () => void;
  className?: string;
}

export function FormInput({
  id,
  type,
  placeholder,
  icon,
  error,
  register,
  showActionButton,
  onActionClick,
  className = "",
}: FormInputProps) {
  const hasError = !!error?.message;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {id === "email"
            ? "Email"
            : id === "password"
              ? "Senha"
              : id === "confirmPassword"
                ? "Confirmar Senha"
                : id === "name"
                  ? "Nome"
                  : id === "birthDate"
                    ? "Data de Nascimento"
                    : id}
        </label>
      </div>

      <div
        className={`hover:border-primary/50 focus-within:border-primary relative flex items-center overflow-hidden rounded-xl border-2 transition-all duration-300 ${
          hasError
            ? "border-red-500/60 bg-red-500/5 shadow-sm shadow-red-500/20"
            : "border-gray-600/30 bg-white/5"
        } ${className}`}
      >
        <div
          className={`text-primary/60 ml-4 h-5 w-5 transition-colors duration-300 ${hasError ? "text-red-400" : ""}`}
        >
          {icon}
        </div>

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full bg-transparent px-4 py-3 text-white placeholder-white/40 transition-colors outline-none ${
            hasError ? "placeholder-red-300/40" : ""
          }`}
          {...register(id)}
        />

        {showActionButton && (
          <button
            type="button"
            onClick={onActionClick}
            className="text-primary/60 hover:text-primary mr-4 transition-colors"
          >
            {showActionButton}
          </button>
        )}
      </div>

      {hasError && (
        <div className="animate-in fade-in slide-in-from-top-1 flex items-center gap-1.5 pl-1">
          <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
          <p className="text-xs font-medium text-red-300">{error.message}</p>
        </div>
      )}
    </div>
  );
}
