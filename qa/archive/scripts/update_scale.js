const fs = require('fs');
let content = fs.readFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', 'utf8');

// Replace the layout() function in ring() to include responsive scaling
content = content.replace(
  'track.style.transform = `translateZ(${-r}px) rotateX(-6deg) rotateY(${rot.toFixed(2)}deg)`;',
  'const scale = Math.min(1, root.clientWidth / 800); track.style.transform = `translateZ(${-r}px) scale(${scale}) rotateX(-6deg) rotateY(${rot.toFixed(2)}deg)`;'
);

fs.writeFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', content, 'utf8');
