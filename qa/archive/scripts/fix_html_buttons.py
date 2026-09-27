import re
with open('site/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_btns = '''<button type="button" class="dle-btn primary" onclick="document.dispatchEvent(new CustomEvent('mf:screen', {detail: 'engine'})); document.getElementById('s-engine-live').scrollIntoView({behavior:'smooth'});">OPEN FACTORY <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><path d="M9 5l7 7-7 7"/></svg></button>
              <button type="button" class="dle-btn secondary" onclick="document.dispatchEvent(new CustomEvent('mf:screen', {detail: 'library'})); document.getElementById('s-lib-live').scrollIntoView({behavior:'smooth'});">OPEN LIBRARY <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><path d="M9 5l7 7-7 7"/></svg></button>'''

new_btns = '''<div class="dle-app-btn primary" onclick="document.dispatchEvent(new CustomEvent('mf:screen', {detail: 'engine'})); document.getElementById('s-engine-live').scrollIntoView({behavior:'smooth'});">
                <div class="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="color:var(--red-2)">
                    <path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>
                  </svg>
                </div>
                <div class="label"><b>OPEN</b> FACTORY</div>
                <div class="chev">&rsaquo;</div>
              </div>
              <div class="dle-app-btn secondary" onclick="document.dispatchEvent(new CustomEvent('mf:screen', {detail: 'library'})); document.getElementById('s-lib-live').scrollIntoView({behavior:'smooth'});">
                <div class="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 4.5c-2.2-1.4-5-1.4-7.5-.3v14c2.5-1.1 5.3-1.1 7.5.3"/>
                    <path d="M12 4.5c2.2-1.4 5-1.4 7.5-.3v14c-2.5-1.1-5.3-1.1-7.5.3"/>
                    <path d="M12 4.5v14"/>
                  </svg>
                </div>
                <div class="label">OPEN LIBRARY</div>
                <div class="chev">&rsaquo;</div>
              </div>'''

html = html.replace(old_btns, new_btns)

with open('site/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
