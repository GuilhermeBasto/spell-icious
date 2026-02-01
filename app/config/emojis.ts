/**
 * Auto-generated emoji configuration
 * Run: npm run generate-emojis to update
 * Generated: 2026-02-01T18:47:46.394Z
 */

// Standard food emojis
export const FOOD_EMOJIS = [
  "🍕",
  "🍔",
  "🍣",
  "🍜",
  "🍝",
  "🌮",
  "🥗",
  "🍱",
  "🥘",
  "🍲",
  "🍛",
  "🥙",
  "🌯",
  "🥪",
  "🍖",
  "🍗",
  "🥩",
  "🦞",
  "🦐",
  "🐟",
  "🍤",
  "🦀",
  "🥟",
  "🍢",
  "🍡",
  "🧆",
  "🥚",
  "🍳",
  "🧀",
  "🥓",
  "🥐",
  "🥨",
] as const;

// Custom emoji images (auto-detected)
export const CUSTOM_EMOJIS = [
  "/emojis/bruno.png",
  "/emojis/gui.png",
  "/emojis/iolapicks.png",
  "/emojis/jessica.png",
  "/emojis/joao.png",
  "/emojis/mariana.png",
  "/emojis/patricia.png",
  "/emojis/pedro.png",
  "/emojis/rui.png",
  "/emojis/ze.png",
] as const;

// All emojis combined
export const ALL_EMOJIS = [...FOOD_EMOJIS, ...CUSTOM_EMOJIS] as const;

// Helper to check if emoji is an image
export function isEmojiImage(emoji: string): boolean {
  return emoji.startsWith("/") || emoji.startsWith("data:image/");
}

// Get emoji display name
export function getEmojiName(emoji: string): string {
  if (emoji.startsWith("/emojis/")) {
    return emoji.replace("/emojis/", "").replace(/\.[^.]+$/, "");
  }
  if (emoji.startsWith("data:image/")) {
    return "Anonymous";
  }
  return emoji;
}
