import re
with open('site/css/intro.css', 'r', encoding='utf-8') as f:
    css = f.read()
css = css.replace('.ledger-head{ display:grid; grid-template-columns:1fr 1fr; gap:24px; align-items:end; margin-bottom:48px; }', '.ledger-head{ display:block; margin-bottom:56px; }')
css = css.replace('.ledger-head h2{ margin:20px 0 0; }', '.ledger-head h2{ margin:24px 0 24px; font-size:clamp(46px, 8vw, 116px); }')
css = css.replace('.ledger-head .t-l6{ justify-self:end; max-width:34ch; text-align:right; }', '.ledger-head .t-l6{ max-width:54ch; text-align:left; color:var(--gray); }')
with open('site/css/intro.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('Done')
