import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicImagesDir = path.resolve(rootDir, 'public', 'images');

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

// Search all files in src/data and src/components for i.ibb.co URLs
const targetDirs = [path.resolve(rootDir, 'src', 'data'), path.resolve(rootDir, 'src', 'components')];
const urlRegex = /https:\/\/i\.ibb\.co\/[a-zA-Z0-9_\-./]+/g;
const foundUrls = new Set();

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(tsx?|jsx?|json)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(urlRegex);
      if (matches) {
        matches.forEach(u => foundUrls.add(u));
      }
    }
  }
}

targetDirs.forEach(scanDir);
console.log(`Found ${foundUrls.size} unique i.ibb.co URLs.`);

// Build mapping from URL to local filename
const urlToLocalMap = {};
for (const url of foundUrls) {
  const parts = url.split('/');
  const rawFileName = parts[parts.length - 1];
  // Sanitize filename
  const cleanName = rawFileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const localFileName = `${parts[parts.length - 2]}_${cleanName}`;
  urlToLocalMap[url] = `/images/${localFileName}`;
}

// Download each image
async function downloadImage(url, localPath) {
  if (fs.existsSync(localPath) && fs.statSync(localPath).size > 0) {
    return true;
  }
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (!res.ok) {
      console.warn(`Failed ${url}: ${res.status}`);
      return false;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(localPath, buffer);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function main() {
  const entries = Array.from(foundUrls);
  console.log(`Starting download of ${entries.length} images...`);
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  // Process in batches of 10
  const batchSize = 10;
  for (let i = 0; i < entries.length; i += batchSize) {
    const batch = entries.slice(i, i + batchSize);
    await Promise.all(batch.map(async (url) => {
      const localRel = urlToLocalMap[url];
      const localAbs = path.join(publicImagesDir, path.basename(localRel));
      if (fs.existsSync(localAbs) && fs.statSync(localAbs).size > 0) {
        skipped++;
        return;
      }
      const success = await downloadImage(url, localAbs);
      if (success) downloaded++;
      else failed++;
    }));
    console.log(`Progress: ${Math.min(i + batchSize, entries.length)}/${entries.length} (Downloaded: ${downloaded}, Skipped: ${skipped}, Failed: ${failed})`);
  }

  // Save mapping to public/images/mapping.json
  fs.writeFileSync(path.join(publicImagesDir, 'mapping.json'), JSON.stringify(urlToLocalMap, null, 2), 'utf8');
  console.log('Finished downloading images and saved mapping.json');
}

main();
