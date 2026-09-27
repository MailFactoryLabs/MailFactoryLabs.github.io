import re
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    css = f.read()
start_idx = css.find('/* =================== LIVE ENGINE =================== */')
end_idx = css.find('/* =================== SWITCHBOARD =================== */')
new_css = '''/* =================== LIVE ENGINE =================== */
.engine-live{ padding:clamp(140px, 16vw, 220px) 0; background:linear-gradient(180deg, var(--ink), var(--black)); overflow:hidden; }
.engine-live-inner{ max-width:1440px; margin:0 auto; padding-right: clamp(20px, 5vw, 60px); }
.engine-live-copy{ text-align:left; }
.engine-live-copy h2{ font-size:clamp(80px, 14vw, 180px); line-height:0.85; margin:30px 0 40px; letter-spacing:-0.03em; white-space:nowrap; }
.engine-live-copy h2 em { font-size: 1.05em; }
.engine-live-copy .t-l4{ max-width:60ch; font-size:clamp(18px, 2.2vw, 26px); color:rgba(255,255,255,0.7); line-height:1.4; }
.try-list{ list-style:none; margin:60px 0 0; padding:0; display:flex; flex-direction:column; width:100%; max-width:700px; text-align:left; }
.try-list li{ display:flex; gap:16px; align-items:baseline; padding:18px 0; border-top:1px solid var(--hair); font-size:16px; }
.try-list li span{ font:500 11px var(--font-mono); letter-spacing:.2em; text-transform:uppercase; color:var(--red-2); min-width:44px; }
@media (max-width:1000px){ .engine-live-copy h2{ white-space:normal; } }
'''
css = css[:start_idx] + new_css + css[end_idx:]
with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
