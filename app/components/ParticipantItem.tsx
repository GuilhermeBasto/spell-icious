/**
 * Participant Item Component
 * Reusable component for displaying and editing restaurant participants
 */

import { useState } from "react";
import { FOOD_EMOJIS, CUSTOM_EMOJIS } from "../config/emojis";
import Avatar from "./Avatar";

interface ParticipantItemProps {
  id: string;
  index: number;
  name: string;
  address?: string;
  emoji?: string;
  onEmojiChange: (id: string, emoji: string) => void;
  onAddInstance?: (id: string) => void;
  onRemove: (id: string) => void;
  showAddButton?: boolean;
}

export default function ParticipantItem({
  id,
  index,
  name,
  address,
  emoji,
  onEmojiChange,
  onAddInstance,
  onRemove,
  showAddButton = true,
}: ParticipantItemProps) {
  const [isEditingEmoji, setIsEditingEmoji] = useState(false);

  const handleEmojiSelect = (selectedEmoji: string) => {
    onEmojiChange(id, selectedEmoji);
    setIsEditingEmoji(false);
  };

  return (
    <div className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-600">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400 dark:text-gray-500 flex-shrink-0">
            #{index + 1}
          </span>

          {/* Emoji Button - clickable to change */}
          <Avatar
            src={emoji}
            emoji={emoji}
            alt={name}
            size="md"
            onClick={() => setIsEditingEmoji(true)}
            showEditIcon
            fallbackIcon="🍽️"
            className="sm:w-10 sm:h-10"
          />

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200 truncate">
              {name}
            </p>
            {address && (
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {address}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          {showAddButton && onAddInstance && (
            <button
              onClick={() => onAddInstance(id)}
              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-bold text-lg sm:text-xl px-1.5 sm:px-2 py-1 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
              title="Add another person picking this restaurant"
            >
              +
            </button>
          )}
          <button
            onClick={() => onRemove(id)}
            className="text-red-500 hover:text-red-600 font-bold text-lg sm:text-xl px-1.5 sm:px-2 py-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
            title="Remove"
          >
            ×
          </button>
        </div>
      </div>

      {/* Emoji Picker Dropdown */}
      {isEditingEmoji && (
        <div className="mt-2 sm:mt-3 bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border-2 border-orange-500 shadow-lg">
          <p className="text-xs sm:text-sm font-semibold text-orange-600 dark:text-orange-500 mb-2 sm:mb-3">
            Choose a new emoji:
          </p>

          {/* Custom Team Emojis */}
          <div className="mb-3 sm:mb-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Team faces:
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2">
              {CUSTOM_EMOJIS.map((emojiOption) => (
                <button
                  key={emojiOption}
                  onClick={() => handleEmojiSelect(emojiOption)}
                  className="hover:scale-110 active:scale-95 transition-transform p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent hover:border-orange-400"
                >
                  <img
                    src={emojiOption}
                    alt="Team member"
                    className="w-full aspect-square object-cover rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Food Emojis */}
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              Food emojis:
            </p>
            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
              {FOOD_EMOJIS.map((emojiOption) => (
                <button
                  key={emojiOption}
                  onClick={() => handleEmojiSelect(emojiOption)}
                  className="text-2xl sm:text-3xl hover:scale-125 active:scale-95 transition-transform p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {emojiOption}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsEditingEmoji(false)}
            className="mt-3 w-full py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
