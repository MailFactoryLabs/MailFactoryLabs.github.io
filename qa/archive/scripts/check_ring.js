const fs = require('fs');
const content = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');
const start = content.indexOf('<section class="sec ring"');
console.log(content.substring(start, start + 800));
