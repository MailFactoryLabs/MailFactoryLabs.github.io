import re
with open('site/css/chapters-b.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('height:min(620px, 80vh);', 'height:min(520px, 70vh);')
css = css.replace('.ring-track{ position:absolute; left:50%; top:54%;', '.ring-track{ position:absolute; left:50%; top:50%;')
css = css.replace('.ring-floor{ position:absolute; left:50%; top:54%;', '.ring-floor{ position:absolute; left:50%; top:50%;')
css = css.replace('.ring-current{ position:absolute; left:0; right:0; bottom:22%;', '.ring-current{ position:absolute; left:0; right:0; bottom:16%;')

with open('site/css/chapters-b.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
