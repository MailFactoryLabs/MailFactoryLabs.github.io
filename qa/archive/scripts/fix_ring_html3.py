import re
with open('site/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'data-ring-current>United States</p>\s*</div>\s*</section>', 'data-ring-current>United States</p>\n      </div>\n    </div>\n  </section>', html, flags=re.DOTALL)

with open('site/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
