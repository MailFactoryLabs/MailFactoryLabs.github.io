import re
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('.dash-live-copy h2{ margin:22px 0 18px; }', '.dash-live-copy h2{ margin:22px 0 24px; font-size:clamp(60px, 8vw, 120px); letter-spacing:-0.02em; line-height:0.95; }\n.dash-live-copy .t-l4{ font-size:clamp(18px, 1.8vw, 22px); line-height:1.6; max-width:44ch; }')

old_btns_css = '''\.dle-actions \{ display:flex; flex-direction:column; gap:8px; \}
\.dle-btn \{ display:inline-flex; align-items:center; justify-content:space-between; width:100%; max-width:320px; padding:16px 20px; border:1px solid var\(--hair-2\); background:rgba\(0,0,0,\.4\); color:var\(--white\); font:600 13px var\(--font-mono\); letter-spacing:\.14em; text-transform:uppercase; cursor:pointer; transition:border-color \.3s, color \.3s; \}
\.dle-btn svg \{ width:16px; height:16px; opacity:\.5; transition:opacity \.3s, transform \.3s; \}
\.dle-btn\.primary \{ border-color:var\(--red-line\); color:var\(--red-2\); \}
\.dle-btn\.primary:hover \{ border-color:var\(--red-2\); background:rgba\(234,12,32,\.05\); \}
\.dle-btn\.secondary:hover \{ border-color:rgba\(255,255,255,\.4\); \}
\.dle-btn:hover svg \{ opacity:1; transform:translateX\(4px\); \}'''

new_btns_css = '''.dle-actions { display:flex; flex-direction:column; gap:8px; }\n.dle-app-btn { position:relative; width:100%; max-width:380px; display:flex; align-items:center; gap:14px; padding:18px 20px; border-radius:14px; margin-bottom:12px; cursor:pointer; overflow:hidden; text-decoration:none; transition:transform .2s; }\n.dle-app-btn:active { transform:scale(0.97); }\n.dle-app-btn::after { content:""; position:absolute; top:0; left:-60%; width:35%; height:100%; background:linear-gradient(115deg, transparent, rgba(255,255,255,0.25), transparent); transform:skewX(-20deg); animation:dleSheen 5s ease-in-out infinite; }\n@keyframes dleSheen { 0%{ left:-60%; } 35%{ left:130%; } 100%{ left:130%; } }\n.dle-app-btn.primary { background:linear-gradient(180deg, #180606, #0a0303); border:1.5px solid var(--red-2); box-shadow:0 0 20px rgba(234,12,32,0.35), inset 0 1px 0 rgba(255,255,255,0.08); }\n.dle-app-btn.secondary { background:linear-gradient(180deg, #111111, #0a0a0a); border:1.5px solid rgba(255,255,255,0.28); box-shadow:inset 0 1px 0 rgba(255,255,255,0.06); }\n.dle-app-btn.secondary::after { animation-delay:1.6s; background:linear-gradient(115deg, transparent, rgba(255,255,255,0.15), transparent); }\n.dle-app-btn .ic { width:26px; height:26px; display:flex; align-items:center; justify-content:center; flex-shrink:0; position:relative; z-index:2; }\n.dle-app-btn .label { flex:1; font-family:var(--font-display); font-size:18px; font-weight:800; letter-spacing:0.5px; position:relative; z-index:2; color:#fff; }\n.dle-app-btn.primary .label b { color:var(--red-2); font-weight:800; }\n.dle-app-btn .chev { font-size:24px; font-family:var(--font-sans); position:relative; z-index:2; color:var(--gray); transition:transform .3s; }\n.dle-app-btn.primary .chev { color:var(--red-2); }\n.dle-app-btn:hover .chev { transform:translateX(4px); }'''

css = re.sub(old_btns_css, new_btns_css, css)

css = css.replace('.dle-btn { max-width:100%; }', '.dle-app-btn { max-width:100%; }')

with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
