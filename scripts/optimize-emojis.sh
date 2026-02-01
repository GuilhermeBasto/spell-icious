#!/bin/bash

# Script to optimize custom emoji images using ImageMagick
# Usage: ./scripts/optimize-emojis.sh

BACKUP_DIR="public/emojis-backup"
OUTPUT_DIR="public/emojis"
SIZE="200x200"

echo "🚀 Starting emoji optimization..."
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick is not installed."
    echo "   Please install it with: brew install imagemagick"
    exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Count files
file_count=$(find "$BACKUP_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | wc -l | xargs)
echo "Found $file_count images to process"
echo ""

# Process each image
for input in "$BACKUP_DIR"/*.{jpg,jpeg,png,webp}; do
    # Skip if file doesn't exist (glob didn't match)
    [ -f "$input" ] || continue
    
    # Get filename without extension
    filename=$(basename "$input")
    name="${filename%.*}"
    output="$OUTPUT_DIR/${name}.png"
    
    echo "📸 Processing: $filename"
    
    # Get input file size
    input_size=$(stat -f%z "$input" 2>/dev/null || stat -c%s "$input" 2>/dev/null)
    input_kb=$(echo "scale=1; $input_size / 1024" | bc)
    
    # Convert and optimize
    convert "$input" \
        -resize "${SIZE}^" \
        -gravity center \
        -extent "$SIZE" \
        -quality 90 \
        -strip \
        "$output"
    
    if [ $? -eq 0 ]; then
        # Get output file size
        output_size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        output_kb=$(echo "scale=1; $output_size / 1024" | bc)
        saved=$(echo "scale=1; ($input_size - $output_size) / $input_size * 100" | bc)
        
        echo "   ✅ ${filename}: ${input_kb}KB → ${output_kb}KB (saved ${saved}%)"
    else
        echo "   ❌ Error processing $filename"
    fi
done

echo ""
echo "✨ All images processed successfully!"
echo "📁 Output directory: $OUTPUT_DIR"
