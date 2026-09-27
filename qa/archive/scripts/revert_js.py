import re
with open('site/js/sections/onetouch.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = re.sub(r'const radius = \(\) => 700;', 'const radius = () => 480;', js)

with open('site/js/sections/onetouch.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('Done')
