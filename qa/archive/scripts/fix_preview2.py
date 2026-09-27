import re
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    css = f.read()
css = css.replace('height:min(80vh, 920px);', 'height:min(70vh, 760px);')
css = css.replace('max-height:80vh;', 'max-height:70vh;')
with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
