import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/select";
import { useRestaurants } from "../contexts/RestaurantsAPIContext";
import Loading from "../components/Loading";
import RestaurantCard from "../components/RestaurantCard";
import ParticipantItem from "../components/ParticipantItem";
import { searchRestaurants, geocodeAddress } from "../lib/places.server";
import type { PlaceResult } from "./api.restaurants";
import Fuse from "fuse.js";
import { FOOD_EMOJIS, CUSTOM_EMOJIS } from "../config/emojis";

const searchCache = new Map<
  string,
  {
    data: PlaceResult[];
    timestamp: number;
    coordinates: { lat: number; lng: number; city?: string };
  }
>();

const CACHE_TTL = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 10; // Limit cache to 10 entries to prevent memory issues

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const address = url.searchParams.get("address") || "";
  const requestedRadius = Number(url.searchParams.get("radius")) || 1000;

  // Limit radius to 5km max to avoid showing restaurants too far away
  const radius = Math.min(requestedRadius, 5000);

  if (!address) {
    return { restaurants: [], address: "", radius, coordinates: null };
  }

  if (requestedRadius !== radius) {
    console.log(
      `⚠️ Raio ajustado de ${requestedRadius}m para ${radius}m (máximo permitido)`,
    );
  }

  const cacheKey = `${address}-${radius}`;

  // Clean up expired cache entries
  const now = Date.now();
  for (const [key, value] of searchCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      searchCache.delete(key);
      console.log("🧹 Expired cache cleaned:", key);
    }
  }

  const cached = searchCache.get(cacheKey);
  if (
    cached &&
    Date.now() - cached.timestamp < CACHE_TTL &&
    cached.data.length > 0
  ) {
    console.log("✅ Cache hit:", cacheKey);
    return {
      restaurants: cached.data,
      address,
      radius,
      coordinates: cached.coordinates,
      fromCache: true,
    };
  }

  try {
    const coordinates = await geocodeAddress(address);

    if (!coordinates) {
      return {
        restaurants: [],
        address,
        radius,
        coordinates: null,
        error: "Não foi possível encontrar as coordenadas do endereço",
      };
    }

    console.log(`🎯 Searching restaurants in "${address}":`, {
      lat: coordinates.lat,
      lng: coordinates.lng,
      radius: `${radius}m`,
      city: coordinates.city || "not specified",
    });

    const restaurants = await searchRestaurants(
      coordinates.lat,
      coordinates.lng,
      radius,
      coordinates.city,
    );

    // Evict oldest entries if cache is too large
    if (searchCache.size >= MAX_CACHE_SIZE) {
      const oldestKey = searchCache.keys().next().value;
      if (oldestKey) {
        searchCache.delete(oldestKey);
        console.log("🗑️ Cache evicted:", oldestKey);
      }
    }

    searchCache.set(cacheKey, {
      data: restaurants,
      timestamp: Date.now(),
      coordinates,
    });

    console.log(
      "💾 Cache saved:",
      cacheKey,
      `(${restaurants.length} restaurantes)`,
    );

    return {
      restaurants,
      address,
      radius,
      coordinates,
      fromCache: false,
    };
  } catch (error) {
    console.error("Error searching restaurants:", error);
    return {
      restaurants: [],
      address,
      radius,
      coordinates: null,
      error: "Error searching restaurants",
    };
  }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "Select Restaurants - Spell-icious" }];
}

interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number;
  types?: string[];
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
  lat?: number;
  lng?: number;
}

