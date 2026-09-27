const fs = require('fs');
let css = fs.readFileSync('E:/Mail-Factory-Labs/site/css/chapters-a.css', 'utf8');

const sizeCss = `
.dash-intro .eo-title {
  font-size: min(10.5vw, 25vh);
}
`;

css += sizeCss;
fs.writeFileSync('E:/Mail-Factory-Labs/site/css/chapters-a.css', css, 'utf8');
console.log('CSS size updated.');
