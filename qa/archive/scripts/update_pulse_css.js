const fs = require('fs');

let css = fs.readFileSync('E:/Mail-Factory-Labs/site/css/chapters-b.css', 'utf8');

// Enlarge title
css = css.replace('font-size:clamp(56px, 9vw, 140px);', 'font-size:clamp(80px, 16vw, 240px);');

// Enlarge state text
css = css.replace('font:500 12px var(--font-mono);', 'font:500 15px var(--font-mono);');
css = css.replace('gap:14px;', 'gap:24px;');

// Also enlarge paragraph text in pulse-copy
const extraCss = `
.pulse-copy .t-l5 { font-size: 16px; letter-spacing: 0.2em; }
.pulse-copy .t-l6 { font-size: 17px; max-width: 420px; line-height: 1.6; }
`;

css += extraCss;

fs.writeFileSync('E:/Mail-Factory-Labs/site/css/chapters-b.css', css, 'utf8');
console.log('CSS updated for larger text.');