export default function Select({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const {
    restaurants,
    setRestaurants,
    selectedRestaurants,
    setSelectedRestaurants,
  } = useRestaurants();

  const [searchQuery, setSearchQuery] = useState("");
  const [customRestaurant, setCustomRestaurant] = useState("");
  const [customEmoji, setCustomEmoji] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (loaderData.restaurants && loaderData.restaurants.length > 0) {
      const restaurantList: Restaurant[] = loaderData.restaurants.map(
        (place) => ({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          rating: place.rating,
          userRatingsTotal: place.user_ratings_total,
          priceLevel: place.price_level,
          types: place.types,
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          // New OSM fields from tags
          openingHours: place.tags.opening_hours,
          phone: place.tags["contact:phone"] || place.tags.phone,
          website: place.tags.website,
          takeaway: place.tags.takeaway,
          delivery: place.tags.delivery,
          outdoorSeating: place.tags.outdoor_seating,
          brand: place.tags.brand,
          cuisine: place.tags.cuisine,
        }),
      );

      setRestaurants(restaurantList);

      if (loaderData.fromCache) {
        console.log("✅ Restaurants loaded from cache");
      } else {
        console.log("💾 Restaurants loaded and saved to cache");
      }
    }
  }, [loaderData, setRestaurants]);

  const toggleRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurants((prev) => {
      // Check if any instance of this restaurant exists
      const originalId = restaurant.id.includes("-")
        ? restaurant.id.split("-")[0]
        : restaurant.id;
      const hasInstance = prev.some((r) => r.id.startsWith(originalId));

      // If holding Shift key or if this is from the selected panel, just add another instance
      // Otherwise, toggle the first instance
      if (!hasInstance) {
        // Add first instance
        return [
          ...prev,
          { ...restaurant, id: `${restaurant.id}-${Date.now()}` },
        ];
      }

      // Remove first instance when clicking again
      const firstInstance = prev.find((r) => r.id.startsWith(originalId));
      if (firstInstance) {
        return prev.filter((r) => r.id !== firstInstance.id);
      }

      return prev;
    });
  };

  const addAnotherInstance = (restaurant: Restaurant) => {
    // Add another instance of the same restaurant with a unique ID
    const originalId = restaurant.id.includes("-")
      ? restaurant.id.split("-")[0]
      : restaurant.id;
    setSelectedRestaurants((prev) => [
      ...prev,
      {
        ...restaurant,
        id: `${originalId}-${Date.now()}`,
        name: restaurant.name,
      },
    ]);
  };

  const updateRestaurantEmoji = (restaurantId: string, emoji: string) => {
    setSelectedRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurantId ? { ...r, customEmoji: emoji } : r,
      ),
    );
  };

  const handleRemoveRestaurant = (id: string) => {
    setSelectedRestaurants((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddAnotherInstance = (id: string) => {
    const restaurant = selectedRestaurants.find((r) => r.id === id);
    if (!restaurant) return;
    addAnotherInstance(restaurant);
  };

  const addCustomRestaurant = () => {
    if (customRestaurant.trim()) {
      const newRestaurant: Restaurant = {
        id: `custom-${Date.now()}`,
        name: customRestaurant,
        address: "Manually added",
        customEmoji: customEmoji || undefined,
      };
      setSelectedRestaurants((prev) => [...prev, newRestaurant]);
      setCustomRestaurant("");
      setCustomEmoji("");
      setShowEmojiPicker(false);
    }
  };

  const startRace = () => {
    if (selectedRestaurants.length >= 2) {
      // Encode each restaurant with its custom emoji if present
      const restaurantData = selectedRestaurants.map((r) => ({
        name: r.name,
        emoji: r.customEmoji,
      }));
      const encodedData = encodeURIComponent(JSON.stringify(restaurantData));
      navigate(`/race?data=${encodedData}`);
    }
  };

  const fuse = useMemo(() => {
    return new Fuse(restaurants, {
      keys: [
        {
          name: "name",
          weight: 0.5,
        },
        {
          name: "types",
          weight: 0.3,
        },
        {
          name: "address",
          weight: 0.2,
        },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    if (!searchQuery.trim()) {
      return restaurants;
    }

    const results = fuse.search(searchQuery);

    return results.map((result) => result.item);
  }, [searchQuery, restaurants, fuse]);

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 sm:gap-2 font-medium transition-colors text-sm sm:text-base"
            >
              ← Back
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-500 mb-1.5 sm:mb-2">
            Choose Restaurants
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-3">
            📍 {loaderData.address} • {loaderData.radius}m radius
            {loaderData.fromCache && (
              <span className="ml-1 sm:ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                ⚡ Cache
              </span>
            )}
          </p>

          {/* Search Bar in Header */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Smart search: name, food, location..."
              className="w-full px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 outline-none text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-lg sm:text-xl"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>
                {filteredRestaurants.length} result
                {filteredRestaurants.length !== 1 ? "s" : ""} found
              </span>
              <span className="text-blue-500 dark:text-blue-400 hidden sm:inline">
                ✨ Typo-tolerant search
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content with padding to account for fixed header */}
      <div className="container mx-auto px-3 sm:px-4 pt-[200px] sm:pt-[220px] md:pt-[230px] pb-6 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:items-start">
          {/* Restaurants List */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Restaurants Grid */}
            {loaderData.error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                <p className="text-red-600 dark:text-red-400 font-semibold mb-2 text-sm sm:text-base">
                  ⚠️ Error loading restaurants
                </p>
                <p className="text-red-500 dark:text-red-300 text-xs sm:text-sm">
                  {loaderData.error}
                </p>
              </div>
            ) : restaurants.length === 0 ? (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                <p className="text-yellow-600 dark:text-yellow-400 font-semibold mb-2 text-sm sm:text-base">
                  🍽️ No restaurants found
                </p>
                <p className="text-yellow-500 dark:text-yellow-300 text-xs sm:text-sm">
                  Try increasing the search radius or choosing another location
                </p>
              </div>
            ) : filteredRestaurants.length === 0 ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center">
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2 text-sm sm:text-base">
                  🔍 No results for "{searchQuery}"
                </p>
                <p className="text-blue-500 dark:text-blue-300 text-xs sm:text-sm mb-3">
                  Try searching for:
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                  <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                    Restaurant name
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                    Food type
                  </span>
                  <span className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                    Location
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {filteredRestaurants.map((restaurant) => {
                  // Check if restaurant is selected (by matching base ID)
                  const originalId = restaurant.id.split("-")[0];
                  const isSelected = selectedRestaurants.some((r) =>
                    r.id.startsWith(originalId),
                  );
                  // Get the custom emoji of the first selected instance (if any)
                  const selectedInstance = selectedRestaurants.find((r) =>
                    r.id.startsWith(originalId),
                  );
                  return (
                    <RestaurantCard
                      key={restaurant.id}
                      name={restaurant.name}
                      address={restaurant.address}
                      rating={restaurant.rating}
                      userRatingsTotal={restaurant.userRatingsTotal}
                      priceLevel={restaurant.priceLevel}
                      types={restaurant.types}
                      isSelected={isSelected}
                      onClick={() => toggleRestaurant(restaurant)}
                      customEmoji={
                        selectedInstance?.customEmoji || restaurant.customEmoji
                      }
                      onEmojiChange={(emoji) =>
                        updateRestaurantEmoji(
                          selectedInstance?.id || restaurant.id,
                          emoji,
                        )
                      }
                      openingHours={restaurant.openingHours}
                      phone={restaurant.phone}
                      website={restaurant.website}
                      takeaway={restaurant.takeaway}
                      delivery={restaurant.delivery}
                      outdoorSeating={restaurant.outdoorSeating}
                      brand={restaurant.brand}
                      cuisine={restaurant.cuisine}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Selection Panel */}
          <div className="lg:col-span-1 lg:sticky lg:top-[200px] lg:h-fit order-1 lg:order-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1.5 sm:mb-2">
                🏁 Participants ({selectedRestaurants.length})
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                💡 Click emoji to change • Click{" "}
                <span className="text-green-600 dark:text-green-400 font-bold">
                  +
                </span>{" "}
                to add more
              </p>

              {/* Add Custom Restaurant */}
              <div className="mb-4 sm:mb-6 relative">
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Add Manual Restaurant
                </label>

                {/* Emoji selector button */}
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 hover:border-orange-500 transition-colors flex items-center gap-1 sm:gap-2"
                    type="button"
                  >
                    {customEmoji ? (
                      customEmoji.startsWith("/") ? (
                        <img
                          src={customEmoji}
                          alt="Selected"
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded object-cover"
                        />
                      ) : (
                        <span className="text-lg sm:text-xl">
                          {customEmoji}
                        </span>
                      )
                    ) : (
                      <span className="text-lg sm:text-xl">😊</span>
                    )}
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {customEmoji ? "Change" : "Pick"}
                    </span>
                  </button>
                </div>

                {/* Emoji picker dropdown */}
                {showEmojiPicker && (
                  <div className="absolute z-50 bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-xl shadow-xl p-3 sm:p-4 mb-2 max-h-[60vh] sm:max-h-80 overflow-y-auto left-0 right-0">
                    {/* Team photos */}
                    <div className="mb-3">
                      <p className="text-xs font-bold text-orange-600 dark:text-orange-500 mb-2">
                        😎 Pick your face!
                      </p>
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        {CUSTOM_EMOJIS.map((emoji, index) => (
                          <button
                            key={emoji}
                            onClick={() => {
                              setCustomEmoji(emoji);
                              setShowEmojiPicker(false);
                            }}
                            className="hover:scale-110 active:scale-95 transition-transform p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent hover:border-orange-400"
                          >
                            <img
                              src={emoji}
                              alt={`Team ${index + 1}`}
                              className="w-full aspect-square object-cover rounded-full"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        Or a food emoji:
                      </p>
                      <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                        {FOOD_EMOJIS.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => {
                              setCustomEmoji(emoji);
                              setShowEmojiPicker(false);
                            }}
                            className="text-2xl sm:text-3xl hover:scale-125 active:scale-95 transition-transform p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowEmojiPicker(false)}
                      className="mt-3 w-full py-1.5 sm:py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      Close
                    </button>
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customRestaurant}
                    onChange={(e) => setCustomRestaurant(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && addCustomRestaurant()
                    }
                    placeholder="Restaurant name"
                    className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 outline-none text-sm"
                  />
                  <button
                    onClick={addCustomRestaurant}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Selected Restaurants List */}
              <div className="space-y-2 mb-4 sm:mb-6">
                {selectedRestaurants.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8 text-xs sm:text-sm">
                    Select at least 2 restaurants to start the race
                  </p>
                ) : (
                  selectedRestaurants.map((restaurant, index) => (
                    <ParticipantItem
                      key={restaurant.id}
                      id={restaurant.id}
                      index={index}
                      name={restaurant.name}
                      address={restaurant.address}
                      emoji={restaurant.customEmoji}
                      onEmojiChange={updateRestaurantEmoji}
                      onAddInstance={handleAddAnotherInstance}
                      onRemove={handleRemoveRestaurant}
                      showAddButton={true}
                    />
                  ))
                )}
              </div>

              <button
                onClick={startRace}
                disabled={selectedRestaurants.length < 2}
                className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all transform ${
                  selectedRestaurants.length >= 2
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedRestaurants.length < 2
                  ? "Select 2+ restaurants"
                  : `🏁 Start Race (${selectedRestaurants.length})`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
