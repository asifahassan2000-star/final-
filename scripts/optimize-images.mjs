import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TARGET_DIRS = [
  './src/assets/images',
  './public/images',
  './public/assets',
];

async function optimizeFolder(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await optimizeFolder(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue;
    }

    const baseName = path.basename(entry.name, ext);
    const webpPath = path.join(dirPath, `${baseName}.webp`);

    try {
      const origStat = fs.statSync(fullPath);
      
      // Convert to high-performance WebP (quality 80, effort 6)
      await sharp(fullPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);

      const newStat = fs.statSync(webpPath);
      const savedPct = (((origStat.size - newStat.size) / origStat.size) * 100).toFixed(1);

      console.log(`✓ ${entry.name} (${(origStat.size / 1024).toFixed(1)} KB) -> ${baseName}.webp (${(newStat.size / 1024).toFixed(1)} KB, -${savedPct}%)`);
    } catch (err) {
      console.warn(`Failed to convert ${fullPath}:`, err.message);
    }
  }
}

async function main() {
  console.log('--- Starting Vite Image Optimization with Sharp ---');
  for (const dir of TARGET_DIRS) {
    console.log(`\nOptimizing directory: ${dir}`);
    await optimizeFolder(dir);
  }
  console.log('\n--- Optimization Complete! ---');
}

main();
