import re
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    css = f.read()
css = css.replace('@media (max-width:900px){ .sb-table th:nth-child(3),.sb-table td:nth-child(3){ display:none; } }', '')
switch_css = '''/* =================== SWITCHBOARD =================== */
.switchboard{ position:relative; padding:clamp(100px, 12vw, 180px) 0; background:#0b0b0c; overflow:hidden; }
.switchboard .grad-host{ opacity:.7; }
.switchboard-inner{ position:relative; display:grid; grid-template-columns:1fr 1.2fr; gap:clamp(30px, 5vw, 90px); align-items:center; }
.sb-head h2{ margin:20px 0 20px; }
.sb-table{'''
css = css.replace('.sb-table{', switch_css)
css = css + '\n@media (max-width:900px){ .switchboard-inner{ grid-template-columns:1fr; } .sb-table th:nth-child(3),.sb-table td:nth-child(3){ display:none; } }'
with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
