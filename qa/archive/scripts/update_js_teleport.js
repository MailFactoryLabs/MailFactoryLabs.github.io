const fs = require('fs');
let js = fs.readFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', 'utf8');

const replaceStr = `const paint = () => { 
  cards.forEach((c, k) => { 
    let off = (k - i + n) % n; 
    if (off > 2) off -= n; 
    
    let prevOffStr = c.getAttribute('data-off');
    let prevOff = prevOffStr ? parseInt(prevOffStr) : off;
    c.setAttribute('data-off', off);

    if (prevOff === -2 && off === 2) {
      c.style.transition = 'none';
      c.style.setProperty('--off', 3);
      c.style.setProperty('--offa', 3);
      c.offsetHeight;
      c.style.transition = '';
    } else if (prevOff === 2 && off === -2) {
      c.style.transition = 'none';
      c.style.setProperty('--off', -3);
      c.style.setProperty('--offa', 3);
      c.offsetHeight;
      c.style.transition = '';
    }

    c.classList.toggle('is-center', off === 0); 
    c.style.setProperty('--off', off); 
    c.style.setProperty('--offa', Math.abs(off)); 
    c.style.zIndex = String(10 - Math.abs(off)); 
    c.setAttribute('aria-hidden', off === 0 ? 'false' : 'true'); 
  }); 
  dashEls.forEach((d, k) => { d.classList.toggle('is-on', k === i); d.setAttribute('aria-selected', k === i ? 'true' : 'false'); }); 
};`;

const regex = /const paint = \(\) => \{[\s\S]*?dashEls\.forEach\(\(d, k\) => \{ d\.classList\.toggle\('is-on', k === i\); d\.setAttribute\('aria-selected', k === i \? 'true' : 'false'\); \}\); \};/;

if (regex.test(js)) {
    js = js.replace(regex, replaceStr);
    fs.writeFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', js);
    console.log('Success - updated paint function');
} else {
    console.log('Regex failed');
}
