"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  MapPin,
  LogOut,
  Edit2,
  Eye,
  Heart,
  Clock,
  Check,
  X,
} from "lucide-react";
import {
  getProfileAction,
  updateProfileAction,
} from "@/app/actions/api/profile";
import { logoutAction } from "@/app/actions/api/auth";

//Componentes
import { ProfileSkeletonField } from "@/components/SkeletonField";
import { useToast } from "@/components/ImprovedToast";
import { useRouter } from "next/navigation";

type ProfileData = {
  name?: string;
  email: string;
  bio?: string;
  registeredAt?: string;
};

type EditProfileData = {
  name: string;
  bio: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToast();

  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "Brasil",
    avatar: "",
    bio: "",
    joinDate: "",
    watched: 127,
    watchlist: 42,
  });

  const [editFormData, setEditFormData] = useState<EditProfileData>({
    name: "",
    bio: "",
  });

  const applyProfileData = (data: ProfileData) => {
    setUser((prev) => ({
      ...prev,
      name: data.name || "Usuário",
      email: data.email,
      bio: data.bio || "Sem biografia...",
      joinDate: data.registeredAt
        ? new Date(data.registeredAt).toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })
        : "Data desconhecida",
    }));
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      try {
        const response = await getProfileAction();

        if (!response.success || !response.data) {
          return;
        }

        const data = response.data;

        if (data && isMounted) {
          applyProfileData(data);
        }
      } catch (error) {
        console.error("Erro", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleEditProfile = () => {
    setEditFormData({
      name: user.name,
      bio: user.bio,
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditFormData({ name: "", bio: "" });
  };

  const handleSaveProfile = async (editData: EditProfileData) => {
    const res = await updateProfileAction(editData);

    if (!res.success) {
      showToast({ conteudo: res.message, tipo: "erro" });
      return;
    }

    const profileRes = await getProfileAction();

    if (profileRes.success && profileRes.data) {
      applyProfileData(profileRes.data);
    }

    setIsEditing(false);

    showToast({
      conteudo: res.data?.message || "Perfil atualizado com sucesso",
      tipo: "confirmado",
    });
  };

  const handleLogout = async () => {
    const res = await logoutAction();
    showToast({ conteudo: res.message, tipo: "confirmado" });
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="from-primary/10 via-bg-dark to-details/50 relative overflow-hidden rounded-3xl border border-gray-600/30 bg-linear-to-br p-8 backdrop-blur-md md:p-12">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
            <div className="border-primary/50 relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 md:h-32 md:w-32">
              <User className="size-full" />
              <div className="from-primary/30 absolute inset-0 bg-linear-to-tr to-transparent" />
            </div>

            <div className="flex w-full max-w-lg flex-col gap-2">
              <div className="font-orbitron min-h-[40px] text-3xl font-bold tracking-wider md:text-4xl">
                <ProfileSkeletonField loading={loading}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                      className="border-primary/50 focus:border-primary w-full border-b bg-transparent text-white placeholder-white/30 focus:outline-hidden"
                      placeholder="Seu nome"
                    />
                  ) : (
                    <span>{user.name}</span>
                  )}
                </ProfileSkeletonField>
              </div>

              <div className="flex flex-col gap-1 text-sm text-white/70 md:text-base">
                <div className="flex items-center gap-2">
                  <Mail className="text-primary h-4 w-4" />
                  <ProfileSkeletonField loading={loading}>
                    <span>{user.email}</span>
                  </ProfileSkeletonField>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary h-4 w-4" />
                  <ProfileSkeletonField loading={loading}>
                    <span>{user.location}</span>
                  </ProfileSkeletonField>
                </div>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="group flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-2.5 transition-all duration-300 hover:bg-red-500/20"
                >
                  <X className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-medium text-red-200">
                    Cancelar
                  </span>
                </button>
                <button
                  onClick={() => {
                    handleSaveProfile(editFormData);
                  }}
                  className="group flex items-center gap-2 rounded-xl border border-green-500/50 bg-green-500/10 px-4 py-2.5 transition-all duration-300 hover:bg-green-500/20"
                >
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium text-green-200">
                    Salvar
                  </span>
                </button>
              </>
            ) : (
              <button
                onClick={handleEditProfile}
                className="group border-primary/50 bg-primary/10 hover:bg-primary/20 flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all duration-300 md:px-6 md:py-3"
              >
                <Edit2 className="h-4 w-4" />
                <span className="text-sm font-medium">Editar</span>
              </button>
            )}
          </div>
        </div>

        <div className="relative z-10 mt-6 border-t border-gray-600/20 pt-6">
          <ProfileSkeletonField loading={loading}>
            {isEditing ? (
              <textarea
                value={editFormData.bio}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, bio: e.target.value })
                }
                rows={3}
                className="focus:border-primary w-full resize-y rounded-lg border border-gray-600/50 bg-black/20 p-3 text-white/90 focus:outline-hidden"
                placeholder="Escreva algo sobre você..."
              />
            ) : (
              <p className="whitespace-pre-wrap text-white/80">{user.bio}</p>
            )}
          </ProfileSkeletonField>

          <p className="mt-3 text-xs text-white/50">
            <ProfileSkeletonField loading={loading}>
              <>Membro desde {user.joinDate}</>
            </ProfileSkeletonField>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="group from-primary/5 to-details/50 hover:border-primary/50 hover:bg-primary/10 relative overflow-hidden rounded-2xl border border-gray-600/30 bg-linear-to-br p-6 backdrop-blur-md transition-all duration-300">
          <div className="bg-primary/20 group-hover:bg-primary/30 absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl transition-all duration-300" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Assistidos</p>
              <p className="font-orbitron text-3xl font-bold tracking-wider">
                <ProfileSkeletonField loading={loading}>
                  {user.watched}
                </ProfileSkeletonField>
              </p>
            </div>
            <div className="bg-primary/20 rounded-full p-4">
              <Eye className="text-primary h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="group from-secondary/5 to-details/50 hover:border-secondary/50 hover:bg-secondary/10 relative overflow-hidden rounded-2xl border border-gray-600/30 bg-linear-to-br p-6 backdrop-blur-md transition-all duration-300">
          <div className="bg-secondary/20 group-hover:bg-secondary/30 absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl transition-all duration-300" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Para Assistir</p>
              <p className="font-orbitron text-3xl font-bold tracking-wider">
                <ProfileSkeletonField loading={loading}>
                  {user.watchlist}
                </ProfileSkeletonField>
              </p>
            </div>
            <div className="bg-secondary/20 rounded-full p-4">
              <Heart className="text-secondary h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="group to-details/50 relative overflow-hidden rounded-2xl border border-gray-600/30 bg-linear-to-br from-blue-500/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10">
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl transition-all duration-300 group-hover:bg-blue-500/30" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Tempo Assistido</p>
              <p className="font-orbitron text-3xl font-bold tracking-wider">
                <ProfileSkeletonField loading={loading}>
                  {(user.watched * 2.5).toFixed(0)}h
                </ProfileSkeletonField>
              </p>
            </div>
            <div className="rounded-full bg-blue-500/20 p-4">
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <button
          className="ml-auto flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/20"
          onClick={() => handleLogout()}
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}
