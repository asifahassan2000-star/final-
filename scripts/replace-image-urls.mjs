import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const mappingPath = path.resolve(rootDir, 'public', 'images', 'mapping.json');
if (!fs.existsSync(mappingPath)) {
  console.error('mapping.json not found!');
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
const urls = Object.keys(mapping).sort((a, b) => b.length - a.length); // longest first

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && /\.(tsx?|jsx?|json|html|css)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const url of urls) {
        if (content.includes(url)) {
          const localPath = mapping[url];
          // Check that local file actually exists
          const localDiskPath = path.join(rootDir, 'public', localPath.replace(/^\//, ''));
          if (fs.existsSync(localDiskPath) && fs.statSync(localDiskPath).size > 0) {
            content = content.replaceAll(url, localPath);
            changed = true;
          }
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated URLs in: ${path.relative(rootDir, fullPath)}`);
      }
    }
  }
}

processDir(path.resolve(rootDir, 'src'));
processDir(path.resolve(rootDir, 'index.html'));
console.log('Replacement finished!');
