/**
 * API Resource Route - Restaurants Search
 *
 * Este endpoint servidor-side faz as chamadas à Google Places API
 * para proteger a API key e ter controlo sobre rate limiting.
 */

import { data } from "react-router";
import type { Route } from "./+types/api.restaurants";
import {
  geocodeAddress,
  searchRestaurants,
  type PlaceResult,
} from "../lib/places.server";

export type { PlaceResult };

/**
 * Loader - GET /api/restaurants?address=...&radius=...
 */
export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const address = url.searchParams.get("address");
  const radiusParam = url.searchParams.get("radius");

  // Validação de parâmetros
  if (!address) {
    throw data(
      { error: "O parâmetro 'address' é obrigatório" },
      { status: 400 },
    );
  }

  const radius = radiusParam ? parseInt(radiusParam, 10) : 1000;

  if (isNaN(radius) || radius <= 0 || radius > 50000) {
    throw data(
      { error: "O parâmetro 'radius' deve ser um número entre 1 e 50000" },
      { status: 400 },
    );
  }

  try {
    // 1. Geocode do endereço
    const coordinates = await geocodeAddress(address);

    if (!coordinates) {
      throw data(
        {
          error: "Não foi possível encontrar as coordenadas para este endereço",
        },
        { status: 404 },
      );
    }

    const restaurants = await searchRestaurants(
      coordinates.lat,
      coordinates.lng,
      radius,
    );

    return data(
      {
        success: true,
        data: {
          restaurants,
          coordinates,
          address,
          radius,
        },
      },
      {
        headers: {
          "Cache-Control": "public, max-age=300",
        },
      },
    );
  } catch (error) {
    console.error("API error:", error);
    throw data(
      { error: "Erro ao pesquisar restaurantes. Tenta novamente." },
      { status: 500 },
    );
  }
}
