const fs = require('fs');
const path = 'E:/Mail-Factory-Labs/site/index.html';
let content = fs.readFileSync(path, 'utf8');

// The original text to replace
const original = `<p class="eyebrow"><span class="n">25</span> Select country · 22 demo servers</p><h2 \nclass="t-l2" data-reveal="lines">A ring of <em class="serif">places.</em></h2>`;
const replacement = `<p class="eyebrow"><span class="n">25</span> Select country</p><h2 \nclass="t-l1" data-reveal="lines" style="margin-bottom: 24px; line-height: 0.95;">A ring of <br><em class="serif">places.</em></h2>`;

// Try an exact match or a flexible replace
content = content.replace(/<p class="eyebrow"><span class="n">25<\/span> Select country · 22 demo servers<\/p><h2\s+class="t-l2" data-reveal="lines">A ring of <em class="serif">places\.<\/em><\/h2>/, replacement);

// Alternative if the previous regex doesn't match perfectly
content = content.replace('· 22 demo servers', '');
content = content.replace('<h2 \nclass="t-l2" data-reveal="lines">A ring of <em class="serif">places.</em></h2>', '<h2 \nclass="t-l1" data-reveal="lines" style="margin-bottom: 24px; line-height: 0.95;">A ring of <br><em class="serif">places.</em></h2>');
content = content.replace('<h2 class="t-l2" data-reveal="lines">A ring of <em class="serif">places.</em></h2>', '<h2 class="t-l1" data-reveal="lines" style="margin-bottom: 24px; line-height: 0.95;">A ring of <br><em class="serif">places.</em></h2>');

fs.writeFileSync(path, content, 'utf8');
