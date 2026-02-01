/**
 * Types para a API de Restaurantes
 *
 * Tipos compartilhados entre cliente e servidor
 * Baseado na estrutura Overpass API do OpenStreetMap
 */

export interface PlaceResult {
  // Identificação
  type: "node" | "way" | "relation";
  id: number;
  place_id: string; // String gerada: `${type}${id}`

  // Localização
  lat: number;
  lon: number;

  // Tags do OSM (OpenStreetMap)
  tags: {
    // Endereço
    "addr:city"?: string;
    "addr:housenumber"?: string;
    "addr:postcode"?: string;
    "addr:street"?: string;
    "addr:country"?: string;

    // Informação do estabelecimento
    amenity?: string;
    name?: string;
    cuisine?: string;
    opening_hours?: string;
    phone?: string;
    website?: string;

    // Características
    takeaway?: string;
    delivery?: string;
    outdoor_seating?: string;
    wheelchair?: string;
    internet_access?: string;

    // Marca/Rede
    brand?: string;
    branch?: string;
    old_name?: string;
    ref?: string;

    // Contatos e Redes Sociais
    "contact:phone"?: string;
    "contact:email"?: string;
    "contact:facebook"?: string;
    "contact:instagram"?: string;
    "contact:twitter"?: string;
    "contact:youtube"?: string;
    "contact:tiktok"?: string;

    // Wikidata / Referências externas
    "brand:wikidata"?: string;
    "brand:wikipedia"?: string;
    "source:contact"?: string;

    // Outras categorias
    shop?: string;
    fast_food?: string;
    [key: string]: string | undefined;
  };

  // Campos computados para compatibilidade
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
  price_level?: number;
  types?: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  opening_hours?: {
    open_now: boolean;
  };
}

export interface RestaurantsSearchResponse {
  success: boolean;
  data: {
    restaurants: PlaceResult[];
    coordinates: { lat: number; lng: number };
    address: string;
    radius: number;
  };
}

export interface RestaurantDetailsResponse {
  success: boolean;
  data: PlaceResult;
}

export interface APIErrorResponse {
  success: false;
  error: string;
}
