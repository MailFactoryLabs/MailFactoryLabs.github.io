const fs = require('fs');

// 1. Revert onetouch.js scale hack and implement proper responsive radius
let jsContent = fs.readFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', 'utf8');

// The hack was:
// 'const scale = Math.min(1, root.clientWidth / 800); track.style.transform = `translateZ(${-r}px) scale(${scale}) rotateX(-6deg) rotateY(${rot.toFixed(2)}deg)`;'
// Original was:
// 'track.style.transform = `translateZ(${-r}px) rotateX(-6deg) rotateY(${rot.toFixed(2)}deg)`;'

jsContent = jsContent.replace(
  'const scale = Math.min(1, root.clientWidth / 800); track.style.transform = `translateZ(${-r}px) scale(${scale}) rotateX(-6deg) rotateY(${rot.toFixed(2)}deg)`;',
  'track.style.transform = `translateZ(${-r}px) rotateX(-6deg) rotateY(${rot.toFixed(2)}deg)`;'
);

// Now change the radius function to be responsive
jsContent = jsContent.replace(
  'const radius = () => Math.max(420, Math.min(root.clientWidth * .48, 720));',
  'const radius = () => Math.max(root.clientWidth > 820 ? 420 : root.clientWidth > 480 ? 280 : 200, Math.min(root.clientWidth * .48, 720));'
);

fs.writeFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', jsContent, 'utf8');

// 2. Add responsive CSS for .ring3d and .rc
let cssContent = fs.readFileSync('E:/Mail-Factory-Labs/site/css/chapters-b.css', 'utf8');

const responsiveCSS = `
@media (max-width: 820px) {
  .ring3d { height: 420px; perspective: 900px; }
  .rc { width: 140px; height: 50px; font-size: 13px; left: -70px; top: -25px; padding: 0 10px; }
  .ring-floor { width: 600px; height: 600px; }
}
@media (max-width: 480px) {
  .ring3d { height: 320px; perspective: 700px; }
  .rc { width: 120px; height: 44px; font-size: 11px; left: -60px; top: -22px; padding: 0 8px; }
  .ring-floor { width: 450px; height: 450px; }
  .ring { padding-top: 60px; }
}
`;

// Append it if not already there
if (!cssContent.includes('@media (max-width: 820px) {\n  .ring3d')) {
  cssContent += responsiveCSS;
  fs.writeFileSync('E:/Mail-Factory-Labs/site/css/chapters-b.css', cssContent, 'utf8');
}
