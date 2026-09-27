import os
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    c = f.read()

old_line = '.dash-live{ min-height:100vh; padding-bottom:clamp(60px, 10vw, 120px);'
new_line = '.dash-live{ min-height:115vh; padding-top:clamp(40px, 6vw, 80px); padding-bottom:clamp(100px, 12vw, 180px);'

if old_line in c:
    c = c.replace(old_line, new_line)
else:
    print('Could not find the target string!')

with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(c)
print('Done')
