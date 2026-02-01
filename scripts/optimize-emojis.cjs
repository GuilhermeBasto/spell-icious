#!/usr/bin/env node

/**
 * Script to optimize custom emoji images
 *
 * This script:
 * - Converts all images to PNG format
 * - Resizes to 200x200px (optimal for display)
 * - Optimizes file size
 * - Ensures consistent quality
 *
 * Usage:
 *   node scripts/optimize-emojis.cjs
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const BACKUP_DIR = path.join(__dirname, "../public/emojis-backup");
const OUTPUT_DIR = path.join(__dirname, "../public/emojis");
const TARGET_SIZE = 200; // 200x200px

async function optimizeImage(inputPath, outputPath) {
  try {
    const filename = path.basename(inputPath);
    console.log(`📸 Processing: ${filename}`);

    await sharp(inputPath)
      .resize(TARGET_SIZE, TARGET_SIZE, {
        fit: "cover",
        position: "center",
      })
      .png({
        quality: 90,
        compressionLevel: 9,
      })
      .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savedBytes = inputStats.size - outputStats.size;
    const savedPercent = ((savedBytes / inputStats.size) * 100).toFixed(1);

    console.log(
      `   ✅ ${filename}: ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (saved ${savedPercent}%)`,
    );
  } catch (error) {
    console.error(
      `   ❌ Error processing ${path.basename(inputPath)}:`,
      error.message,
    );
  }
}

async function processAllImages() {
  console.log("🚀 Starting emoji optimization...\n");

  // Check if sharp is installed
  try {
    require.resolve("sharp");
  } catch (e) {
    console.error("❌ Error: sharp is not installed.");
    console.error("   Please run: npm install --save-dev sharp");
    process.exit(1);
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all image files from backup directory
  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

  if (files.length === 0) {
    console.log("⚠️  No images found in emojis-backup directory");
    return;
  }

  console.log(`Found ${files.length} images to process\n`);

  // Process each image
  for (const file of files) {
    const inputPath = path.join(BACKUP_DIR, file);
    const outputFilename = file.replace(/\.(jpg|jpeg|webp)$/i, ".png");
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    await optimizeImage(inputPath, outputPath);
  }

  console.log("\n✨ All images processed successfully!");
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
}

// Run the script
processAllImages().catch((error) => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
