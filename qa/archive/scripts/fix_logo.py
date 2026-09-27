import re
with open('site/app/mail-factory.html', 'r', encoding='utf-8') as f:
    html = f.read()
html = html.replace('<div class="logo-placeholder">MAIL<br>FACTORY</div>', '<div class="logo-placeholder"><img src="../assets/logo-128.webp" alt="Mail Factory" style="width:64%; height:auto; opacity:0.85; filter:drop-shadow(0 0 12px rgba(255, 30, 30, 0.5)); transform: translateY(-5px);"></div>')
with open('site/app/mail-factory.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
