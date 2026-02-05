import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/quick-race";
import { useRestaurants } from "../contexts/RestaurantsAPIContext";
import ManualRestaurantInput from "../components/ManualRestaurantInput";
import ParticipantItem from "../components/ParticipantItem";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Quick Race - Spell-icious" },
    {
      name: "description",
      content: "Add restaurants manually and race instantly!",
    },
  ];
}

interface ManualRestaurant {
  id: string;
  name: string;
  emoji: string;
}

export default function QuickRace() {
  const navigate = useNavigate();
  const { setSelectedRestaurants } = useRestaurants();
  const [restaurants, setRestaurants] = useState<ManualRestaurant[]>([]);

  const handleAddRestaurant = (restaurant: { name: string; emoji: string }) => {
    const newRestaurant: ManualRestaurant = {
      id: `manual-${Date.now()}-${Math.random()}`,
      name: restaurant.name,
      emoji: restaurant.emoji,
    };
    setRestaurants([...restaurants, newRestaurant]);
  };

  const handleRemoveRestaurant = (id: string) => {
    setRestaurants(restaurants.filter((r) => r.id !== id));
  };

  const handleUpdateEmoji = (id: string, emoji: string) => {
    setRestaurants(restaurants.map((r) => (r.id === id ? { ...r, emoji } : r)));
  };

  const handleAddAnotherInstance = (id: string) => {
    const restaurant = restaurants.find((r) => r.id === id);
    if (!restaurant) return;

    const newInstance: ManualRestaurant = {
      id: `manual-${Date.now()}-${Math.random()}`,
      name: restaurant.name,
      emoji: restaurant.emoji,
    };
    setRestaurants([...restaurants, newInstance]);
  };

  const handleStartRace = () => {
    if (restaurants.length < 2) {
      alert("Add at least 2 restaurants to start the race!");
      return;
    }

    setSelectedRestaurants(
      restaurants.map((r) => ({
        id: r.id,
        name: r.name,
        address: "Manual entry",
        customEmoji: r.emoji,
      })),
    );

    // Use the new format with embedded emoji data
    const restaurantData = restaurants.map((r) => ({
      name: r.name,
      emoji: r.emoji,
    }));
    const encodedData = encodeURIComponent(JSON.stringify(restaurantData));
    navigate(`/race?data=${encodedData}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white transition-colors mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600 mb-3 sm:mb-4">
            🏁 Quick Race
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Add restaurants manually and let fate decide where to eat!
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10">
          <ManualRestaurantInput onAdd={handleAddRestaurant} buttonText="Add" />

          <div className="mt-4 sm:mt-6 md:mt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              🍽️ Participants ({restaurants.length})
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
              💡 Click on emoji to change • Click{" "}
              <span className="text-green-400 font-bold">+</span> to add
              multiple people picking the same restaurant
            </p>

            {restaurants.length === 0 ? (
              <div className="text-center py-8 sm:py-12 text-gray-400">
                <p className="text-base sm:text-lg mb-2">No restaurants yet!</p>
                <p className="text-xs sm:text-sm">
                  Add at least 2 to start racing 🏎️
                </p>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {restaurants.map((restaurant, index) => (
                  <ParticipantItem
                    key={restaurant.id}
                    id={restaurant.id}
                    index={index}
                    name={restaurant.name}
                    address="Manually added"
                    emoji={restaurant.emoji}
                    onEmojiChange={handleUpdateEmoji}
                    onAddInstance={handleAddAnotherInstance}
                    onRemove={handleRemoveRestaurant}
                    showAddButton={true}
                  />
                ))}
              </div>
            )}

            {restaurants.length >= 2 && (
              <button
                onClick={handleStartRace}
                className="w-full py-3 sm:py-4 bg-linear-to-r from-orange-500 to-red-600 text-white rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-red-700 transition-all font-bold text-lg sm:text-xl shadow-lg hover:shadow-orange-500/50 transform hover:scale-105"
              >
                🏁 Start Race!
              </button>
            )}

            {restaurants.length === 1 && (
              <div className="text-center text-yellow-400 bg-yellow-500/10 rounded-lg p-3 sm:p-4 text-sm sm:text-base">
                ⚠️ Add at least one more restaurant to start!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
