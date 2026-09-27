const fs = require('fs');

let js = fs.readFileSync('E:/Mail-Factory-Labs/site/js/sections/dashboard.js', 'utf8');

const newFunc = `
function intro() {
  const sec = $('#s-dash-intro'); if (!sec) return;
  const letters = $$('.eo-title span', sec);
  ScrollTrigger.create({ trigger: sec, start: 'top 60%', once: true, onEnter: () => {
    gsap.to(letters, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: { each: .07, from: 'center' } });
  } });
  if (!env.reduced) gsap.to(sec.querySelector('.eo-title'), { yPercent: -12, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true } });
}
`;

js = js.replace('export function init() {', newFunc + 'export function init() {\n  intro();');
fs.writeFileSync('E:/Mail-Factory-Labs/site/js/sections/dashboard.js', js, 'utf8');
console.log('JS updated.');
