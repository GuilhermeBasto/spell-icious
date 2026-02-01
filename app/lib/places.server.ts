/**
 * Server-only utilities for OpenStreetMap + Overpass API
 *
 * Usa OpenStreetMap (gratuito e sem necessidade de API key)
 * Com fallback para mock data quando necessário
 */

import type { PlaceResult } from "../types/api";

export type { PlaceResult };

const mockRestaurantsLisboa: PlaceResult[] = [
  {
    type: "node",
    id: 1000001,
    lat: 38.7223,
    lon: -9.1393,
    tags: {
      "addr:city": "Lisboa",
      "addr:housenumber": "123",
      "addr:postcode": "1100-048",
      "addr:street": "Rua Augusta",
      amenity: "restaurant",
      name: "Tasca do Zé",
      cuisine: "portuguese",
    },
    place_id: "node1000001",
    name: "Tasca do Zé",
    formatted_address: "Rua Augusta, 123, 1100-048 Lisboa",
    rating: 4.5,
    user_ratings_total: 234,
    price_level: 2,
    types: ["restaurant", "portuguese"],
    geometry: { location: { lat: 38.7223, lng: -9.1393 } },
    opening_hours: { open_now: true },
  },
  {
    type: "node",
    id: 1000002,
    lat: 38.7369,
    lon: -9.1457,
    tags: {
      "addr:city": "Lisboa",
      "addr:housenumber": "45",
      "addr:postcode": "1050-187",
      "addr:street": "Av. da República",
      amenity: "restaurant",
      name: "Pizzaria Bella Napoli",
      cuisine: "pizza;italian",
    },
    place_id: "node1000002",
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
    type: "node",
    id: 1000003,
    lat: 38.7077,
    lon: -9.1365,
    tags: {
      "addr:city": "Lisboa",
      "addr:housenumber": "78",
      "addr:postcode": "1100-148",
      "addr:street": "Praça do Comércio",
      amenity: "restaurant",
      name: "Sushi Garden",
      cuisine: "sushi;japanese",
    },
    place_id: "node1000003",
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
    type: "node",
    id: 1000004,
    lat: 38.7115,
    lon: -9.1441,
    tags: {
      "addr:city": "Lisboa",
      "addr:housenumber": "56",
      "addr:postcode": "1200-195",
      "addr:street": "Rua das Flores",
      amenity: "restaurant",
      name: "Hamburgueria do Bairro",
      cuisine: "burger",
    },
    place_id: "node1000004",
    name: "Hamburgueria do Bairro",
    formatted_address: "Rua das Flores, 56, 1200-195 Lisboa",
    rating: 4.3,
    user_ratings_total: 156,
    price_level: 2,
    types: ["restaurant", "burger"],
    geometry: { location: { lat: 38.7115, lng: -9.1441 } },
    opening_hours: { open_now: true },
  },
  {
    type: "node",
    id: 1000005,
    lat: 38.71,
    lon: -9.138,
    tags: {
      "addr:city": "Lisboa",
      "addr:housenumber": "89",
      "addr:postcode": "1100-000",
      "addr:street": "Rua do Ouro",
      amenity: "restaurant",
      name: "Cantina Italiana",
      cuisine: "italian",
    },
    place_id: "node1000005",
    name: "Cantina Italiana",
    formatted_address: "Rua do Ouro, 89, 1100-000 Lisboa",
    rating: 4.6,
    user_ratings_total: 278,
    price_level: 3,
    types: ["restaurant", "italian"],
    geometry: { location: { lat: 38.71, lng: -9.138 } },
    opening_hours: { open_now: true },
  },
];

/**
 * Converter resultado do OpenStreetMap/Overpass para formato unificado
 */
function convertOSMToPlace(osmElement: any): PlaceResult {
  const tags = osmElement.tags || {};

  let formatted_address = "";

  const street = tags["addr:street"] || "";
  const houseNumber = tags["addr:housenumber"] || "";
  const postcode = tags["addr:postcode"] || "";
  const city = tags["addr:city"] || "";
  const suburb = tags["addr:suburb"] || "";

  const addressParts: string[] = [];

  if (street && houseNumber) {
    addressParts.push(`${street}, ${houseNumber}`);
  } else if (street) {
    addressParts.push(street);
  }

  if (suburb) {
    addressParts.push(suburb);
  }

  if (postcode && city) {
    addressParts.push(`${postcode} ${city}`);
  } else if (city) {
    addressParts.push(city);
  } else if (postcode) {
    addressParts.push(postcode);
  }

  if (addressParts.length > 0) {
    formatted_address = addressParts.join(", ");
  } else if (tags.address) {
    formatted_address = tags.address;
  } else {
    const lat = (osmElement.lat || osmElement.center?.lat || 0).toFixed(4);
    const lng = (osmElement.lon || osmElement.center?.lon || 0).toFixed(4);
    formatted_address = `Coords: ${lat}, ${lng}`;
  }

  const cuisines = tags.cuisine
    ? tags.cuisine.split(";").map((c: string) => c.trim().toLowerCase())
    : [];
  const amenity = tags.amenity || "restaurant";

  const lat = osmElement.lat || osmElement.center?.lat || 0;
  const lon = osmElement.lon || osmElement.center?.lon || 0;

  return {
    // Estrutura Overpass API
    type: osmElement.type || "node",
    id: osmElement.id,
    lat,
    lon,
    tags,

    // Campos computados para compatibilidade
    place_id: `${osmElement.type || "node"}${osmElement.id}`,
    name: tags.name || "Restaurante sem nome",
    formatted_address,
    rating: undefined, // OSM não tem ratings nativos
    user_ratings_total: undefined,
    price_level: undefined,
    types: [amenity, ...cuisines],
    geometry: {
      location: {
        lat,
        lng: lon,
      },
    },
    opening_hours: tags.opening_hours ? undefined : undefined, // OSM tem opening_hours, mas requer parser complexo
  };
}

