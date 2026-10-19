import os
import subprocess
import sys

def optimize_images():
    targets = ['public', 'src/assets/images']
    total_before = 0
    total_after = 0
    optimized_count = 0
    webp_count = 0

    image_exts = ('.jpg', '.jpeg', '.png')

    all_files = []
    for target in targets:
        if not os.path.exists(target):
            continue
        for root, _, files in os.walk(target):
            for f in files:
                ext = os.path.splitext(f)[1].lower()
                if ext in image_exts:
                    all_files.append(os.path.join(root, f))

    print(f"Found {len(all_files)} images to optimize.")

    for path in all_files:
        try:
            size_before = os.path.getsize(path)
            total_before += size_before
            base, ext = os.path.splitext(path)
            ext = ext.lower()
            is_logo = any(k in os.path.basename(path).lower() for k in ['logo', 'icon', 'seal'])

            tmp_opt = path + '.tmp'
            webp_path = base + '.webp'

            if ext in ('.jpg', '.jpeg'):
                # Optimize JPEG
                subprocess.run([
                    'convert', path,
                    '-resize', '1600x>',
                    '-quality', '80',
                    '-strip',
                    '-interlace', 'Plane',
                    tmp_opt
                ], check=True)

                if os.path.exists(tmp_opt):
                    if os.path.getsize(tmp_opt) < size_before:
                        os.replace(tmp_opt, path)
                    else:
                        os.remove(tmp_opt)

                # Generate WebP version
                if not os.path.exists(webp_path):
                    subprocess.run([
                        'convert', path,
                        '-resize', '1600x>',
                        '-quality', '80',
                        '-strip',
                        webp_path
                    ], check=True)
                    webp_count += 1

            elif ext == '.png':
                if is_logo:
                    # Keep logo sharp, strip EXIF
                    subprocess.run([
                        'convert', path,
                        '-strip',
                        tmp_opt
                    ], check=True)
                    if os.path.exists(tmp_opt):
                        if os.path.getsize(tmp_opt) < size_before:
                            os.replace(tmp_opt, path)
                        else:
                            os.remove(tmp_opt)
                else:
                    # Photo PNG - compress and resize
                    subprocess.run([
                        'convert', path,
                        '-resize', '1600x>',
                        '-strip',
                        '-quality', '85',
                        tmp_opt
                    ], check=True)
                    if os.path.exists(tmp_opt):
                        if os.path.getsize(tmp_opt) < size_before:
                            os.replace(tmp_opt, path)
                        else:
                            os.remove(tmp_opt)

                # Generate WebP version
                if not os.path.exists(webp_path):
                    subprocess.run([
                        'convert', path,
                        '-resize', '1600x>',
                        '-quality', '82',
                        '-strip',
                        webp_path
                    ], check=True)
                    webp_count += 1

            size_after = os.path.getsize(path)
            total_after += size_after
            optimized_count += 1

        except Exception as e:
            print(f"Error optimizing {path}: {e}")

    print(f"Optimized {optimized_count} images.")
    print(f"Generated {webp_count} WebP images.")
    print(f"Total size before: {total_before / (1024*1024):.2f} MB")
    print(f"Total size after (original files): {total_after / (1024*1024):.2f} MB")
    print(f"Saved: {(total_before - total_after) / (1024*1024):.2f} MB ({((total_before - total_after)/total_before)*100:.1f}%)")

if __name__ == '__main__':
    optimize_images()
