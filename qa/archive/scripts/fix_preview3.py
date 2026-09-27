import re
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    css = f.read()
css = css.replace('.dash-live-stage .app-slot{ width:auto; height:min(70vh, 760px); max-width:100%; aspect-ratio:9/19; }', '.dash-live-stage .app-slot{ height:min(70vh, 760px); width:auto; max-width:min(100%, 420px); aspect-ratio:9/19; }')
css = css.replace('.dash-live-stage .app-slot{ width:min(88vw, 420px); height:auto; max-height:70vh; aspect-ratio:9/19; max-width:none; }', '.dash-live-stage .app-slot{ height:min(70vh, 760px); width:auto; max-width:min(88vw, 420px); aspect-ratio:9/19; }')
with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
