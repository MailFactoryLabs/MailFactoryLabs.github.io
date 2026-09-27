import os
with open('site/css/chapters-a.css', 'r', encoding='utf-8') as f:
    c = f.read()

replacements = {
    'gap:clamp(24px, 5vw, 80px);': 'gap:clamp(40px, 8vw, 120px);',
    'margin:22px 0 24px; font-size:clamp(60px, 8vw, 120px);': 'margin:22px 0 28px; font-size:clamp(70px, 9vw, 140px);',
    'font-size:clamp(18px, 1.8vw, 22px); line-height:1.6; max-width:44ch;': 'font-size:clamp(20px, 2vw, 26px); line-height:1.65; max-width:48ch;',
    'gap:40px; padding-left:clamp(0px, 4vw, 40px);': 'gap:56px; padding-left:clamp(0px, 6vw, 60px);',
    'font:500 11px': 'font:500 12px',
    'font:400 24px': 'font:400 28px',
    'width:10px; height:10px;': 'width:12px; height:12px;',
    'max-width:380px; display:flex; align-items:center; gap:14px; padding:18px 20px; border-radius:14px; margin-bottom:12px;': 'max-width:420px; display:flex; align-items:center; gap:16px; padding:20px 24px; border-radius:14px; margin-bottom:16px;',
    'width:26px; height:26px;': 'width:28px; height:28px;',
    'font-size:18px;': 'font-size:20px;',
    'font-size:24px;': 'font-size:26px;',
    'gap:20px; }\n  .dle-cap { padding-top:16px;': 'gap:24px 32px; }\n  .dle-cap { padding-top:20px;',
    'font:700 13px': 'font:700 14px',
    'font:400 13px': 'font:400 14px',
    'padding-top:32px; border-top:1px solid var(--hair); gap:32px;': 'padding-top:40px; border-top:1px solid var(--hair); gap:40px;',
    'grid-template-columns:1fr 1fr; gap:16px; } }': 'grid-template-columns:1fr 1fr; gap:20px; } }',
    'gap:14px; padding-top:calc(var(--nav-h) + 8px);': 'gap:24px; padding-top:calc(var(--nav-h) + 8px);',
    'font-size:clamp(28px, 7vw, 40px); margin:10px 0 8px;': 'font-size:clamp(32px, 8vw, 48px); margin:12px 0 10px;'
}

for k, v in replacements.items():
    if k in c:
        c = c.replace(k, v)
    else:
        print('Could not find:', k)

with open('site/css/chapters-a.css', 'w', encoding='utf-8') as f:
    f.write(c)
print('Done')
