import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import type { Route } from "./+types/home";
import { useRestaurants } from "../contexts/RestaurantsAPIContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Spell-icious 🪄 - Magical lunch decisions!" },
    {
      name: "description",
      content:
        "Cast a spell and let magic decide where to have lunch with your team",
    },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const { setSelectedRestaurants, setRestaurants } = useRestaurants();
  const [address, setAddress] = useState("");
  const [radius, setRadius] = useState(1000);

  useEffect(() => {
    setSelectedRestaurants([]);
    setRestaurants([]);
  }, [setSelectedRestaurants, setRestaurants]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (address.trim()) {
      navigate(
        `/select?address=${encodeURIComponent(address)}&radius=${radius}`,
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="inline-block mb-6"
          >
            <div className="text-6xl mb-4">🪄✨</div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl font-bold text-orange-600 dark:text-orange-500 mb-4"
          >
            Spell-icious
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Cast a spell and let magic decide where you'll have lunch today!
          </motion.p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          {/* Quick Race CTA - Prominent position */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="bg-linear-to-r from-orange-500/90 to-red-600/90 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-400 shadow-xl">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left text-white">
                  <h3 className="text-2xl font-black mb-1 drop-shadow-md">
                    ⚡ Quick Race Mode
                  </h3>
                  <p className="text-orange-50 font-medium">
                    Skip the search! Add restaurants manually and race instantly
                  </p>
                </div>
                <motion.button
                  onClick={() => navigate("/quick-race")}
                  className="bg-white hover:bg-orange-50 text-orange-600 font-bold py-3 px-8 rounded-xl shadow-lg whitespace-nowrap border-2 border-white"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  🏁 Start Quick Race
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              OR
            </span>
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
          </div>

          {/* Search Form */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address Input */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  📍 Address or Location
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="E.g., Liberty Avenue, Lisbon"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900 outline-none transition-all"
                  required
                />

                {/* Atalho Blip */}
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(
                      `/select?address=${encodeURIComponent("Av. de Camilo 94, 4300-095 Porto")}&radius=${radius}`,
                    );
                  }}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800 transition-colors group"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    className="text-lg"
                    animate={{
                      rotate: [0, -10, 10, -10, 10, 0],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  >
                    🏢
                  </motion.span>
                  <span className="flex flex-col items-start">
                    <span className="font-semibold">Blip</span>
                    <span className="text-xs opacity-70">
                      Av. de Camilo 94, Porto
                    </span>
                  </span>
                  <motion.span
                    className="ml-auto text-blue-400"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>

              {/* Radius Slider */}
              <div>
                <label
                  htmlFor="radius"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  📏 Search Radius: {radius}m
                </label>
                <input
                  type="range"
                  id="radius"
                  min="500"
                  max="5000"
                  step="250"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>500m</span>
                  <span>5km</span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                🔍 Search Restaurants
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: "🗺️",
              title: "Discover",
              desc: "Restaurants in your area",
              delay: 0.4,
            },
            {
              icon: "✨",
              title: "Choose",
              desc: "Your favorites",
              delay: 0.5,
            },
            {
              icon: "🏁",
              title: "Race",
              desc: "Let fate decide",
              delay: 0.6,
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700 cursor-pointer"
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
