"use cache";

import { cacheLife } from "next/cache";

const BASE_URL = "https://api.themoviedb.org/3";
const headers = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
};

export async function getTrending() {
  cacheLife("weeks");

  try {
    /* 
    // --- SIMULAÇÃO DE FALHA (Descomente a linha abaixo para testar) ---
    throw new Error("ERRO SIMULADO: Falha ao conectar com o TMDB"); */

    const res = await fetch(`${BASE_URL}/trending/all/week?language=pt-BR`, {
      headers: headers,
    });

    if (!res.ok) {
      throw new Error(`Erro na API TMDB: ${res.status}`);
    }

    const data = await res.json();

    return data.results;
  } catch (error) {
    console.error("Error ao buscar trending", error);
    return null;
  }
}
