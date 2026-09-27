import re
with open('site/app/mail-factory.html', 'r', encoding='utf-8') as f:
    html = f.read()
html = html.replace('width:64%; height:auto; opacity:0.85; filter:drop-shadow(0 0 12px rgba(255, 30, 30, 0.5)); transform: translateY(-5px);', 'width:100%; height:auto; opacity:0.85; filter:drop-shadow(0 0 12px rgba(255, 30, 30, 0.5)); transform: translateY(-16px);')
with open('site/app/mail-factory.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
