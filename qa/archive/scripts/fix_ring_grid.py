import re
with open('site/css/chapters-b.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.ring{ padding:clamp(90px, 10vw, 150px) 0 clamp(90px, 10vw, 150px); background:linear-gradient(180deg, var(--black), #000); overflow:hidden; }\n.ring-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: clamp(40px, 6vw, 100px); }\n@media (max-width: 900px) { .ring-grid { grid-template-columns: 1fr; gap: 40px; } }', '.ring{ padding:clamp(90px, 10vw, 150px) 0 0; background:linear-gradient(180deg, var(--black), #000); overflow:hidden; }')

with open('site/css/chapters-b.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
