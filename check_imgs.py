import os, re
img_names = [
    'logo-1024.png', 'logo-1024.webp', 'logo-128.png', 'logo-128.webp',
    'logo-256.png', 'logo-256.webp', 'logo-512.png', 'logo-512.webp',
    'logo-mask.png', 'logo-sample.png', 'logo-src.png', 'logo-trim.png'
]
found = {img: False for img in img_names}

for root_dir, dirs, files in os.walk('site'):
    for f in files:
        if f.endswith('.html') or f.endswith('.css') or f.endswith('.js'):
            content = open(os.path.join(root_dir, f), encoding='utf8', errors='ignore').read()
            for img in img_names:
                if img in content:
                    found[img] = True

for img, is_found in found.items():
    print(f"{img}: {'USED' if is_found else 'UNUSED'}")
