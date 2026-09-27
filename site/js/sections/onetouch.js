import { env } from '../core/env.js?v=20260929v';
import { gsap, ScrollTrigger } from '../core/scroll.js';
import { $, $$ } from '../core/ui.js';

function pulse() {
  const sec = $('#s-pulse'); if (!sec) return;
  const state = sec.querySelector('[data-pulse-state]'); const host = sec.querySelector('.scene-host');
  const labels = { disconnected: 'You’re disconnected', connecting: 'Connecting…', connected: 'Connected', disconnecting: 'Disconnecting…' };
  host.addEventListener('mf:pulse-state', (e) => { state.dataset.state = e.detail; state.lastElementChild.textContent = labels[e.detail] || e.detail; });
}

function dial() {
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
    if (ring2) { ring2.style.transform = `rotate(${p * 90}deg)`; ring2.style.transformOrigin = '50% 50%'; }
  } });
  if (nums && nums[3]) nums[3].textContent = '00:00';
}

function ring() {
  const root = $('[data-ring]'); if (!root) return;
  const track = root.querySelector('.ring-track'); const cards = $$('.rc', track); const n = cards.length; const label = root.querySelector('[data-ring-current]');
  let rot = 0, vel = 0, dragging = false, lastX = 0, lastT = 0, idle = true;
  
  // FIX: Constant radius for strong 3D curvature across all viewports
  const radius = () => 480; 
  const step = 360 / n;
  cards.forEach((c, i) => { c.style.transform = `rotateY(${i * step}deg) translateZ(${radius()}px)`; });
  
  const layout = () => {
    const r = radius();
    // FIX: Scale the track on smaller viewports to fit the screen without changing 3D geometry
    const scale = Math.min(1, Math.max(0.65, root.clientWidth / 900));
    track.style.transform = `translateZ(${-r}px) scale(${scale}) rotateX(-6deg) rotateY(${rot.toFixed(2)}deg)`;
    let front = 0, best = -2;
    cards.forEach((c, i) => { const a = ((i * step + rot) % 360 + 360) % 360; const cos = Math.cos(a * Math.PI / 180); c.style.transform = `rotateY(${i * step}deg) translateZ(${r}px)`; c.style.opacity = String(0.25 + (cos + 1) / 2 * .75); if (cos > best) { best = cos; front = i; } });
    cards.forEach((c, i) => c.classList.toggle('is-front', i === front));
    const name = cards[front].textContent; if (label.textContent !== name) { label.textContent = name; gsap.fromTo(label, { y: 6, opacity: .3 }, { y: 0, opacity: 1, duration: .4 }); }
  };
  
  root.addEventListener('pointerdown', (e) => { dragging = true; idle = false; lastX = e.clientX; lastT = performance.now(); vel = 0; root.setPointerCapture(e.pointerId); });
  root.addEventListener('pointermove', (e) => { if (!dragging) return; const dx = e.clientX - lastX; const now = performance.now(); rot += dx * .35; vel = dx * .35 / Math.max(1, now - lastT) * 16; lastX = e.clientX; lastT = now; });
  const end = () => { dragging = false; };
  root.addEventListener('pointerup', end); root.addEventListener('pointercancel', end);
  root.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') { idle = false; vel = 0; snapTo(Math.round(-rot / step) - 1); e.preventDefault(); } if (e.key === 'ArrowRight') { idle = false; vel = 0; snapTo(Math.round(-rot / step) + 1); e.preventDefault(); } });
  const snapTo = (i) => gsap.to({ v: rot }, { v: -i * step, duration: .6, ease: 'power3.out', onUpdate() { rot = this.targets()[0].v; } });
  let visible = false; new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(root);
  let settling = false;
  gsap.ticker.add((t, dt) => {
    if (!visible) return;
    if (dragging) { settling = false; }
    else if (Math.abs(vel) > 0.02) { rot += vel; vel *= 0.95; settling = true; }
    else { if (settling) { snapTo(Math.round(-rot / step)); settling = false; } else if (idle) { rot += .08; } }
    layout();
  });
}

function states() {
  const root = $('[data-states]'); if (!root) return;
  const track = root.querySelector('.sc-track'); const cards = $$('.sc-card', track); const n = cards.length;
  const dashEls = $$('.sc-dashes i', root);
  let i = 0, auto = true, dragging = false, sx = 0, dx = 0;
  const paint = () => {
    cards.forEach((c, k) => {
      let off = (k - i + n) % n;
      if (off > 2) off -= n;
      
      let prevOffStr = c.getAttribute('data-off');
      let prevOff = prevOffStr ? parseInt(prevOffStr) : off;
      c.setAttribute('data-off', off);

      c.classList.remove('wrap-next', 'wrap-prev');
      void c.offsetWidth;

      if (prevOff === -2 && off === 2) {
        c.classList.add('wrap-next');
        c.classList.remove('is-center');
        c.setAttribute('aria-hidden', 'true');
        c.style.setProperty('--off', 2);
        c.style.setProperty('--offa', 2);
        c.style.zIndex = '8';
        return;
      } else if (prevOff === 2 && off === -2) {
        c.classList.add('wrap-prev');
        c.classList.remove('is-center');
        c.setAttribute('aria-hidden', 'true');
        c.style.setProperty('--off', -2);
        c.style.setProperty('--offa', 2);
        c.style.zIndex = '8';
        return;
      }

      c.classList.toggle('is-center', off === 0);
      c.style.setProperty('--off', off);
      c.style.setProperty('--offa', Math.abs(off));
      c.style.zIndex = String(10 - Math.abs(off));
      c.setAttribute('aria-hidden', off === 0 ? 'false' : 'true');
    });
    dashEls.forEach((d, k) => { d.classList.toggle('is-on', k === i); d.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
  };
  const go = (k) => { i = (k + n) % n; paint(); };
  const pause = () => { auto = false; clearTimeout(pause.t); pause.t = setTimeout(() => (auto = true), 9000); };
  root.querySelector('[data-sc-prev]').addEventListener('click', () => { go(i - 1); pause(); });
  root.querySelector('[data-sc-next]').addEventListener('click', () => { go(i + 1); pause(); });
  root.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') { go(i - 1); pause(); e.preventDefault(); } if (e.key === 'ArrowRight') { go(i + 1); pause(); e.preventDefault(); } });
  root.addEventListener('pointerdown', (e) => { dragging = true; sx = e.clientX; dx = 0; pause(); });
  root.addEventListener('pointermove', (e) => { if (dragging) dx = e.clientX - sx; });
  const end = () => { if (!dragging) return; dragging = false; if (dx < -40) go(i + 1); else if (dx > 40) go(i - 1); dx = 0; };
  root.addEventListener('pointerup', end); root.addEventListener('pointercancel', end);
  root.addEventListener('pointerenter', () => (auto = false)); root.addEventListener('pointerleave', () => (auto = true));
  let visible = false; new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(root);
  setInterval(() => { if (visible && auto && !dragging && !env.reduced) go(i + 1); }, 5200);
  paint();
}

export function init() { pulse(); dial(); ring(); states(); }
