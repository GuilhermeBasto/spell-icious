#!/usr/bin/env node

/**
 * Complete Image Processing Script
 * Automates the entire workflow:
 * 1. Optimize images
 * 2. Apply optimizations
 * 3. Regenerate emoji config
 * 4. Clean up
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const EMOJIS_DIR = path.join(__dirname, "../public/emojis");
const BACKUP_DIR = path.join(__dirname, "../public/emojis-backup");

function run(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    execSync(command, { stdio: "inherit" });
    console.log(`✅ ${description} - Done!`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} - Failed!`);
    return false;
  }
}

function checkForNewImages() {
  const files = fs.readdirSync(EMOJIS_DIR);
  const imageFiles = files.filter(
    (f) => f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg"),
  );

  const backupExists = fs.existsSync(BACKUP_DIR);
  if (backupExists) {
    const backupFiles = fs.readdirSync(BACKUP_DIR);
    const newImages = imageFiles.filter((f) => !backupFiles.includes(f));
    return { total: imageFiles.length, new: newImages };
  }

  return { total: imageFiles.length, new: imageFiles };
}

async function main() {
  console.log("\n");
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║                                               ║");
  console.log("║   🎨 Complete Image Processing Pipeline       ║");
  console.log("║                                               ║");
  console.log("╚═══════════════════════════════════════════════╝");

  const { total, new: newImages } = checkForNewImages();

  console.log(`\n📊 Status:`);
  console.log(`   Total images: ${total}`);
  console.log(`   New images: ${newImages.length}`);

  if (newImages.length > 0) {
    console.log(`\n📸 New images found:`);
    newImages.forEach((img) => console.log(`   • ${img}`));
  }

  console.log("\n🚀 Starting automated pipeline...\n");
  console.log("════════════════════════════════════════════════\n");

  // Step 1: Optimize images
  if (!run("npm run optimize-images", "Step 1/3: Optimizing images")) {
    process.exit(1);
  }

  console.log("\n════════════════════════════════════════════════\n");

  // Step 2: Apply optimizations
  if (
    !run("npm run use-optimized-images", "Step 2/3: Applying optimized images")
  ) {
    process.exit(1);
  }

  console.log("\n════════════════════════════════════════════════\n");

  // Step 3: Regenerate emoji config
  if (!run("npm run generate-emojis", "Step 3/3: Regenerating emoji config")) {
    process.exit(1);
  }

  console.log("\n════════════════════════════════════════════════\n");

  console.log("\n✨ Pipeline Complete!\n");
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║                                               ║");
  console.log("║   🎉 All images processed successfully!       ║");
  console.log("║                                               ║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  console.log("📋 Summary:");
  console.log(`   ✅ ${total} images optimized`);
  console.log(`   ✅ Backup created in public/emojis-backup/`);
  console.log(`   ✅ Emoji config regenerated`);

  console.log("\n💡 Next steps:");
  console.log("   • Run: npm run dev");
  console.log("   • Test the app in your browser");
  console.log("   • If issues: npm run restore-original-images\n");
}

main().catch((error) => {
  console.error("\n❌ Pipeline failed:", error.message);
  process.exit(1);
});
