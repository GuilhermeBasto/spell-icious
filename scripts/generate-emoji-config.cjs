#!/usr/bin/env node

/**
 * Script to automatically generate emoji configuration
 * Scans /public/emojis/ and creates a config file with all available images
 */

const fs = require("fs");
const path = require("path");

const EMOJIS_DIR = path.join(__dirname, "../public/emojis");
const OUTPUT_FILE = path.join(__dirname, "../app/config/emojis.ts");

// Supported image formats
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];

// Files to ignore
const IGNORE_FILES = ["favicon.ico", "mockServiceWorker.js"];

function scanEmojisDirectory() {
  if (!fs.existsSync(EMOJIS_DIR)) {
    console.error("❌ Emojis directory not found:", EMOJIS_DIR);
    process.exit(1);
  }

  const files = fs.readdirSync(EMOJIS_DIR);

  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext) && !IGNORE_FILES.includes(file);
  });

  console.log(`✅ Found ${imageFiles.length} emoji images`);

  return imageFiles.map((file) => `/emojis/${file}`);
}

function generateConfig(customEmojis) {
  const config = `/**
 * Auto-generated emoji configuration
 * Run: npm run generate-emojis to update
 * Generated: ${new Date().toISOString()}
 */

// Standard food emojis
export const FOOD_EMOJIS = [
  "🍕", "🍔", "🍣", "🍜", "🍝", "🌮", "🥗", "🍱", 
  "🥘", "🍲", "🍛", "🥙", "🌯", "🥪", "🍖", "🍗",
  "🥩", "🦞", "🦐", "🐟", "🍤", "🦀", "🥟", "🍢",
  "🍡", "🧆", "🥚", "🍳", "🧀", "🥓", "🥐", "🥨",
] as const;

// Custom emoji images (auto-detected)
export const CUSTOM_EMOJIS = [
${customEmojis.map((emoji) => `  "${emoji}",`).join("\n")}
] as const;

// All emojis combined
export const ALL_EMOJIS = [...FOOD_EMOJIS, ...CUSTOM_EMOJIS] as const;

// Helper to check if emoji is an image
export function isEmojiImage(emoji: string): boolean {
  return emoji.startsWith('/') || emoji.startsWith('data:image/');
}

// Get emoji display name
export function getEmojiName(emoji: string): string {
  if (emoji.startsWith('/emojis/')) {
    return emoji.replace('/emojis/', '').replace(/\\.[^.]+$/, '');
  }
  return emoji;
}
`;

  return config;
}

function main() {
  console.log("🎨 Generating emoji configuration...\n");

  // Scan directory
  const customEmojis = scanEmojisDirectory();

  // Generate config
  const config = generateConfig(customEmojis);

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write config file
  fs.writeFileSync(OUTPUT_FILE, config, "utf8");

  console.log(`\n✅ Generated: ${OUTPUT_FILE}`);
  console.log("\n📋 Custom emojis:");
  customEmojis.forEach((emoji) => console.log(`   - ${emoji}`));
  console.log("\n🎉 Done!\n");
}

main();
