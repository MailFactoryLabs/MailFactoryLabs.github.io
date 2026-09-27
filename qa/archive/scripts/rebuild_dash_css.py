import re
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    css = f.read()

css_rules = '''
.dash-live-editorial { display:flex; flex-direction:column; gap:40px; padding-left:clamp(0px, 4vw, 40px); border-left:1px solid var(--hair); }
.dle-group { display:flex; flex-direction:column; }
.dle-label { font:500 11px var(--font-mono); letter-spacing:.2em; color:var(--gray); text-transform:uppercase; margin-bottom:12px; }
.dle-val { display:flex; align-items:center; gap:12px; font:400 24px var(--font-display); letter-spacing:-.01em; color:var(--white); }
.dle-dot { width:10px; height:10px; border-radius:50%; background:var(--red-2); box-shadow:0 0 10px rgba(234,12,32,.5); animation:pulse 2s infinite ease-in-out; }
@keyframes pulse { 0% { opacity:1; } 50% { opacity:.4; } 100% { opacity:1; } }
.dle-actions { display:flex; flex-direction:column; gap:8px; }
.dle-btn { display:inline-flex; align-items:center; justify-content:space-between; width:100%; max-width:320px; padding:16px 20px; border:1px solid var(--hair-2); background:rgba(0,0,0,.4); color:var(--white); font:600 13px var(--font-mono); letter-spacing:.14em; text-transform:uppercase; cursor:pointer; transition:border-color .3s, color .3s; }
.dle-btn svg { width:16px; height:16px; opacity:.5; transition:opacity .3s, transform .3s; }
.dle-btn.primary { border-color:var(--red-line); color:var(--red-2); }
.dle-btn.primary:hover { border-color:var(--red-2); background:rgba(234,12,32,.05); }
.dle-btn.secondary:hover { border-color:rgba(255,255,255,.4); }
.dle-btn:hover svg { opacity:1; transform:translateX(4px); }
.dle-caps { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.dle-cap { padding-top:16px; border-top:1px solid var(--hair-2); }
.dle-cap h5 { font:700 13px var(--font-mono); letter-spacing:.1em; color:var(--white); margin:0 0 4px; text-transform:uppercase; }
.dle-cap span { font:400 13px var(--font-sans); color:var(--gray); }
@media (max-width:900px){ .dash-live-editorial { border-left:none; padding-left:0; padding-top:32px; border-top:1px solid var(--hair); gap:32px; } .dle-btn { max-width:100%; } .dle-caps { grid-template-columns:1fr 1fr; gap:16px; } }
@media (max-width:480px){ .dle-caps { grid-template-columns:1fr; } }
'''

css = re.sub(r'\.dash-live-stage\{.*?\.anno-lines path\.is-on\{ opacity:1; \}', css_rules, css, flags=re.DOTALL)

with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
