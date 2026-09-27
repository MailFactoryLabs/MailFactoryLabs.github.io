import re
with open('site/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

replacement = '''<div class="dash-live-editorial">
          <div class="dle-group">
            <div class="dle-label">SYSTEM STATUS</div>
            <div class="dle-val"><span class="dle-dot"></span> ONLINE</div>
          </div>
          <div class="dle-group">
            <div class="dle-label">ENTRY POINTS</div>
            <div class="dle-actions">
              <button type="button" class="dle-btn primary" onclick="document.dispatchEvent(new CustomEvent('mf:screen', {detail: 'engine'})); document.getElementById('s-engine-live').scrollIntoView({behavior:'smooth'});">OPEN FACTORY <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><path d="M9 5l7 7-7 7"/></svg></button>
              <button type="button" class="dle-btn secondary" onclick="document.dispatchEvent(new CustomEvent('mf:screen', {detail: 'library'})); document.getElementById('s-lib-live').scrollIntoView({behavior:'smooth'});">OPEN LIBRARY <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2"><path d="M9 5l7 7-7 7"/></svg></button>
            </div>
          </div>
          <div class="dle-group">
            <div class="dle-label">CAPABILITY TILES</div>
            <div class="dle-caps">
              <div class="dle-cap"><h5>100% NATIVE</h5><span>Android App</span></div>
              <div class="dle-cap"><h5>ROOT POWERED</h5><span>Max Performance</span></div>
              <div class="dle-cap"><h5>NETWORK READY</h5><span>HTTP/HTTPS &middot; SOCKS5</span></div>
              <div class="dle-cap"><h5>SMART ENGINE</h5><span>High Success Rate</span></div>
            </div>
          </div>
        </div>'''

html = re.sub(r'<div class="dash-live-stage">.*?</div>\s*</div>\s*</div>\s*</section>', replacement + '\n      </div>\n    </div>\n  </section>', html, flags=re.DOTALL)

with open('site/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
