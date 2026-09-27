import re
with open('site/css/chapters-b.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('height:min(520px, 70vh);', 'height:min(380px, 50vh);')

with open('site/css/chapters-b.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
