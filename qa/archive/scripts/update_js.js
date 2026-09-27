const fs = require('fs');
let js = fs.readFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', 'utf8');

const targetStr = `const paint = () => { cards.forEach((c, k) => { const off = k - i; c.classList.toggle('is-center', off === 0); c.style.setProperty('--off', off); c.style.setProperty('--offa', Math.abs(off)); c.style.zIndex = String(10 - Math.abs(off)); c.setAttribute('aria-hidden', off === 0 ? 'false' : 'true'); }); dashEls.forEach((d, k) => { d.classList.toggle('is-on', k === i); d.setAttribute('aria-selected', k === i ? 'true' : 'false'); }); };`;

const replaceStr = `const paint = () => { cards.forEach((c, k) => { let off = k - i; if (off > 2) off -= n; if (off < -2) off += n; c.classList.toggle('is-center', off === 0); c.style.setProperty('--off', off); c.style.setProperty('--offa', Math.abs(off)); c.style.zIndex = String(10 - Math.abs(off)); c.setAttribute('aria-hidden', off === 0 ? 'false' : 'true'); }); dashEls.forEach((d, k) => { d.classList.toggle('is-on', k === i); d.setAttribute('aria-selected', k === i ? 'true' : 'false'); }); };`;

if (js.includes(targetStr)) {
    js = js.replace(targetStr, replaceStr);
    fs.writeFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', js);
    console.log('Success');
} else {
    console.log('Could not find paint function. Using regex.');
    const regex = /const paint = \(\) => \{ cards\.forEach\(\(c, k\) => \{ const off = k - i;[\s\S]*?\}\); \};/;
    if (regex.test(js)) {
        js = js.replace(regex, replaceStr);
        fs.writeFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', js);
        console.log('Success (regex)');
    } else {
        console.log('Regex also failed');
    }
}
