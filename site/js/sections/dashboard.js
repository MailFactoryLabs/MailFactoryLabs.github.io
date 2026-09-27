/* Chapter 03: colonnade tiles, Open Factory kinetic type, dashboard live annotations. */
import { env } from '../core/env.js?v=20260929v';
import { gsap, ScrollTrigger } from '../core/scroll.js';
import { $, $$ } from '../core/ui.js';

function colonnade() {
  const c = $('[data-colonnade]'); if (!c) return;
  const cols = $$('.col', c);
  const activate = (col) => cols.forEach((x) => x.classList.toggle('is-active', x === col));
  cols.forEach((col) => { col.addEventListener('click', () => activate(col)); if (env.finePointer) col.addEventListener('pointerenter', () => activate(col)); });
  // auto-advance until the visitor interacts
  let auto = true; c.addEventListener('pointerdown', () => (auto = false), { once: true });
  let i = 0; const timer = setInterval(() => { if (!auto) return clearInterval(timer); const r = c.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; i = (i + 1) % cols.length; activate(cols[i]); }, 3200);
}

function openFactory() {
  const sec = $('#s-openfactory'); if (!sec) return;
  const word = sec.querySelector('.of-word');
  sec.addEventListener('mf:pin', (e) => { const p = e.detail; const k = p < .5 ? p * 2 : 1; word.style.setProperty('--k', k.toFixed(3)); word.style.transform = `scale(${(0.92 + k * 0.08).toFixed(3)})`; });
}

function statement() {
  // dashboard statement: staggered big type reveals are generic; add a subtle horizontal drift to the copy
  const sec = $('#s-dash-state'); if (!sec || env.reduced) return;
  gsap.fromTo(sec.querySelector('.dash-state-copy'), { x: 40 }, { x: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
}


function intro() {
  const sec = $('#s-dash-intro'); if (!sec) return;
  const letters = $$('.eo-title span', sec);
  ScrollTrigger.create({ trigger: sec, start: 'top 60%', once: true, onEnter: () => {
    gsap.to(letters, { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out', stagger: { each: .07, from: 'center' } });
  } });
  if (!env.reduced) gsap.to(sec.querySelector('.eo-title'), { yPercent: -12, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true } });
}
export function init() {
  intro(); colonnade(); openFactory(); statement(); }
