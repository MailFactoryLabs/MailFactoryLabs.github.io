/* Chapters 09–13: topology, story sync label, FAQ, word ring, split-flap, rating, final download. */
import { env, config } from '../core/env.js?v=20260929v';
import { gsap, ScrollTrigger } from '../core/scroll.js';
import { $, $$, toast } from '../core/ui.js';

function topology() {
  const root = $('[data-topo]'); if (!root) return;
  const svg = root.querySelector('.topo-lines'); const nodes = $$('.tn', root);
  const byId = Object.fromEntries(nodes.map((n) => [n.dataset.node, n]));
  const paths = [];
  const build = () => {
    svg.innerHTML = ''; paths.length = 0;
    const R = root.getBoundingClientRect(); svg.setAttribute('viewBox', `0 0 ${R.width} ${R.height}`);
    nodes.forEach((n) => {
      const p = byId[n.dataset.parent]; if (!p) return;
      const a = p.getBoundingClientRect(), b = n.getBoundingClientRect();
      const x1 = a.left + a.width / 2 - R.left, y1 = a.bottom - R.top, x2 = b.left + b.width / 2 - R.left, y2 = b.top - R.top;
      const my = (y1 + y2) / 2;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${x1} ${y1} C${x1} ${my} ${x2} ${my} ${x2} ${y2}`); path.dataset.from = p.dataset.node; path.dataset.to = n.dataset.node;
      svg.appendChild(path); paths.push(path);
    });
  };
  const light = (id) => {
    const chain = new Set(); let cur = id; while (cur) { chain.add(cur); cur = byId[cur] && byId[cur].dataset.parent; }
    // children too
    nodes.forEach((n) => { if (n.dataset.parent === id) chain.add(n.dataset.node); });
    nodes.forEach((n) => n.classList.toggle('is-on', chain.has(n.dataset.node)));
    paths.forEach((p) => p.classList.toggle('is-on', chain.has(p.dataset.from) && chain.has(p.dataset.to)));
  };
  nodes.forEach((n) => { n.addEventListener('pointerenter', () => light(n.dataset.node)); n.addEventListener('click', () => light(n.dataset.node)); });
  root.addEventListener('pointerleave', () => { nodes.forEach((n) => n.classList.remove('is-on')); paths.forEach((p) => p.classList.remove('is-on')); });
  build(); addEventListener('resize', build); document.fonts && document.fonts.ready.then(build);
  // the topology also lights the screen the live app is on
  document.addEventListener('mf:screen', (e) => { if (root.matches(':hover')) return; light(e.detail); });
  ScrollTrigger.create({ trigger: root, start: 'top 80%', once: true, onEnter: () => { if (env.reduced) return; gsap.fromTo(nodes, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .8, stagger: .05, ease: 'power3.out' }); gsap.fromTo(paths, { opacity: 0 }, { opacity: 1, duration: 1, delay: .4, stagger: .04 }); } });
}

function story() {
  const label = $('[data-story-screen]'); if (!label) return;
  document.addEventListener('mf:screen', (e) => { label.textContent = e.detail; gsap.fromTo(label, { opacity: .2 }, { opacity: 1, duration: .5 }); });
  $$('.beat').forEach((b) => ScrollTrigger.create({ trigger: b, start: 'top 60%', end: 'bottom 40%', onToggle: (s) => b.classList.toggle('is-on', s.isActive) }));
}

function faq() {
  const root = $('[data-faq]'); if (!root) return;
  $$('.fq', root).forEach((fq) => { const b = fq.querySelector('button'); b.addEventListener('click', () => { const open = fq.classList.contains('is-open'); $$('.fq', root).forEach((x) => { x.classList.remove('is-open'); x.querySelector('button').setAttribute('aria-expanded', 'false'); }); if (!open) { fq.classList.add('is-open'); b.setAttribute('aria-expanded', 'true'); } }); });
}

function flap() {
  const f = $('[data-flap]'); if (!f) return;
  const chars = $$('[data-flap-char]', f);
  ScrollTrigger.create({ trigger: f, start: 'top 80%', once: true, onEnter: () => {
    chars.forEach((c, i) => {
      const final = c.dataset.flapChar; if (!/\d/.test(final)) return;
      let cur = 0; const steps = 8 + i * 4; let k = 0;
      const tick = () => { k++; cur = (cur + 1) % 10; c.textContent = k >= steps ? final : cur; c.classList.remove('is-flipping'); void c.offsetWidth; c.classList.add('is-flipping'); if (k < steps) setTimeout(tick, env.reduced ? 0 : 70 + k * 6); };
      setTimeout(tick, i * 120);
    });
  } });
}

function rating() {
  const root = $('[data-rating]'); if (!root) return;
  const stars = $$('button', root); const word = $('[data-rating-word]'); const form = $('[data-rating-form]'); const thanks = $('[data-rating-thanks]');
  const words = ['', 'Rough', 'Uneven', 'Decent', 'Strong', 'Exceptional'];
  const KEY = 'mf.site.rating';
  let value = 0;
  try { const saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.value) { value = saved.value; } } catch (_) {}
  const paint = (v, hot = false) => { stars.forEach((s, i) => { s.classList.toggle(hot ? 'is-hot' : 'is-set', i < v); if (!hot) s.classList.remove('is-hot'); }); };
  const setWord = (v) => { word.textContent = v ? `${v} / 5 — ${words[v]}` : 'Choose a rating'; };
  const select = (v) => { value = v; paint(v); setWord(v); stars.forEach((s, i) => { s.setAttribute('aria-checked', i + 1 === v); s.tabIndex = i + 1 === v ? 0 : -1; }); stars[v - 1].classList.remove('is-burst'); void stars[v - 1].offsetWidth; stars[v - 1].classList.add('is-burst'); form.classList.add('is-on'); if (env.coarse && navigator.vibrate) { try { navigator.vibrate(6); } catch (_) {} } try { localStorage.setItem(KEY, JSON.stringify({ value: v, at: Date.now() })); } catch (_) {} };
  stars.forEach((s, i) => {
    s.addEventListener('pointerenter', () => { if (env.finePointer) { paint(i + 1, true); setWord(i + 1); } });
    s.addEventListener('click', () => select(i + 1));
    s.addEventListener('keydown', (e) => { let nv = null; if (e.key === 'ArrowRight' || e.key === 'ArrowUp') nv = Math.min(5, (value || 0) + 1); if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') nv = Math.max(1, (value || 1) - 1); if (/^[1-5]$/.test(e.key)) nv = +e.key; if (nv) { e.preventDefault(); select(nv); stars[nv - 1].focus(); } });
  });
  root.addEventListener('pointerleave', () => { paint(value); setWord(value); });
  // touch: sliding across the stars rates
  root.addEventListener('pointermove', (e) => { if (e.pointerType !== 'touch' || !e.buttons) return; const el = document.elementFromPoint(e.clientX, e.clientY); const b = el && el.closest('button'); if (b && stars.includes(b)) { const v = stars.indexOf(b) + 1; if (v !== value) select(v); } });
  if (value) { select(value); }
  stars[0].tabIndex = value ? -1 : 0;
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); if (!value) { toast('Pick a star first'); return; }
    const text = form.querySelector('textarea').value.trim();
    const payload = { value, text, at: new Date().toISOString(), ua: navigator.userAgent };
    try { localStorage.setItem(KEY, JSON.stringify(payload)); } catch (_) {}
    if (config.feedbackEndpoint) { try { await fetch(config.feedbackEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); } catch (_) { toast('Could not reach the feedback endpoint — kept locally'); } }
    form.hidden = true; thanks.hidden = false; gsap.fromTo(thanks, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: .8 });
  });
}

function finalDownload() {
  const sec = $('#s-final-download'); if (!sec) return;
  const btn = sec.querySelector('.btn-final');
  document.addEventListener('mf:download', () => { const host = sec.querySelector('.scene-host'); host && host.dispatchEvent(new CustomEvent('mf:core-pulse')); });
  sec.addEventListener('mf:pin', (e) => { const p = e.detail; const inner = sec.querySelector('.final-dl-inner'); inner.style.opacity = Math.min(1, p * 3); inner.style.transform = `translateY(${((1 - Math.min(1, p * 3)) * 40).toFixed(1)}px)`; });
}

function support() {
  $$('[data-support-target]').forEach((link) => link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = config.supportTargets && config.supportTargets[link.dataset.supportTarget];
    if (!target) { toast('This destination is ready for its official link.'); return; }
    let url;
    try { url = new URL(target, location.href); } catch (_) { toast('This destination is not a valid link.'); return; }
    if (url.protocol === 'https:' || url.protocol === 'http:') window.open(url.href, '_blank', 'noopener,noreferrer');
    else if (url.protocol === 'mailto:' || url.protocol === 'tel:') location.href = url.href;
    else toast('Use an HTTPS, email, or telephone destination.');
  }));
}

export function init() { topology(); story(); faq(); flap(); rating(); support(); finalDownload(); }
