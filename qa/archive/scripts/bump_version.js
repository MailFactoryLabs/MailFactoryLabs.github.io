const fs = require('fs');

// Update app.js
let appJs = fs.readFileSync('E:/Mail-Factory-Labs/site/js/core/app.js', 'utf8');
appJs = appJs.replace(/v=20260926v/g, 'v=20260927v');
fs.writeFileSync('E:/Mail-Factory-Labs/site/js/core/app.js', appJs, 'utf8');

// Update index.html
let html = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');
html = html.replace(/v=20260926v/g, 'v=20260927v');
fs.writeFileSync('E:/Mail-Factory-Labs/site/index.html', html, 'utf8');

console.log('Bumped cache version!');
