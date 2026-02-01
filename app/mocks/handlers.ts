import { http, HttpResponse } from "msw";

/**
 * MSW Handlers - Mock Service Worker
 *
 * Estes handlers interceptam chamadas ao endpoint interno da API
 * (/api/restaurants) quando a aplicação está em modo de desenvolvimento
 * sem API key real.
 */

const mockRestaurants = {
  lisboa: [
    {
      place_id: "mock_1",
      name: "Tasca do Zé",
      formatted_address: "Rua Augusta, 123, 1100-048 Lisboa",
      rating: 4.5,
      user_ratings_total: 234,
      price_level: 2,
      types: ["restaurant", "food", "point_of_interest"],
      geometry: { location: { lat: 38.7223, lng: -9.1393 } },
      opening_hours: { open_now: true },
    },
    {
      place_id: "mock_2",
      name: "Pizzaria Bella Napoli",
      formatted_address: "Av. da República, 45, 1050-187 Lisboa",
      rating: 4.2,
      user_ratings_total: 189,
      price_level: 2,
      types: ["restaurant", "pizza", "italian"],
      geometry: { location: { lat: 38.7369, lng: -9.1457 } },
      opening_hours: { open_now: true },
    },
    {
      place_id: "mock_3",
      name: "Sushi Garden",
      formatted_address: "Praça do Comércio, 78, 1100-148 Lisboa",
      rating: 4.7,
      user_ratings_total: 312,
      price_level: 3,
      types: ["restaurant", "sushi", "japanese"],
      geometry: { location: { lat: 38.7077, lng: -9.1365 } },
      opening_hours: { open_now: true },
    },
    {
      place_id: "mock_4",
      name: "Hamburgueria do Bairro",
      formatted_address: "Rua das Flores, 56, 1200-195 Lisboa",
      rating: 4.3,
      user_ratings_total: 156,
      price_level: 2,
      types: ["restaurant", "hamburger", "fast_food"],
      geometry: { location: { lat: 38.7115, lng: -9.1441 } },
      opening_hours: { open_now: true },
    },
    {
      place_id: "mock_5",
      name: "Cantina Italiana",
      formatted_address: "Rua do Ouro, 89, 1100-000 Lisboa",
      rating: 4.6,
      user_ratings_total: 278,
      price_level: 3,
      types: ["restaurant", "italian", "pasta"],
      geometry: { location: { lat: 38.71, lng: -9.138 } },
      opening_hours: { open_now: true },
    },
    {
      place_id: "mock_6",
      name: "Tasquinha Portuguesa",
      formatted_address: "Beco do Forno, 12, 1200-000 Lisboa",
      rating: 4.4,
      user_ratings_total: 201,
      price_level: 2,
      types: ["restaurant", "portuguese", "traditional"],
      geometry: { location: { lat: 38.715, lng: -9.14 } },
      opening_hours: { open_now: true },
    },
    {
      place_id: "mock_7",
      name: "Marisqueira Atlântico",
      formatted_address: "Cais do Sodré, 34, 1200-000 Lisboa",
      rating: 4.8,
      user_ratings_total: 445,
      price_level: 4,
      types: ["restaurant", "seafood", "portuguese"],
      geometry: { location: { lat: 38.705, lng: -9.145 } },
      opening_hours: { open_now: true },
    },
  ],
  porto: [
    {
      place_id: "mock_porto_1",
      name: "Francesinha da Baixa",
      formatted_address: "Rua das Flores, 56, 4050-000 Porto",
      rating: 4.8,
      user_ratings_total: 445,
      price_level: 2,
      types: ["restaurant", "portuguese", "francesinha"],
      geometry: { location: { lat: 41.1579, lng: -8.6291 } },
      opening_hours: { open_now: true },
    },
    {
      place_id: "mock_porto_2",
      name: "Restaurante Ribeira",
      formatted_address: "Cais da Ribeira, 25, 4050-000 Porto",
      rating: 4.5,
      user_ratings_total: 312,
      price_level: 3,
      types: ["restaurant", "seafood", "portuguese"],
      geometry: { location: { lat: 41.1405, lng: -8.6138 } },
      opening_hours: { open_now: true },
    },
    {
      place_id: "mock_porto_3",
      name: "Taberna dos Mercadores",
      formatted_address: "Rua dos Mercadores, 15, 4050-000 Porto",
      rating: 4.6,
      user_ratings_total: 289,
      price_level: 2,
      types: ["restaurant", "portuguese", "tapas"],
      geometry: { location: { lat: 41.142, lng: -8.615 } },
      opening_hours: { open_now: true },
    },
  ],
};

// Função auxiliar para calcular distância (Haversine formula)
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export const handlers = [
  http.get("/api/restaurants", async ({ request }) => {
    const url = new URL(request.url);
    const address = url.searchParams.get("address") || "";
    const radius = parseInt(url.searchParams.get("radius") || "1000", 10);

    console.log("🎭 MSW Browser: Intercepting /api/restaurants", {
      address,
      radius,
    });

    const normalizedAddress = address.toLowerCase();
    let coordinates = { lat: 38.7223, lng: -9.1393 };
    let city: keyof typeof mockRestaurants = "lisboa";

    if (
      normalizedAddress.includes("porto") ||
      normalizedAddress.includes("4000") ||
      normalizedAddress.includes("camilo")
    ) {
      coordinates = { lat: 41.1579, lng: -8.6291 };
      city = "porto";
    } else if (
      normalizedAddress.includes("coimbra") ||
      normalizedAddress.includes("3000")
    ) {
      coordinates = { lat: 40.2033, lng: -8.4103 };
      city = "lisboa";
    }

    const cityRestaurants = mockRestaurants[city];
    const filteredRestaurants = cityRestaurants.filter((restaurant) => {
      const distance = calculateDistance(
        coordinates.lat,
        coordinates.lng,
        restaurant.geometry.location.lat,
        restaurant.geometry.location.lng,
      );
      return distance <= radius;
    });

    const restaurantsWithVariation = filteredRestaurants.map((r) => ({
      ...r,
      rating: r.rating
        ? Math.min(5, Math.max(1, r.rating + (Math.random() - 0.5) * 0.3))
        : undefined,
    }));

    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json({
      success: true,
      data: {
        restaurants: restaurantsWithVariation,
        coordinates,
        address,
        radius,
      },
    });
  }),
];
