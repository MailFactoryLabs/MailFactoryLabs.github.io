import re
with open('site/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'<div class="wrap ring-head">.*?<h2', '<div class="wrap ring-grid">\n      <div class="ring-head">\n        <p class="eyebrow"><span class="n">25</span> SELECT COUNTRY</p><h2', html, flags=re.DOTALL)

html = html.replace('data-ring-current>United States</p>\n    </div>\n  </section>', 'data-ring-current>United States</p>\n      </div>\n    </div>\n  </section>')

with open('site/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
