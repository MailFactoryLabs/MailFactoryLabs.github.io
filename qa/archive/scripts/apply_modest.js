const fs = require('fs');
let content = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');

const originalBlock = `<div class="wrap ring-head"><p class="eyebrow"><span class="n">25</span> Select country · 22 demo servers</p><h2 class="t-l2" data-reveal="lines">A ring of <em class="serif">places.</em></h2><p class="t-l6">Drag to spin. Arrow keys work too.</p></div>`;

const modestBlock = `<div class="wrap ring-head"><p class="eyebrow"><span class="n">25</span> Select country</p><h2 class="t-l2" data-reveal="lines" style="font-size: clamp(42px, 7.5vw, 110px); font-weight: 800; font-stretch: 105%; letter-spacing: -.035em; padding-bottom: 8px;">A ring of <em class="serif">places.</em></h2><p class="t-l6">Drag to spin. Arrow keys work too.</p></div>`;

content = content.replace(originalBlock, modestBlock);
fs.writeFileSync('E:/Mail-Factory-Labs/site/index.html', content, 'utf8');
