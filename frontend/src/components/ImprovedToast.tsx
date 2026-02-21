"use client";

import { JSX, useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

type ToastType = "erro" | "confirmado" | "cuidado";

interface ImprovedToastProps {
  conteudo: string;
  tipo: ToastType;
  duration?: number;
  onClose?: () => void;
}

const toastStyles: Record<ToastType, { label: string; classes: string }> = {
  confirmado: {
    label: "Sucesso",
    classes:
      "border-emerald-400/40 bg-emerald-500/15 text-emerald-50 shadow-emerald-500/25",
  },
  cuidado: {
    label: "Aviso",
    classes:
      "border-amber-400/40 bg-amber-500/15 text-amber-50 shadow-amber-500/25",
  },
  erro: {
    label: "Erro",
    classes: "border-red-400/40 bg-red-500/15 text-red-50 shadow-red-500/25",
  },
};

const toastIcons: Record<ToastType, JSX.Element> = {
  confirmado: (
    <CheckCircle2 className="size-5 flex-shrink-0 text-emerald-300" />
  ),
  cuidado: <AlertTriangle className="size-5 flex-shrink-0 text-amber-300" />,
  erro: <XCircle className="size-5 flex-shrink-0 text-red-300" />,
};

export function ImprovedToast({
  conteudo,
  tipo,
  duration = 4000,
  onClose,
}: ImprovedToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const { label, classes } = toastStyles[tipo];
  const role = tipo === "confirmado" ? "status" : "alert";

  useEffect(() => {
    if (duration && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      role={role}
      aria-live={tipo === "confirmado" ? "polite" : "assertive"}
      className={`fixed right-4 bottom-6 left-4 z-50 max-w-md rounded-2xl border p-4 shadow-2xl backdrop-blur-md transition-all duration-300 md:right-8 md:bottom-8 md:left-auto ${
        isExiting
          ? "animate-out fade-out slide-out-to-bottom-2"
          : "animate-in fade-in slide-in-from-bottom-4"
      } ${classes}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{toastIcons[tipo]}</div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold tracking-widest uppercase opacity-80">
              {label}
            </span>
            <button
              onClick={handleClose}
              className="-mr-1 p-0.5 text-white/60 transition-colors hover:text-white"
              aria-label="Fechar notificação"
            >
              <X className="size-4" />
            </button>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white/95">
            {conteudo}
          </p>
        </div>
      </div>

      {/* Barra de progresso do auto-close */}
      {duration && (
        <div
          className="absolute bottom-0 left-0 h-0.5 rounded-b-2xl bg-gradient-to-r from-transparent to-white/40"
          style={{
            animation: isExiting ? "none" : `shrink ${duration}ms linear`,
          }}
        />
      )}

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0; }
        }
      `}</style>
    </div>
  );
}
