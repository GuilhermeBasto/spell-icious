/**
 * Restaurants API Context
 *
 * Provider para gerenciar chamadas à API de restaurantes
 * usando useFetcher do React Router v7
 *
 * Inclui proteção contra pedidos duplicados
 */

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useFetcher } from "react-router";
import type { PlaceResult } from "../routes/api.restaurants";

interface RestaurantsSearchResult {
  success: boolean;
  data: {
    restaurants: PlaceResult[];
    coordinates: { lat: number; lng: number };
    address: string;
    radius: number;
  };
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number;
  types?: string[];
  lat?: number;
  lng?: number;
  customEmoji?: string;
  // New OSM fields
  openingHours?: string;
  phone?: string;
  website?: string;
  takeaway?: string;
  delivery?: string;
  outdoorSeating?: string;
  brand?: string;
  cuisine?: string;
}

interface RestaurantsAPIContextType {
  searchRestaurants: (address: string, radius: number) => void;
  setRestaurants: (restaurants: Restaurant[]) => void;
  restaurants: Restaurant[];
  selectedRestaurants: Restaurant[];
  setSelectedRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
  searchData: RestaurantsSearchResult | null;
  isSearching: boolean;
  searchError: string | null;
}

const RestaurantsAPIContext = createContext<
  RestaurantsAPIContextType | undefined
>(undefined);

export function RestaurantsAPIProvider({ children }: { children: ReactNode }) {
  const searchFetcher = useFetcher<RestaurantsSearchResult>({ key: "search" });

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const [selectedRestaurants, setSelectedRestaurants] = useState<Restaurant[]>(
    [],
  );

  const lastSearchRef = useRef<string>("");

  const searchRestaurants = useCallback((address: string, radius: number) => {
    const searchKey = `${address}-${radius}`;

    if (searchKey === lastSearchRef.current) {
      console.log("🔄 Busca duplicada prevenida:", searchKey);
      return;
    }

    lastSearchRef.current = searchKey;
    const params = new URLSearchParams({
      address,
      radius: radius.toString(),
    });
    searchFetcher.load(`/api/restaurants?${params}`);
  }, []);

  const value = useMemo(() => {
    return {
      searchRestaurants,
      setRestaurants,
      restaurants,
      selectedRestaurants,
      setSelectedRestaurants,
      searchData: searchFetcher.data ?? null,
      isSearching: searchFetcher.state === "loading",
      searchError:
        searchFetcher.data && "error" in searchFetcher.data
          ? (searchFetcher.data as any).error
          : null,
    };
  }, [
    searchRestaurants,
    restaurants,
    selectedRestaurants,
    searchFetcher.data,
    searchFetcher.state,
  ]);

  return (
    <RestaurantsAPIContext.Provider value={value}>
      {children}
    </RestaurantsAPIContext.Provider>
  );
}

/**
 * Hook para usar o Restaurants API
 */
export function useRestaurants() {
  const context = useContext(RestaurantsAPIContext);
  if (context === undefined) {
    throw new Error(
      "useRestaurants deve ser usado dentro de um RestaurantsAPIProvider",
    );
  }
  return context;
}
