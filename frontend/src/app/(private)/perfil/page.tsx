"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  MapPin,
  LogOut,
  Edit2,
  Eye,
  Heart,
  Clock,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const userData = {
    name: "João Silva",
    email: "joao@example.com",
    location: "São Paulo, Brasil",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=joao",
    bio: "Cinéfilo apaixonado por filmes de ficção científica e dramas",
    joinDate: "Março 2024",
    watched: 127,
    watchlist: 42,
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="from-primary/10 via-bg-dark to-details/50 relative overflow-hidden rounded-3xl border border-gray-600/30 bg-linear-to-br p-8 backdrop-blur-md md:p-12">
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
            <div className="border-primary/50 relative h-24 w-24 overflow-hidden rounded-2xl border-2 md:h-32 md:w-32">
              <User className="size-full" />
              <div className="from-primary/30 absolute inset-0 bg-linear-to-tr to-transparent" />
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-orbitron text-3xl font-bold tracking-wider md:text-4xl">
                {userData.name}
              </h1>
              <div className="flex flex-col gap-1 text-sm text-white/70 md:text-base">
                <div className="flex items-center gap-2">
                  <Mail className="text-primary h-4 w-4" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary h-4 w-4" />
                  <span>{userData.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="group border-primary/50 bg-primary/10 hover:bg-primary/20 flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all duration-300 md:px-6 md:py-3"
            >
              <Edit2 className="h-4 w-4" />
              <span className="text-sm font-medium">Editar</span>
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-6 border-t border-gray-600/20 pt-6">
          <p className="text-white/80">{userData.bio}</p>
          <p className="mt-3 text-xs text-white/50">
            Membro desde {userData.joinDate}
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
                {userData.watched}
              </p>
            </div>
            <div className="bg-primary/20 rounded-full p-4">
              <Eye className="text-primary h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="group from-secondary/5 to-details/50 hover:border-secondary/50 hover:bg-secondary/10 relative overflow-hidden rounded-2xl border border-gray-600/30 bg-gradient-to-br p-6 backdrop-blur-md transition-all duration-300">
          <div className="bg-secondary/20 group-hover:bg-secondary/30 absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl transition-all duration-300" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Para Assistir</p>
              <p className="font-orbitron text-3xl font-bold tracking-wider">
                {userData.watchlist}
              </p>
            </div>
            <div className="bg-secondary/20 rounded-full p-4">
              <Heart className="text-secondary h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="group to-details/50 relative overflow-hidden rounded-2xl border border-gray-600/30 bg-gradient-to-br from-blue-500/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10">
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl transition-all duration-300 group-hover:bg-blue-500/30" />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Tempo Assistido</p>
              <p className="font-orbitron text-3xl font-bold tracking-wider">
                {(userData.watched * 2.5).toFixed(0)}h
              </p>
            </div>
            <div className="rounded-full bg-blue-500/20 p-4">
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <button className="ml-auto flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/20">
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}
