import os
import subprocess
import urllib.request
import sys
import glob

# Download remaining external images to local /public/images/
external_images = {
    'noor_mahal_elevation.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Front_Elevation_of_Noor_Mahal.jpg/1280px-Front_Elevation_of_Noor_Mahal.jpg',
    'derawar_fort_bahawalpur.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Derawar_Fort%2C_Bahawalpur_I.jpg/1280px-Derawar_Fort%2C_Bahawalpur_I.jpg',
    'darbar_mahal_bahawalpur.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Darbar_Mahal_%28Palace%29%2C_Bahawalpur.jpg/1280px-Darbar_Mahal_%28Palace%29%2C_Bahawalpur.jpg',
    'ucp_lahore_campus.jpg': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Ucplhr.jpg',
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in external_images.items():
    dest = os.path.join('public/images', fname)
    if not os.path.exists(dest):
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as response, open(dest, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {fname} successfully")
        except Exception as e:
            print(f"Failed to download {url}: {e}")

# Now optimize all images in public/images
print("Starting ImageMagick progressive JPEG/PNG optimization...")
files = glob.glob('public/images/*')
count = 0
saved_bytes = 0

for f in files:
    ext = os.path.splitext(f)[1].lower()
    if ext in ('.jpg', '.jpeg'):
        orig_size = os.path.getsize(f)
        tmp = f + '.tmp.jpg'
        # Resize if > 1400px, quality 80, progressive interlace Plane, strip metadata
        cmd = ['convert', f, '-resize', '1400x1400>', '-quality', '80', '-strip', '-interlace', 'Plane', tmp]
        try:
            subprocess.run(cmd, check=True)
            if os.path.exists(tmp):
                new_size = os.path.getsize(tmp)
                if new_size < orig_size:
                    os.replace(tmp, f)
                    saved_bytes += (orig_size - new_size)
                    count += 1
                else:
                    os.remove(tmp)
        except Exception as e:
            if os.path.exists(tmp):
                os.remove(tmp)
    elif ext == '.png':
        orig_size = os.path.getsize(f)
        tmp = f + '.tmp.png'
        cmd = ['convert', f, '-resize', '1400x1400>', '-quality', '85', '-strip', tmp]
        try:
            subprocess.run(cmd, check=True)
            if os.path.exists(tmp):
                new_size = os.path.getsize(tmp)
                if new_size < orig_size:
                    os.replace(tmp, f)
                    saved_bytes += (orig_size - new_size)
                    count += 1
                else:
                    os.remove(tmp)
        except Exception as e:
            if os.path.exists(tmp):
                os.remove(tmp)

print(f"Optimized {count} images. Saved {saved_bytes / (1024 * 1024):.2f} MB!")
