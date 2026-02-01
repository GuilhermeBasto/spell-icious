/**
 * Replace original images with optimized versions
 * Backs up originals to emojis-backup/
 */

const fs = require("fs");
const path = require("path");

const EMOJIS_DIR = path.join(__dirname, "../public/emojis");
const OPTIMIZED_DIR = path.join(__dirname, "../public/emojis-optimized");
const BACKUP_DIR = path.join(__dirname, "../public/emojis-backup");

function replaceWithOptimized() {
  console.log("🔄 Replacing images with optimized versions...\n");

  if (!fs.existsSync(OPTIMIZED_DIR)) {
    console.error("❌ Optimized directory not found:", OPTIMIZED_DIR);
    console.error("   Run: npm run optimize-images first");
    process.exit(1);
  }

  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const originalFiles = fs.readdirSync(EMOJIS_DIR);
  const imageFiles = originalFiles.filter(
    (f) => f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg"),
  );

  console.log(`📦 Backing up ${imageFiles.length} original images...\n`);

  for (const file of imageFiles) {
    const sourcePath = path.join(EMOJIS_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    fs.copyFileSync(sourcePath, backupPath);
    console.log(`   ✅ Backed up: ${file}`);
  }

  console.log(`\n🔄 Replacing with optimized versions...\n`);

  const optimizedFiles = fs.readdirSync(OPTIMIZED_DIR);
  let replaced = 0;

  for (const file of optimizedFiles) {
    if (file.endsWith(".png")) {
      const sourcePath = path.join(OPTIMIZED_DIR, file);
      const targetPath = path.join(EMOJIS_DIR, file);
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`   ✅ Replaced: ${file}`);
      replaced++;
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`   Replaced ${replaced} images`);
  console.log(`   Originals backed up to: public/emojis-backup/`);
  console.log(`\n📝 To revert: npm run restore-original-images\n`);

  fs.rmSync(OPTIMIZED_DIR, { recursive: true, force: true });
  console.log("🧹 Cleaned up temporary optimized directory\n");
}

replaceWithOptimized();
