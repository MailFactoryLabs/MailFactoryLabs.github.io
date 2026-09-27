import re
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    css = f.read()
css = re.sub(r'\.dash-live-stage\{\s*height:auto; \}\s*\.dash-live-stage \.app-slot\{.*?\}\s*\.anno-lines\{\s*display:none; \}', '', css, flags=re.DOTALL)
with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
