import fs from 'fs';
import path from 'path';
import https from 'https';

const campusUrls = JSON.parse(fs.readFileSync('campus_links.json', 'utf8'));
const eliteUrls = JSON.parse(fs.readFileSync('elite_links.json', 'utf8'));

fs.mkdirSync('public/assets/campus-life-new', { recursive: true });
fs.mkdirSync('public/assets/elite-network-new', { recursive: true });

function fetchHtml(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/https:\/\/i\.ibb\.co\/[^\"]+\.(jpg|jpeg|png|webp)/i);
        resolve(match ? match[0] : null);
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(null);
    });
  });
}

function downloadImage(imgUrl, destPath) {
  return new Promise((resolve) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      return resolve(true);
    }
    const req = https.get(imgUrl, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
    req.on('error', () => resolve(false));
    req.setTimeout(12000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function processItem(url, index, total, outDir, prefix) {
  try {
    const directUrl = await fetchHtml(url);
    if (!directUrl) return null;
    const ext = path.extname(directUrl).split('?')[0] || '.jpg';
    const filename = `${prefix}-${index + 1}${ext}`;
    const dest = path.join(outDir, filename);
    await downloadImage(directUrl, dest);
    console.log(`[${index + 1}/${total}] ${filename} downloaded`);
    return {
      id: index + 1,
      localSrc: `/assets/${path.basename(outDir)}/${filename}`,
      fallbackSrc: directUrl,
    };
  } catch (e) {
    return null;
  }
}

async function runPool(urls, outDir, prefix, concurrency = 8) {
  const results = [];
  const total = urls.length;
  let idx = 0;

  const workers = Array.from({ length: concurrency }, async () => {
    while (idx < total) {
      const current = idx++;
      const res = await processItem(urls[current], current, total, outDir, prefix);
      if (res) results.push(res);
    }
  });

  await Promise.all(workers);
  results.sort((a, b) => a.id - b.id);
  return results;
}

(async () => {
  console.log('Starting parallel campus download...');
  const campusResults = await runPool(campusUrls, 'public/assets/campus-life-new', 'campus', 8);
  fs.writeFileSync('campus_manifest.json', JSON.stringify(campusResults, null, 2));
  console.log(`Campus complete: ${campusResults.length} images.`);

  console.log('Starting parallel elite download...');
  const eliteResults = await runPool(eliteUrls, 'public/assets/elite-network-new', 'elite', 8);
  fs.writeFileSync('elite_manifest.json', JSON.stringify(eliteResults, null, 2));
  console.log(`Elite complete: ${eliteResults.length} images.`);
})();
