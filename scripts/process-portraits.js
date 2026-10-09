import fs from 'fs';
import { PNG } from 'pngjs';

// Read source gray-portrait.png
const srcPng = PNG.sync.read(fs.readFileSync('public/Images/gray-portrait.png'));
const { width, height } = srcPng;

function generateLightPortrait(dotIntensity = 0.25, dotPitch = 4) {
  const dst = new PNG({ width, height });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const a = srcPng.data[idx + 3];

      if (a < 10) {
        dst.data[idx] = 0;
        dst.data[idx + 1] = 0;
        dst.data[idx + 2] = 0;
        dst.data[idx + 3] = 0;
        continue;
      }

      const r = srcPng.data[idx];
      const g = srcPng.data[idx + 1];
      const b = srcPng.data[idx + 2];
      // Luminance (0 to 255)
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      // Subtle halftone modulation
      // Sub-cell coordinate within dotPitch x dotPitch
      const cx = (x % dotPitch) - (dotPitch / 2 - 0.5);
      const cy = (y % dotPitch) - (dotPitch / 2 - 0.5);
      const dist = Math.sqrt(cx * cx + cy * cy) / (dotPitch * 0.707); // 0 at center, 1 at edge
      
      // Calculate dot modulation: center is darker for dark areas, brighter for light areas
      // In light mode, darker areas have larger black dots.
      const dotFactor = (1 - dist); // 1 at center, 0 at corners
      const normalizedLum = lum / 255; // 0 (black) to 1 (white)
      
      // Halftone dot effect: dot is prominent in midtones, subtle in highlights
      const pattern = (dotFactor - 0.5) * 2; // -1 to +1
      
      // Blend smooth luminance with subtle halftone pattern
      // Contrast adjustment for crisp facial features
      let adjustedLum = Math.pow(normalizedLum, 0.95); // gentle gamma
      let finalLum = (adjustedLum * (1 - dotIntensity) + (adjustedLum + pattern * 0.18 * (1 - adjustedLum * 0.5)) * dotIntensity) * 255;
      
      finalLum = Math.max(0, Math.min(255, finalLum));

      dst.data[idx] = finalLum;
      dst.data[idx + 1] = finalLum;
      dst.data[idx + 2] = finalLum;
      dst.data[idx + 3] = a;
    }
  }

  return dst;
}

function generateDarkPortrait(dotIntensity = 0.25, dotPitch = 4) {
  const dst = new PNG({ width, height });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;
      const a = srcPng.data[idx + 3];

      if (a < 10) {
        dst.data[idx] = 0;
        dst.data[idx + 1] = 0;
        dst.data[idx + 2] = 0;
        dst.data[idx + 3] = 0;
        continue;
      }

      const r = srcPng.data[idx];
      const g = srcPng.data[idx + 1];
      const b = srcPng.data[idx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      const normalizedLum = lum / 255;

      const cx = (x % dotPitch) - (dotPitch / 2 - 0.5);
      const cy = (y % dotPitch) - (dotPitch / 2 - 0.5);
      const dist = Math.sqrt(cx * cx + cy * cy) / (dotPitch * 0.707);
      const dotFactor = (1 - dist);
      const pattern = (dotFactor - 0.5) * 2;

      // In dark mode, we enhance the facial brightness and add subtle rim/edge visibility
      // Face highlights should glow gently, suit is visible with subtle outline/texture
      let brightenedLum = Math.pow(normalizedLum, 0.82) * 1.15; // boost face brightness
      let finalLum = (brightenedLum * (1 - dotIntensity) + (brightenedLum + pattern * 0.16) * dotIntensity) * 255;
      
      // Ensure dark suit doesn't completely vanish in dark mode: lift suit tone slightly (min ~25-35)
      let suitBoosted = Math.max(finalLum, normalizedLum < 0.2 ? 28 + pattern * 10 : finalLum);
      suitBoosted = Math.max(0, Math.min(255, suitBoosted));

      dst.data[idx] = suitBoosted;
      dst.data[idx + 1] = suitBoosted;
      dst.data[idx + 2] = suitBoosted;
      dst.data[idx + 3] = a;
    }
  }

  return dst;
}

// Generate files
const lightPng = generateLightPortrait(0.20, 3);
fs.writeFileSync('public/Images/light.png', PNG.sync.write(lightPng));

const darkPng = generateDarkPortrait(0.20, 3);
fs.writeFileSync('public/Images/dark.png', PNG.sync.write(darkPng));

console.log('Successfully generated refined light.png and dark.png');
