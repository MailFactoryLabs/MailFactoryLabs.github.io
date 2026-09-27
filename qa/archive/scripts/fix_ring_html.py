import re
with open('site/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('<div class="wrap ring-head"><p class="eyebrow"><span class="n">25</span> Select country — 22 demo servers</p>', '<div class="wrap ring-grid">\n      <div class="ring-head">\n        <p class="eyebrow"><span class="n">25</span> SELECT COUNTRY</p>')

html = html.replace('data-ring-current>United States</p>\n    </div>\n  </section>', 'data-ring-current>United States</p>\n      </div>\n    </div>\n  </section>')

with open('site/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
