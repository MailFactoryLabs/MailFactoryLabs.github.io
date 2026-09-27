import re
with open('site/index.html', 'r', encoding='utf-8') as f:
    html = f.read()
html = re.sub(r'<div class="engine-live-table-wrapper">.*?</div>\s*</div>\s*</section>', '</div>\n</section>', html, flags=re.DOTALL)
with open('site/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
