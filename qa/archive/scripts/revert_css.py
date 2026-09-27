import re
with open('site/css/chapters-b.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.ring-head h2{ margin:22px 0 24px; font-size:clamp(60px, 8vw, 120px); letter-spacing:-0.02em; line-height:0.95; }\n.ring-head .t-l6 { font-size:clamp(18px, 1.8vw, 22px); line-height:1.6; max-width:44ch; }', '.ring-head h2{ margin:20px 0 10px; }')

with open('site/css/chapters-b.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
