const fs = require('fs');
let content = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');

// 1. Force revert everything back to baseline
// Find the exact block and replace it
const originalBlock = `<div class="wrap ring-head"><p class="eyebrow"><span class="n">25</span> Select country · 22 demo servers</p><h2 class="t-l2" data-reveal="lines">A ring of <em class="serif">places.</em></h2><p class="t-l6">Drag to spin. Arrow keys work too.</p></div>`;

// Since it's currently messed up, let's use regex to find and wipe it.
content = content.replace(/<div class="wrap ring-head">[\s\S]*?<div class="ring3d"/, originalBlock + '\n  <div class="ring3d"');
fs.writeFileSync('E:/Mail-Factory-Labs/site/index.html', content, 'utf8');
