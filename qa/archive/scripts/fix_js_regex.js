const fs = require('fs');
let js = fs.readFileSync('E:/Mail-Factory-Labs/site/js/sections/dashboard.js', 'utf8');
js = js.replace(/const letters = \$\('\.eo-title span', sec\);/, "const letters = $$('.eo-title span', sec);");
fs.writeFileSync('E:/Mail-Factory-Labs/site/js/sections/dashboard.js', js, 'utf8');
console.log('Fixed $$ in dashboard.js using Regex');
