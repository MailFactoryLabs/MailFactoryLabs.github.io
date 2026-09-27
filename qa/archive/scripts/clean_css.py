import re
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    css = f.read()
css = re.sub(r'/\* =================== SWITCHBOARD =================== \*/.*?\.sb-table\{', '.sb-table{', css, flags=re.DOTALL)
css = re.sub(r'@media \(max-width:900px\)\{ \.switchboard-inner\{ grid-template-columns:1fr; \} \.sb-table th:nth-child\(3\),\.sb-table td:nth-child\(3\)\{ display:none; \} \}', '', css)
with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
