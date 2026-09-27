const fs = require('fs');
let content = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');
content = content.replace('<h2 \nclass="t-l1" data-reveal="lines" style="margin-bottom: 24px; line-height: 0.95;">A ring of <br><em class="serif">places.</em></h2>', '<h2 class="t-l2" data-reveal="lines">A ring of <em class="serif">places.</em></h2>');
content = content.replace('<p class="eyebrow"><span class="n">25</span> Select country</p>', '<p class="eyebrow"><span class="n">25</span> Select country · 22 demo servers</p>');
fs.writeFileSync('E:/Mail-Factory-Labs/site/index.html', content, 'utf8');
