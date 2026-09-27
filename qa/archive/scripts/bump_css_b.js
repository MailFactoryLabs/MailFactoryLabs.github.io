const fs = require('fs');
let html = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');
html = html.replace(/chapters-b\.css\?v=[^"']+/g, 'chapters-b.css?v=' + Date.now());
fs.writeFileSync('E:/Mail-Factory-Labs/site/index.html', html, 'utf8');
console.log('Bumped chapters-b.css cache version!');
