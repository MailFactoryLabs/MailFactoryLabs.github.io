import re
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    css = f.read()
css = css.replace('.dash-live{ padding-bottom:clamp(60px, 10vw, 120px);', '.dash-live{ min-height:100vh; padding-bottom:clamp(60px, 10vw, 120px);')
with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
