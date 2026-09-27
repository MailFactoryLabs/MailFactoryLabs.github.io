import re
with open('site/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove pin attributes from section
html = html.replace('<section class="sec dash-live" id="s-dash-live" data-theme="dark" data-slot-trigger data-pin data-pin-length="2.4">', '<section class="sec dash-live" id="s-dash-live" data-theme="dark">')

# 2. Remove pin-inner wrapper
html = html.replace('<div class="pin-inner">\n      <div class="grad-host"', '<div class="grad-host"')
html = html.replace('      </div>\n    </div>\n  </section>', '      </div>\n  </section>')

# 3. Remove .dash-annos
html = re.sub(r'<div class="dash-annos">.*?</div>\s*</div>\s*<div class="dash-live-editorial">', '</div>\n        <div class="dash-live-editorial">', html, flags=re.DOTALL)

with open('site/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
