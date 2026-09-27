const fs = require('fs');

let css = fs.readFileSync('E:/Mail-Factory-Labs/site/css/chapters-b.css', 'utf8');

const extraMobileCss = `
@media (max-width:820px) {
  .pulse-copy {
    bottom: 40px !important;
  }
  .pulse-title {
    font-size: clamp(60px, 16vw, 120px) !important;
  }
}
`;

css += extraMobileCss;

fs.writeFileSync('E:/Mail-Factory-Labs/site/css/chapters-b.css', css, 'utf8');
console.log('Mobile CSS appended.');
