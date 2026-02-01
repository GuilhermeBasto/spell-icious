# Custom Emoji Images - Generated & Optimized

This directory contains optimized profile images for the Spell-icious race participants.

## 📊 Optimization Results

All images have been:

- ✅ **Resized** to 200x200px (optimal display size)
- ✅ **Converted** to PNG format (best quality/size ratio)
- ✅ **Compressed** with level 9 compression
- ✅ **Optimized** reducing file sizes by 60-94%

### File Size Comparison

| Name      | Original | Optimized | Saved |
| --------- | -------- | --------- | ----- |
| bruno     | 258.5 KB | 18.2 KB   | 93.0% |
| jessica   | 291.5 KB | 16.9 KB   | 94.2% |
| rui       | 69.5 KB  | 17.4 KB   | 75.0% |
| mariana   | 35.4 KB  | 12.0 KB   | 66.1% |
| patricia  | 36.5 KB  | 12.7 KB   | 65.3% |
| gui       | 45.4 KB  | 17.1 KB   | 62.2% |
| iolapicks | 51.6 KB  | 20.0 KB   | 61.3% |
| joao      | 38.9 KB  | 14.9 KB   | 61.6% |
| ze        | 45.9 KB  | 17.7 KB   | 61.5% |
| pedro     | 49.3 KB  | 19.7 KB   | 60.1% |

**Total savings:** ~67% average reduction in file size

## 🚀 How to Regenerate

If you need to update or add new emoji images:

1. **Add new images** to `public/emojis-backup/`
2. **Run optimization:**
   ```bash
   npm run optimize-emojis
   ```
3. **Update config:**
   ```bash
   npm run generate-emojis
   ```

## 📝 Technical Details

- **Format:** PNG with 90% quality
- **Size:** 200x200px (perfect for UI display)
- **Compression:** Level 9 (maximum)
- **Fit:** Cover with center crop
- **Metadata:** Stripped for privacy and smaller size

## 🔧 Scripts

- `npm run optimize-emojis` - Optimize all images from backup folder
- `npm run generate-emojis` - Generate TypeScript config from optimized images

## 📁 Directory Structure

```
public/
├── emojis/              # Optimized images (auto-generated)
│   ├── bruno.png
│   ├── gui.png
│   ├── jessica.png
│   └── ...
└── emojis-backup/       # Original images (keep for regeneration)
    ├── bruno.png
    ├── gui.jpg
    ├── jessica.png
    └── ...
```

## ⚡ Performance Impact

- **Before:** ~922 KB total (10 images)
- **After:** ~167 KB total (10 images)
- **Savings:** 82% reduction
- **Load time improvement:** ~5x faster on slow connections

## 🎨 Adding New Emojis

1. Add image to `public/emojis-backup/` (any format: jpg, png, webp)
2. Run `npm run optimize-emojis`
3. Run `npm run generate-emojis`
4. Image will automatically appear in emoji picker!

---

_Last generated: 2026-02-01_
