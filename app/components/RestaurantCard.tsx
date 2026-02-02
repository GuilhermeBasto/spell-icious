/**
 * Restaurant Card Component
 * Displays restaurant information in a beautiful card
 */

import { useState, useRef } from "react";
import { FOOD_EMOJIS, CUSTOM_EMOJIS, isEmojiImage } from "../config/emojis";
import { getGoogleMapsUrl } from "./race/utils";

interface RestaurantCardProps {
  name: string;
  address: string;
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number;
  types?: string[];
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  customEmoji?: string;
  onEmojiChange?: (emoji: string) => void;
  // New OSM fields
  openingHours?: string;
  phone?: string;
  website?: string;
  takeaway?: string;
  delivery?: string;
  outdoorSeating?: string;
  brand?: string;
  cuisine?: string;
  // Coordinates for Google Maps
  lat?: number;
  lng?: number;
}

export default function RestaurantCard({
  name,
  address,
  rating,
  userRatingsTotal,
  priceLevel,
  types,
  isSelected = false,
  onClick,
  className = "",
  customEmoji,
  onEmojiChange,
  openingHours,
  phone,
  website,
  takeaway,
  delivery,
  outdoorSeating,
  brand,
  cuisine,
  lat,
  lng,
}: RestaurantCardProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleEmojiSelect = (emoji: string) => {
    if (onEmojiChange) {
      onEmojiChange(emoji);
    }
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (onEmojiChange) {
        onEmojiChange(base64String);
      }
      setShowEmojiPicker(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const isCustomImage =
    customEmoji?.startsWith("data:image/") || customEmoji?.startsWith("/");

  return (
    <div className="relative h-full flex flex-col">
      <div
        onClick={onClick}
        className={`text-left p-5 rounded-2xl border-2 transition-all transform hover:scale-105 active:scale-95 w-full cursor-pointer flex flex-col h-full ${
          isSelected
            ? "bg-orange-50 dark:bg-orange-950/20 border-orange-500 shadow-lg ring-2 ring-orange-200 dark:ring-orange-900/50"
            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
        } ${className}`}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            {customEmoji &&
              (isCustomImage ? (
                <img
                  src={customEmoji}
                  alt="Custom emoji"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl">{customEmoji}</span>
              ))}
            <h3
              className={`font-bold text-xl ${
                isSelected
                  ? "text-orange-900 dark:text-orange-100"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {name}
            </h3>
          </div>
          {isSelected && (
            <span className="text-2xl text-orange-600 dark:text-orange-400">
              ✓
            </span>
          )}
        </div>

        <p
          className={`text-sm mb-3 flex items-start gap-1 ${
            isSelected
              ? "text-orange-800 dark:text-orange-200"
              : "text-gray-600 dark:text-gray-400"
          }`}
        >
          <span className="text-base shrink-0">📍</span>
          <span>{address}</span>
        </p>

        {/* Tags de tipo/cozinha */}
        {types && types.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {types.slice(0, 3).map((type, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isSelected
                    ? "bg-orange-200 dark:bg-orange-900/40 text-orange-900 dark:text-orange-100"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {type}
              </span>
            ))}
          </div>
        )}

        {/* Additional Info: Opening Hours, Phone, Features */}
        <div className="space-y-2 mb-3 grow">
          {/* Opening Hours */}
          {openingHours && (
            <div className="flex items-start gap-2 text-xs">
              <span className="shrink-0">🕐</span>
              <span
                className={
                  isSelected
                    ? "text-orange-700 dark:text-orange-300"
                    : "text-gray-600 dark:text-gray-400"
                }
              >
                {openingHours}
              </span>
            </div>
          )}

          {/* Phone */}
          {phone && (
            <div className="flex items-start gap-2 text-xs">
              <span className="shrink-0">📞</span>
              <span
                className={
                  isSelected
                    ? "text-orange-700 dark:text-orange-300"
                    : "text-gray-600 dark:text-gray-400"
                }
              >
                {phone}
              </span>
            </div>
          )}

          {/* Features: Delivery, Takeaway, Outdoor Seating */}
          {(delivery === "yes" ||
            takeaway === "yes" ||
            outdoorSeating === "yes") && (
            <div className="flex flex-wrap gap-1.5">
              {delivery === "yes" && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                    isSelected
                      ? "bg-green-200 dark:bg-green-900/40 text-green-900 dark:text-green-100"
                      : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                  }`}
                >
                  🚚 Delivery
                </span>
              )}
              {takeaway === "yes" && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                    isSelected
                      ? "bg-blue-200 dark:bg-blue-900/40 text-blue-900 dark:text-blue-100"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  }`}
                >
                  🥡 Takeaway
                </span>
              )}
              {outdoorSeating === "yes" && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                    isSelected
                      ? "bg-purple-200 dark:bg-purple-900/40 text-purple-900 dark:text-purple-100"
                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  }`}
                >
                  ☀️ Outdoor
                </span>
              )}
            </div>
          )}
        </div>

        {/* CTAs Section */}
        <div className="space-y-2 mb-4">
          {/* Website Link */}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`w-full py-2.5 px-4 rounded-lg border-2 font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${
                isSelected
                  ? "border-orange-400 bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-300 hover:border-orange-500 hover:bg-orange-100 dark:hover:bg-orange-950/50"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-lg">🌐</span>
              <span>Visit Website</span>
            </a>
          )}

          {/* Google Maps Button */}
          <a
            href={getGoogleMapsUrl(name, address, lat, lng)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-sm ${
              isSelected
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <span className="text-lg">🗺️</span>
            <span>View on Google Maps</span>
          </a>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {rating && (
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={isSelected ? "text-yellow-200" : "text-yellow-500"}
                >
                  ⭐
                </span>
                <span
                  className={`text-sm font-semibold ${
                    isSelected
                      ? "text-orange-900 dark:text-orange-100"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {rating.toFixed(1)}
                </span>
                {userRatingsTotal && (
                  <span
                    className={`text-xs ${
                      isSelected
                        ? "text-orange-700 dark:text-orange-300"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    ({userRatingsTotal})
                  </span>
                )}
              </div>
            )}

            {priceLevel && (
              <div>
                <span
                  className={`text-sm font-semibold ${
                    isSelected
                      ? "text-orange-800 dark:text-orange-200"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {"€".repeat(priceLevel)}
                  <span
                    className={
                      isSelected
                        ? "text-orange-400 dark:text-orange-600"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  >
                    {"€".repeat(4 - priceLevel)}
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isSelected && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEmojiPicker(!showEmojiPicker);
                }}
                className="bg-orange-500 hover:bg-orange-600 rounded-lg px-4 py-2 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-sm"
                title="Pick your icon"
              >
                {isCustomImage ? (
                  <img
                    src={customEmoji}
                    alt="Custom"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xl">{customEmoji || "🍽️"}</span>
                )}
                <span className="text-white text-sm font-semibold">
                  Pick Your Icon
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {showEmojiPicker && isSelected && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border-2 border-green-500 rounded-xl shadow-xl p-4 z-50 max-h-96 overflow-y-auto">
          <div className="mb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
              className="w-full py-3 bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="text-xl">📸</span>
              <span>Upload Custom Image</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              JPG, PNG, WebP • Max 5MB
            </p>
          </div>

          {/* Our Custom Team Images */}
          <div className="mb-4">
            <p className="text-sm font-bold text-orange-600 dark:text-orange-500 mb-3 text-center">
              😎 Who's picking lunch today?
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-w-md mx-auto">
              {CUSTOM_EMOJIS.map((emoji, index) => (
                <button
                  key={emoji}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmojiSelect(emoji);
                  }}
                  className="hover:scale-110 transition-transform active:scale-95 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent hover:border-orange-400"
                  title={`Team member ${index + 1}`}
                >
                  <img
                    src={emoji}
                    alt={`Team member ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-2">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 text-center">
              Or choose a food emoji:
            </p>
          </div>

          <div className="grid grid-cols-8 gap-2">
            {FOOD_EMOJIS.map((emoji, index) => (
              <button
                key={emoji}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEmojiSelect(emoji);
                }}
                className="hover:scale-125 transition-transform active:scale-95 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center"
                title={emoji}
              >
                {isEmojiImage(emoji) ? (
                  <img
                    src={emoji}
                    alt={`Custom emoji ${index}`}
                    className="w-8 h-8 object-cover rounded"
                  />
                ) : (
                  <span className="text-2xl">{emoji}</span>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowEmojiPicker(false);
            }}
            className="mt-3 w-full py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
