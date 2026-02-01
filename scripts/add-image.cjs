#!/usr/bin/env node

/**
 * Interactive Image Addition Script
 * Helps add new emoji images with guided workflow
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const EMOJIS_DIR = path.join(__dirname, "../public/emojis");

function prompt(question) {
  process.stdout.write(question + " ");
  return new Promise((resolve) => {
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim());
    });
  });
}

function copyImage(sourcePath, destinationName) {
  const destination = path.join(EMOJIS_DIR, destinationName);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`Source file not found: ${sourcePath}`);
  }

  fs.copyFileSync(sourcePath, destination);
  return destination;
}

async function main() {
  console.log("\n");
  console.log("╔═══════════════════════════════════════════════╗");
  console.log("║                                               ║");
  console.log("║   📸 Add New Emoji Image                      ║");
  console.log("║                                               ║");
  console.log("╚═══════════════════════════════════════════════╝\n");

  console.log("This script will help you add a new emoji image.\n");

  // Get source path
  const sourcePath = await prompt(
    "📁 Enter the path to your image (drag & drop works):",
  );

  if (!sourcePath) {
    console.log("\n❌ No path provided. Exiting.\n");
    process.exit(1);
  }

  const cleanPath = sourcePath.replace(/^['"]|['"]$/g, "").trim();

  if (!fs.existsSync(cleanPath)) {
    console.log(`\n❌ File not found: ${cleanPath}\n`);
    process.exit(1);
  }

  // Get file info
  const stats = fs.statSync(cleanPath);
  const ext = path.extname(cleanPath).toLowerCase();
  const basename = path.basename(cleanPath, ext);

  console.log(`\n✅ Found: ${path.basename(cleanPath)}`);
  console.log(`   Size: ${(stats.size / 1024).toFixed(1)} KB`);

  if (![".png", ".jpg", ".jpeg"].includes(ext)) {
    console.log(
      `\n⚠️  Warning: ${ext} files may not be supported. PNG recommended.\n`,
    );
  }

  // Get destination name
  const defaultName = `${basename}.png`;
  const destName = await prompt(`\n💾 Save as (default: ${defaultName}):`);

  const finalName = destName || defaultName;

  if (!finalName.endsWith(".png")) {
    console.log(
      "\n⚠️  Warning: File will be saved with .png extension for consistency.\n",
    );
  }

  const finalFileName = finalName.endsWith(".png")
    ? finalName
    : finalName + ".png";

  // Check if exists
  const destPath = path.join(EMOJIS_DIR, finalFileName);
  if (fs.existsSync(destPath)) {
    const overwrite = await prompt(
      `\n⚠️  ${finalFileName} already exists. Overwrite? (y/n):`,
    );
    if (overwrite.toLowerCase() !== "y") {
      console.log("\n❌ Cancelled.\n");
      process.exit(0);
    }
  }

  // Copy file
  console.log(`\n📋 Copying to public/emojis/...`);
  copyImage(cleanPath, finalFileName);
  console.log(`✅ Copied: ${finalFileName}\n`);

  // Ask to process
  const process = await prompt(
    "🚀 Process images now (optimize + regenerate config)? (y/n):",
  );

  if (process.toLowerCase() === "y") {
    console.log("\n🔄 Starting automated processing...\n");
    try {
      execSync("npm run process-images", { stdio: "inherit" });
    } catch (error) {
      console.error("\n❌ Processing failed!");
      process.exit(1);
    }
  } else {
    console.log("\n💡 To process images later, run:");
    console.log("   npm run process-images\n");
  }

  console.log("\n✨ Done!\n");
  process.stdin.end();
}

// Enable stdin
process.stdin.setRawMode(false);
process.stdin.resume();

main().catch((error) => {
  console.error("\n❌ Error:", error.message, "\n");
  process.exit(1);
});
