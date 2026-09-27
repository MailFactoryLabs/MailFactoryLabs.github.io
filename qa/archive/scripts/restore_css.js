const fs = require('fs');

let css = fs.readFileSync('E:/Mail-Factory-Labs/site/css/chapters-a.css', 'utf8');

const regex = /\/\* ---- dashboard statement ---- \*\/[\s\S]*?@media \(max-width:820px\)\{ \n  \.dash-state-cols\{ grid-template-columns:1fr; padding-left:0; gap: 20px; \} \n\}/;

const oldCss = `/* ---- dashboard statement ---- */
.dash-state{ padding:clamp(100px, 12vw, 180px) 0 clamp(60px, 8vw, 120px); background:var(--black); }
.dash-state-grid{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(24px, 5vw, 80px); align-items:end; }
.dash-state-grid h2{ margin:22px 0 0; }
.dash-state-copy{ display:flex; flex-direction:column; gap:18px; max-width:54ch; }
@media (max-width:820px){ .dash-state-grid{ grid-template-columns:1fr; } .dash-state-copy{ max-width:none; } }`;

css = css.replace(regex, oldCss);
fs.writeFileSync('E:/Mail-Factory-Labs/site/css/chapters-a.css', css, 'utf8');
console.log('CSS restored.');
