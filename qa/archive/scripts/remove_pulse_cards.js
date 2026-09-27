const fs = require('fs');

let html = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');

const regex = /<div class="pulse-controls" data-reveal="stagger">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
const replacement = `    </div>\n  </section>`;

html = html.replace(regex, replacement);

fs.writeFileSync('E:/Mail-Factory-Labs/site/index.html', html, 'utf8');
console.log('Cards removed from HTML.');
