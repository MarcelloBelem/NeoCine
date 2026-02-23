"use client";

import {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";

type ToastType = "erro" | "confirmado" | "cuidado";

interface ToastOptions {
  conteudo: string;
  tipo: ToastType;
  titulo?: string;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  showToast: (toast: ToastOptions) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<
  ToastType,
  { label: string; classes: string; iconColor: string }
> = {
  confirmado: {
    label: "Sucesso",
    classes:
      "border-emerald-500/20 bg-emerald-950/40 text-emerald-50 shadow-emerald-950/20",
    iconColor: "text-emerald-400",
  },
  cuidado: {
    label: "Aviso",
    classes:
      "border-amber-500/20 bg-amber-950/40 text-amber-50 shadow-amber-950/20",
    iconColor: "text-amber-400",
  },
  erro: {
    label: "Erro",
    classes: "border-red-500/20 bg-red-950/40 text-red-50 shadow-red-950/20",
    iconColor: "text-red-400",
  },
};

const toastIcons: Record<ToastType, JSX.Element> = {
  confirmado: <CheckCircle2 className="size-4 shrink-0" />,
  cuidado: <AlertTriangle className="size-4 shrink-0" />,
  erro: <XCircle className="size-4 shrink-0" />,
};

function ImprovedToast({
  id,
  conteudo,
  tipo,
  titulo,
  duration = 4000,
  onClose,
}: ToastItem & { onClose: (id: string) => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const { label, classes, iconColor } = toastStyles[tipo];

  useEffect(() => {
    const timer = setTimeout(() => handleClose(), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 300);
  };

  return (
    <div
      role={tipo === "confirmado" ? "status" : "alert"}
      className={`group pointer-events-auto relative w-full max-w-full overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-300 ease-out md:max-w-[320px] ${
        isExiting
          ? "translate-x-10 scale-95 opacity-0"
          : "animate-in slide-in-from-right-5 translate-x-0 scale-100 opacity-100"
      } ${classes}`}
    >
      <div className="flex items-center gap-3 p-3">
        {/* Ícone menor e mais discreto */}
        <div
          className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5 ${iconColor}`}
        >
          {toastIcons[tipo]}
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase opacity-50">
              {titulo || label}
            </span>
            <button
              onClick={handleClose}
              className="rounded-md p-1 opacity-100 transition-opacity hover:bg-white/10 md:opacity-0 md:group-hover:opacity-100"
            >
              <X className="size-3 text-white/50" />
            </button>
          </div>
          <p className="truncate text-[13px] font-medium text-white/90">
            {conteudo}
          </p>
        </div>
      </div>

      {/* Barra de progresso ultra-fina */}
      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-white/5">
        <div
          className={`h-full bg-white/30 transition-all`}
          style={{
            animation: isExiting
              ? "none"
              : `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}

export function ImprovedToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = (id: string) =>
    setToasts((p) => p.filter((t) => t.id !== id));

  const showToast = ({
    conteudo,
    tipo,
    titulo,
    duration = 4000,
  }: ToastOptions) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [
      ...prev.slice(-3),
      { id, conteudo, tipo, titulo, duration },
    ]);
    return id;
  };

  const value = useMemo(() => ({ showToast, dismissToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed top-20 right-4 left-4 z-50 flex flex-col gap-3 md:top-8 md:right-8 md:left-auto md:items-end">
        {toasts.map((toast) => (
          <ImprovedToast key={toast.id} {...toast} onClose={dismissToast} />
        ))}
      </div>
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within Provider");
  return context;
};
