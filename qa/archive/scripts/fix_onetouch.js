const fs = require('fs');
let content = fs.readFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', 'utf8');

const newDial = `function dial() {
  const dial = $('[data-dial]'); if (!dial) return;
  const g = dial.querySelector('.d-ticks');
  if (g) {
    for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 2; const major = i % 5 === 0; const r1 = major ? 150 : 158, r2 = 166; const l = document.createElementNS('http://www.w3.org/2000/svg', 'line'); l.setAttribute('x1', 200 + Math.cos(a) * r1); l.setAttribute('y1', 200 + Math.sin(a) * r1); l.setAttribute('x2', 200 + Math.cos(a) * r2); l.setAttribute('y2', 200 + Math.sin(a) * r2); if (major) l.classList.add('major'); g.appendChild(l); }
  }
  const obj = { p: 0 };
  const arc = dial.querySelector('.d-ring-1'); 
  let L = 0;
  if (arc) {
    L = arc.getTotalLength(); arc.style.strokeDasharray = L; arc.style.strokeDashoffset = L;
  }
  const nums = $$('.d-num strong', dial);
  ScrollTrigger.create({ trigger: dial, start: 'top 75%', end: 'bottom 40%', scrub: env.reduced ? false : 1, onUpdate: (self) => {
    const p = self.progress; 
    if (arc) arc.style.strokeDashoffset = L * (1 - p);
    const ring2 = dial.querySelector('.d-ring-2');
    if (ring2) { ring2.style.transform = \`rotate(\${p * 90}deg)\`; ring2.style.transformOrigin = '50% 50%'; }
  } });
  if (nums && nums[3]) nums[3].textContent = '00:00';
}`;

const start = content.indexOf('function dial() {');
const end = content.indexOf('function ring() {');

content = content.substring(0, start) + newDial + '\n\n' + content.substring(end);

fs.writeFileSync('E:/Mail-Factory-Labs/site/js/sections/onetouch.js', content, 'utf8');
