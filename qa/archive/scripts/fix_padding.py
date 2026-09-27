import re
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    css = f.read()
css = css.replace('.dash-live{ background:radial-gradient', '.dash-live{ padding-bottom:clamp(60px, 10vw, 120px); background:radial-gradient')
with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
