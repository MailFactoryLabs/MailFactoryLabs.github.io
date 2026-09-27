import re
with open('site/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_block = r'<section class="sec ring" id="s-ring" data-theme="dark">.*?<p class="ring-current t-l3" data-ring-current>United States</p>\s*</div>\s*</section>'
new_block = '<section class="sec ring" id="s-ring" data-theme="dark">\n    <div class="wrap ring-grid">\n        <div class="ring-head">\n          <p class="eyebrow"><span class="n">25</span> SELECT COUNTRY</p><h2 class="t-l2" data-reveal="lines">A ring of <em class="serif">places.</em></h2><p class="t-l6">Drag to spin. Arrow keys work too.</p></div>\n    <div class="ring3d" data-ring tabindex="0" aria-label="Server ring carousel">\n      <div class="ring-track">\n        <div class="rc" data-cc="us">United States</div><div class="rc" data-cc="gb">United Kingdom</div><div class="rc" data-cc="ca">Canada</div><div class="rc" data-cc="de">Germany</div><div class="rc" data-cc="fr">France</div><div class="rc" data-cc="nl">Netherlands</div><div class="rc" data-cc="ch">Switzerland</div><div class="rc" data-cc="se">Sweden</div><div class="rc" data-cc="no">Norway</div><div class="rc" data-cc="fi">Finland</div><div class="rc" data-cc="jp">Japan</div><div class="rc" data-cc="sg">Singapore</div><div class="rc" data-cc="kr">South Korea</div><div class="rc" data-cc="au">Australia</div><div class="rc" data-cc="nz">New Zealand</div><div class="rc" data-cc="in">India</div><div class="rc" data-cc="br">Brazil</div><div class="rc" data-cc="es">Spain</div><div class="rc" data-cc="it">Italy</div><div class="rc" data-cc="pl">Poland</div><div class="rc" data-cc="tr">Turkey</div><div class="rc" data-cc="ae">United Arab Emirates</div>\n      </div>\n      <div class="ring-floor" aria-hidden="true"></div>\n      <p class="ring-current t-l3" data-ring-current>United States</p>\n    </div>\n    </div>\n  </section>'

html = re.sub(old_block, new_block, html, flags=re.DOTALL)

with open('site/index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done')
