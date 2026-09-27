const fs = require('fs');
let css = fs.readFileSync('E:/Mail-Factory-Labs/site/css/chapters-a.css', 'utf8');

const dashIntroCss = `
/* =================== DASHBOARD INTRO =================== */
.dash-intro {
  padding: clamp(80px, 12vw, 140px) 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background: var(--black);
}
.dash-intro-inner {
  position: relative;
  width: 100%;
  padding: 0 var(--gutter);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
`;

css += dashIntroCss;

fs.writeFileSync('E:/Mail-Factory-Labs/site/css/chapters-a.css', css, 'utf8');
console.log('CSS updated with new Dashboard Intro.');
