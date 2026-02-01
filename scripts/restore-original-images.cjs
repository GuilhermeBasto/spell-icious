/**
 * Restore original images from backup
 */

const fs = require("fs");
const path = require("path");

const EMOJIS_DIR = path.join(__dirname, "../public/emojis");
const BACKUP_DIR = path.join(__dirname, "../public/emojis-backup");

function restoreOriginals() {
  console.log("♻️  Restoring original images...\n");

  if (!fs.existsSync(BACKUP_DIR)) {
    console.error("❌ Backup directory not found:", BACKUP_DIR);
    console.error("   No backup available to restore");
    process.exit(1);
  }

  const backupFiles = fs.readdirSync(BACKUP_DIR);
  const imageFiles = backupFiles.filter(
    (f) => f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg"),
  );

  console.log(`📦 Restoring ${imageFiles.length} original images...\n`);

  for (const file of imageFiles) {
    const backupPath = path.join(BACKUP_DIR, file);
    const targetPath = path.join(EMOJIS_DIR, file);
    fs.copyFileSync(backupPath, targetPath);
    console.log(`   ✅ Restored: ${file}`);
  }

  console.log(`\n🎉 Done! Original images restored\n`);
}

restoreOriginals();
