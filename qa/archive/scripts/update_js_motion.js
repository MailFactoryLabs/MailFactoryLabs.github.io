const fs = require('fs');
let js = fs.readFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', 'utf8');

const targetStr = `const paint = () => { cards.forEach((c, k) => { let off = (k - i + n) % n; if (off > 2) off -= n; c.classList.toggle('is-center', off === 0); c.style.setProperty('--off', off); c.style.setProperty('--offa', Math.abs(off)); c.style.zIndex = String(10 - Math.abs(off)); c.setAttribute('aria-hidden', off === 0 ? 'false' : 'true'); }); dashEls.forEach((d, k) => { d.classList.toggle('is-on', k === i); d.setAttribute('aria-selected', k === i ? 'true' : 'false'); }); };`;

const replaceStr = `const paint = () => { 
  cards.forEach((c, k) => { 
    let off = (k - i + n) % n; 
    if (off > 2) off -= n; 
    
    let prevOffStr = c.getAttribute('data-off');
    let prevOff = prevOffStr ? parseInt(prevOffStr) : off;
    c.setAttribute('data-off', off);

    if (c._wrapTo) { 
      clearTimeout(c._wrapTo); 
      c._wrapTo = null; 
      c.style.transition = 'none';
      c.style.setProperty('--off', off > 0 ? 3 : -3);
      c.style.setProperty('--offa', 4);
      c.offsetHeight;
      c.style.transition = '';
    }

    if (prevOff === -2 && off === 2) {
      c.style.setProperty('--off', -3);
      c.style.setProperty('--offa', 4);
      c.style.zIndex = '7';
      c.classList.remove('is-center');
      c.setAttribute('aria-hidden', 'true');
      c._wrapTo = setTimeout(() => {
        c.style.transition = 'none';
        c.style.setProperty('--off', 3);
        c.style.setProperty('--offa', 4);
        c.offsetHeight;
        c.style.transition = '';
        c.style.setProperty('--off', 2);
        c.style.setProperty('--offa', 2);
        c.style.zIndex = '8';
        c._wrapTo = null;
      }, 300);
      return;
    } else if (prevOff === 2 && off === -2) {
      c.style.setProperty('--off', 3);
      c.style.setProperty('--offa', 4);
      c.style.zIndex = '7';
      c.classList.remove('is-center');
      c.setAttribute('aria-hidden', 'true');
      c._wrapTo = setTimeout(() => {
        c.style.transition = 'none';
        c.style.setProperty('--off', -3);
        c.style.setProperty('--offa', 4);
        c.offsetHeight;
        c.style.transition = '';
        c.style.setProperty('--off', -2);
        c.style.setProperty('--offa', 2);
        c.style.zIndex = '8';
        c._wrapTo = null;
      }, 300);
      return;
    }

    c.classList.toggle('is-center', off === 0); 
    c.style.setProperty('--off', off); 
    c.style.setProperty('--offa', Math.abs(off)); 
    c.style.zIndex = String(10 - Math.abs(off)); 
    c.setAttribute('aria-hidden', off === 0 ? 'false' : 'true'); 
  }); 
  dashEls.forEach((d, k) => { d.classList.toggle('is-on', k === i); d.setAttribute('aria-selected', k === i ? 'true' : 'false'); }); 
};`;

if (js.includes('c.classList.toggle(\'is-center\', off === 0);')) {
    const regex = /const paint = \(\) => \{ cards\.forEach\(\(c, k\) => \{ let off = \(k - i \+ n\) % n; if \(off > 2\) off -= n;[\s\S]*?\}\); dashEls\.forEach\(\(d, k\) => \{ d\.classList\.toggle\('is-on', k === i\); d\.setAttribute\('aria-selected', k === i \? 'true' : 'false'\); \}\); \};/;
    if (regex.test(js)) {
        js = js.replace(regex, replaceStr);
        fs.writeFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', js);
        console.log('Success');
    } else {
        console.log('Regex failed');
    }
} else {
    console.log('Could not find paint function base string.');
}
