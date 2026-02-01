/**
 * Image Optimization Script
 * Uses Sharp to optimize emoji images
 * - Resizes to 256x256px (optimized for web)
 * - Converts to WebP (better compression)
 * - Keeps optimized PNG as fallback
 * - Reduces file size by 60-80%
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const EMOJIS_DIR = path.join(__dirname, "../public/emojis");
const OPTIMIZED_DIR = path.join(__dirname, "../public/emojis-optimized");
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg"];

const TARGET_SIZE = 256;
const WEBP_QUALITY = 85;
const PNG_QUALITY = 90;

async function optimizeImages() {
  console.log("🎨 Starting image optimization...\n");

  if (!fs.existsSync(EMOJIS_DIR)) {
    console.error("❌ Emojis directory not found:", EMOJIS_DIR);
    process.exit(1);
  }

  if (!fs.existsSync(OPTIMIZED_DIR)) {
    fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
  }

  const files = fs.readdirSync(EMOJIS_DIR);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log("⚠️  No images found to optimize");
    return;
  }

  console.log(`📸 Found ${imageFiles.length} images to optimize\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(EMOJIS_DIR, file);
    const basename = path.parse(file).name;
    const outputWebP = path.join(OPTIMIZED_DIR, `${basename}.webp`);
    const outputPng = path.join(OPTIMIZED_DIR, `${basename}.png`);

    try {
      const originalStats = fs.statSync(inputPath);
      const originalSize = originalStats.size;
      totalOriginalSize += originalSize;

      const image = sharp(inputPath);
      const metadata = await image.metadata();

      await image
        .resize(TARGET_SIZE, TARGET_SIZE, {
          fit: "cover",
          position: "center",
        })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputWebP);

      await sharp(inputPath)
        .resize(TARGET_SIZE, TARGET_SIZE, {
          fit: "cover",
          position: "center",
        })
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toFile(outputPng);

      const webpStats = fs.statSync(outputWebP);
      const pngStats = fs.statSync(outputPng);
      const webpSize = webpStats.size;
      const pngSize = pngStats.size;
      totalOptimizedSize += Math.min(webpSize, pngSize);

      const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

      console.log(`✅ ${file}`);
      console.log(
        `   ${metadata.width}x${metadata.height} → ${TARGET_SIZE}x${TARGET_SIZE}`,
      );
      console.log(
        `   ${formatBytes(originalSize)} → ${formatBytes(webpSize)} (WebP) | ${formatBytes(pngSize)} (PNG)`,
      );
      console.log(`   💾 Saved ${savings}% with WebP\n`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  const totalSavings = (
    (1 - totalOptimizedSize / totalOriginalSize) *
    100
  ).toFixed(1);

  console.log("🎉 Optimization complete!\n");
  console.log(`📊 Summary:`);
  console.log(`   Original:  ${formatBytes(totalOriginalSize)}`);
  console.log(`   Optimized: ${formatBytes(totalOptimizedSize)}`);
  console.log(`   💾 Total savings: ${totalSavings}%\n`);

  console.log("📝 Next steps:");
  console.log("   1. Review optimized images in public/emojis-optimized/");
  console.log("   2. If satisfied, run: npm run use-optimized-images");
  console.log("   3. This will replace originals with optimized versions\n");
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

optimizeImages().catch((error) => {
  console.error("❌ Optimization failed:", error);
  process.exit(1);
});
