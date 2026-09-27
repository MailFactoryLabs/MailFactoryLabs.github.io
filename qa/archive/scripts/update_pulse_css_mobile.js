const fs = require('fs');

let css = fs.readFileSync('E:/Mail-Factory-Labs/site/css/chapters-b.css', 'utf8');

css = css.replace('@media (max-width:820px){ .pulse-copy{ top:auto; bottom:90px; transform:none; } }',
                  '@media (max-width:820px){ .pulse-copy{ top:auto; bottom:40px; transform:none; max-width: 100%; } .pulse-title { font-size: clamp(60px, 14vw, 120px); } }');

fs.writeFileSync('E:/Mail-Factory-Labs/site/css/chapters-b.css', css, 'utf8');
console.log('pulse-copy mobile CSS updated.');
