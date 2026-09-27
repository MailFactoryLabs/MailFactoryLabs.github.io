import re
with open('site/css/chapters-b.css', 'r', encoding='utf-8') as f:
    css = f.read()

old_block = r'/\* server ring \*/.*?/\* live one touch'
new_block = '''/* server ring */\n.ring{ padding:clamp(90px, 10vw, 150px) 0 clamp(90px, 10vw, 150px); background:linear-gradient(180deg, var(--black), #000); overflow:hidden; }\n.ring-grid { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: clamp(40px, 6vw, 100px); }\n@media (max-width: 900px) { .ring-grid { grid-template-columns: 1fr; gap: 40px; } }\n.ring-head h2{ margin:22px 0 24px; font-size:clamp(60px, 8vw, 120px); letter-spacing:-0.02em; line-height:0.95; }\n.ring-head .t-l6 { font-size:clamp(18px, 1.8vw, 22px); line-height:1.6; max-width:44ch; }\n.ring3d{ position:relative; height:min(620px, 80vh); perspective:1200px; cursor:grab; user-select:none; -webkit-user-select:none; touch-action:pan-y; outline:none; }\n.ring3d:active{ cursor:grabbing; }\n.ring-track{ position:absolute; left:50%; top:54%; width:0; height:0; transform-style:preserve-3d; }\n.rc{ position:absolute; left:-95px; top:-30px; width:190px; height:60px; display:grid; place-items:center; padding:0 14px; text-align:center; font-family:var(--font-display); font-weight:700; font-stretch:105%; text-transform:uppercase; letter-spacing:.02em; font-size:15px; color:#fff; background:rgba(20,20,22,.85); border:1px solid rgba(255,255,255,.14); border-radius:6px; backface-visibility:hidden; -webkit-backface-visibility:hidden; box-shadow:0 20px 40px rgba(0,0,0,.4); }\n.rc.is-front{ background:#fff; color:#000; border-color:#fff; }\n.ring-floor{ position:absolute; left:50%; top:54%; width:min(900px, 120vw); height:min(900px, 120vw); transform:translate(-50%,-50%) rotateX(80deg); border-radius:50%; background:radial-gradient(circle, rgba(234,12,32,.25) 0%, rgba(234,12,32,.06) 40%, transparent 70%); pointer-events:none; }\n.ring-current{ position:absolute; left:0; right:0; bottom:22%; text-align:center; margin:0; }\n.ring3d:focus-visible{ box-shadow:inset 0 0 0 1px var(--red-line); }\n\n/* live one touch'''

css = re.sub(old_block, new_block, css, flags=re.DOTALL)

with open('site/css/chapters-b.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
