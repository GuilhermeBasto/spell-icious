import { useState, useRef } from "react";
import { FOOD_EMOJIS, CUSTOM_EMOJIS } from "../config/emojis";

interface ManualRestaurantInputProps {
  onAdd: (restaurant: { name: string; emoji: string }) => void;
  buttonText?: string;
}

export default function ManualRestaurantInput({
  onAdd,
  buttonText = "Add Restaurant",
}: ManualRestaurantInputProps) {
  const [customName, setCustomName] = useState("");
  const [customEmoji, setCustomEmoji] = useState("🍽️");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setCustomEmoji(base64String);
      setShowEmojiPicker(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAdd = () => {
    if (!customName.trim()) return;

    onAdd({
      name: customName.trim(),
      emoji: customEmoji,
    });

    setCustomName("");
    setCustomEmoji("🍽️");
  };

  return (
    <div className="mb-6 relative">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Add Manual Restaurant
      </label>

      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 hover:border-orange-500 transition-colors flex items-center gap-2"
          type="button"
        >
          {customEmoji.startsWith("data:image/") ||
          customEmoji.startsWith("/") ? (
            <img
              src={customEmoji}
              alt="Selected"
              className="w-6 h-6 rounded object-cover"
            />
          ) : (
            <span className="text-xl">{customEmoji}</span>
          )}
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {customEmoji !== "🍽️" ? "Change" : "Pick emoji"}
          </span>
        </button>
      </div>

      {showEmojiPicker && (
        <div className="absolute z-50 bg-white dark:bg-gray-800 border-2 border-orange-500 rounded-xl shadow-xl p-4 mb-2 max-h-64 overflow-y-auto">
          <div className="mb-3">
            <button
              onClick={triggerFileInput}
              className="w-full mb-3 py-2 px-4 bg-linear-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all font-semibold text-sm"
              type="button"
            >
              📸 Upload Custom Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="mb-3">
            <p className="text-xs font-bold text-orange-600 dark:text-orange-500 mb-2">
              😎 Pick your face!
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-w-sm mx-auto mb-3">
              {CUSTOM_EMOJIS.map((emoji, index) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setCustomEmoji(emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="hover:scale-110 transition-transform p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent hover:border-orange-400"
                  type="button"
                >
                  <img
                    src={emoji}
                    alt={`Team ${index + 1}`}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
              Or a food emoji:
            </p>
            <div className="grid grid-cols-6 gap-1">
              {FOOD_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setCustomEmoji(emoji);
                    setShowEmojiPicker(false);
                  }}
                  className="hover:scale-125 transition-transform p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-xl"
                  type="button"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Restaurant name..."
          className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-orange-500 focus:outline-none transition-colors"
        />
        <button
          onClick={handleAdd}
          disabled={!customName.trim()}
          className="px-6 py-2 bg-linear-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
