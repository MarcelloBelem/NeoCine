"use cache";

import { TMDBContent, TMDBContentDetails } from "@/types/tmdb";
import { cacheLife } from "next/cache";

const BASE_URL = "https://api.themoviedb.org/3";
const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
};

export async function getTrendingMedia(
  page = 1,
): Promise<TMDBContent[] | null> {
  cacheLife("weeks");

  try {
    /* 
    // --- SIMULAÇÃO DE FALHA (Descomente a linha abaixo para testar) ---
    throw new Error("ERRO SIMULADO: Falha ao conectar com o TMDB"); */

    const res = await fetch(
      `${BASE_URL}/trending/all/week?language=pt-BR&page=${page}`,
      {
        headers: headers,
      },
    );

    if (!res.ok) {
      throw new Error(`Erro na API TMDB: ${res.status}`);
    }

    const data = await res.json();

    const results = data.results as TMDBContent[];

    return results.filter((item) => item.media_type !== "person");
  } catch (error) {
    console.error("Error ao buscar trending", error);
    return null;
  }
}

export async function getMediaDetails(
  mediaID: number,
  mediaType: "movie" | "tv",
): Promise<{ data: TMDBContentDetails; mediaType: "movie" | "tv" } | null> {
  cacheLife("weeks");

  try {
    const res = await fetch(
      `${BASE_URL}/${mediaType}/${mediaID}?language=pt-BR`,
      {
        headers: headers,
      },
    );

    if (!res.ok) {
      throw new Error(`Erro na API TMDB: ${res.status}`);
    }

    const data = await res.json();

    return { data, mediaType };
  } catch (error) {
    console.error("Error ao buscar media", error);
    return null;
  }
}
