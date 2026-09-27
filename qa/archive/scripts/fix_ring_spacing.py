import re
with open('site/css/chapters-b.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.ring-track{ position:absolute; left:50%; top:46%; width:0; height:0; transform-style:preserve-3d; }', '.ring-track{ position:absolute; left:50%; top:54%; width:0; height:0; transform-style:preserve-3d; }')
css = css.replace('.ring-floor{ position:absolute; left:50%; top:46%;', '.ring-floor{ position:absolute; left:50%; top:54%;')
css = css.replace('.ring-current{ position:absolute; left:0; right:0; bottom:8%; text-align:center; margin:0; }', '.ring-current{ position:absolute; left:0; right:0; bottom:22%; text-align:center; margin:0; }')

with open('site/css/chapters-b.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