/**
 * Geocode an address to coordinates usando OpenStreetMap Nominatim
 */
export async function geocodeAddress(
  address: string,
): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;

    console.log("🗺️ OpenStreetMap: Geocoding", { address });

    const response = await fetch(url, {
      headers: {
        "User-Agent": "RestaurantRace/1.0", // OSM requer User-Agent
      },
    });

    if (!response.ok) {
      console.error(`OSM geocoding error: ${response.status}`);
      return getFallbackCoordinates(address);
    }

    const data = await response.json();

    if (data.length > 0) {
      const coords = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
      console.log("✅ OSM Geocoding success:", coords);
      return coords;
    }

    return getFallbackCoordinates(address);
  } catch (error) {
    console.error("OSM Geocoding error:", error);
    return getFallbackCoordinates(address);
  }
}

/**
 * Get fallback coordinates based on city name
 */
function getFallbackCoordinates(
  address: string,
): { lat: number; lng: number } | null {
  const normalized = address.toLowerCase();

  if (normalized.includes("porto")) {
    return { lat: 41.1579, lng: -8.6291 };
  } else if (normalized.includes("lisboa") || normalized.includes("lisbon")) {
    return { lat: 38.7223, lng: -9.1393 };
  } else if (normalized.includes("coimbra")) {
    return { lat: 40.2033, lng: -8.4103 };
  }

  return null;
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 */
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

/**
 * Search for restaurants near a location usando OpenStreetMap + Overpass API
 */
export async function searchRestaurants(
  lat: number,
  lng: number,
  radius: number,
): Promise<PlaceResult[]> {
  console.log("🔍 Iniciando busca via Overpass API", { lat, lng, radius });

  try {
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="restaurant"](around:${radius},${lat},${lng});
        node["amenity"="fast_food"](around:${radius},${lat},${lng});
        node["amenity"="food_court"](around:${radius},${lat},${lng});
        way["amenity"="restaurant"](around:${radius},${lat},${lng});
        way["amenity"="fast_food"](around:${radius},${lat},${lng});
        way["amenity"="food_court"](around:${radius},${lat},${lng});
        relation["amenity"="restaurant"](around:${radius},${lat},${lng});
        relation["amenity"="fast_food"](around:${radius},${lat},${lng});
        relation["amenity"="food_court"](around:${radius},${lat},${lng});
      );
      out body center;
    `;

    const url = "https://overpass-api.de/api/interpreter";

    console.log("🗺️ OpenStreetMap Overpass: Fazendo request para API");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `data=${encodeURIComponent(query)}`,
    });

    if (!response.ok) {
      console.error(`❌ Overpass API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const totalElements = data.elements?.length || 0;

    console.log(`📊 Overpass retornou ${totalElements} elementos`);

    if (data.elements && Array.isArray(data.elements)) {
      const restaurants = data.elements
        .filter((el: any) => {
          const hasName = !!el.tags?.name;
          const amenity = el.tags?.amenity;

          const validAmenities = [
            "restaurant",
            "cafe",
            "fast_food",
            "food_court",
          ];
          const isValidAmenity = validAmenities.includes(amenity);

          if (!hasName) {
            console.log(`⚠️ Elemento ${el.id} sem nome - ignorando`);
            return false;
          }

          if (!isValidAmenity) {
            console.log(
              `⚠️ Elemento ${el.id} (${el.tags?.name}) não é restaurante (amenity=${amenity}) - ignorando`,
            );
            return false;
          }

          return true;
        })
        .map((el: any) => convertOSMToPlace(el));

      console.log(`✅ ${restaurants.length} restaurantes válidos`);

      if (restaurants.length > 0) {
        return restaurants;
      }
    }

    console.log("⚠️ OpenStreetMap returned no results - using mock data");
    return getMockData(lat, lng, radius);
  } catch (error) {
    console.error("❌ OpenStreetMap search error:", error);
    return [];
  }
}

/**
 * Get mock data filtered by radius
 */
function getMockData(lat: number, lng: number, radius: number): PlaceResult[] {
  console.log("🎭 Using mock data");
  const filtered = mockRestaurantsLisboa.filter((restaurant) => {
    const distance = calculateDistance(
      lat,
      lng,
      restaurant.geometry.location.lat,
      restaurant.geometry.location.lng,
    );
    return distance <= radius;
  });

  return filtered.map((r) => ({
    ...r,
    rating: r.rating
      ? Math.min(5, Math.max(1, r.rating + (Math.random() - 0.5) * 0.3))
      : undefined,
  }));
}
