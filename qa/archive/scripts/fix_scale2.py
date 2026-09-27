import os
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('.dle-caps { display:grid; grid-template-columns:1fr 1fr; gap:20px; }', '.dle-caps { display:grid; grid-template-columns:1fr 1fr; gap:24px 32px; }')
c = c.replace('.dle-cap { padding-top:16px; border-top:1px solid var(--hair-2); }', '.dle-cap { padding-top:20px; border-top:1px solid var(--hair-2); }')

with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(c)
print('Done')
