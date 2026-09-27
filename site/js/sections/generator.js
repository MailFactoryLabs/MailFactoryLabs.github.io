/* Chapter 05: mode toggle, arc carousel, parameter board, one-tap copy demo. */
import { gsap, ScrollTrigger } from '../core/scroll.js';
import { $, $$, toast } from '../core/ui.js';

function modeToggle() {
  const root = $('[data-gen-toggle]'); if (!root) return;
  const words = $$('.gen-word', root); const descs = $$('[data-mode-desc]', root);
  const set = (mode, drive = true) => {
    words.forEach((w) => w.classList.toggle('is-active', w.dataset.mode === mode));
    descs.forEach((d) => d.classList.toggle('is-active', d.dataset.modeDesc === mode));
    if (!drive) return;
    // drive the real application's own tab, through its own click handler
    try { const doc = $('#app-frame').contentDocument; const tab = doc && doc.querySelector(`.tab[data-tab="${mode}"]`); if (tab && !tab.classList.contains('active')) tab.click(); } catch (_) {}
  };
  words.forEach((w) => w.addEventListener('click', () => set(w.dataset.mode)));
}

function arc() {
  const root = $('[data-arc]'); if (!root) return;
  const cards = $$('.arc-card', root); let active = 0;
  const set = (i) => {
    active = Math.max(0, Math.min(cards.length - 1, i));
    cards.forEach((c, j) => { const selected = j === active; c.classList.toggle('is-front', selected); c.setAttribute('aria-pressed', String(selected)); });
  };
  cards.forEach((c, i) => {
    c.addEventListener('click', () => set(i));
    c.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { const next = Math.max(0, Math.min(cards.length - 1, i + (e.key === 'ArrowRight' ? 1 : -1))); set(next); cards[next].focus(); e.preventDefault(); }
      if (e.key === 'Enter' || e.key === ' ') { set(i); e.preventDefault(); }
    });
  });
  set(0);
}

function params() {
  const board = $('[data-params]'); if (!board) return;
  const readout = $('[data-readout] code'); const out = $('[data-out-count]'); const ro = $('[data-readout]');
  const state = { email: 12, pass: 16, qty: 10 };
  const render = () => { readout.textContent = `BATCH · QTY ${state.qty} · EMAIL ${state.email} · PASS ${state.pass}`; out.textContent = state.qty; ro.classList.add('is-flash'); setTimeout(() => ro.classList.remove('is-flash'), 220); };
  $$('.pgroup[data-group]', board).forEach((g) => { const k = g.dataset.group; $$('button', g).forEach((b) => b.addEventListener('click', () => { $$('button', g).forEach((x) => x.classList.remove('is-on')); b.classList.add('is-on'); state[k] = +b.dataset.v; render(); gsap.fromTo(out, { scale: 1.15 }, { scale: 1, duration: .4, ease: 'power3.out' }); })); });
}

function copyDemo() {
  const demo = $('[data-copy-demo]'); if (!demo) return;
  const text = demo.querySelector('[data-cd-text]').textContent;
  const fire = async (e) => {
    if (e && e.clientX) { const r = demo.getBoundingClientRect(); demo.style.setProperty('--cx', ((e.clientX - r.left) / r.width * 100) + '%'); demo.style.setProperty('--cy', ((e.clientY - r.top) / r.height * 100) + '%'); }
    demo.classList.add('is-copied'); setTimeout(() => demo.classList.remove('is-copied'), 900);
    try { await navigator.clipboard.writeText(text); toast('Sample copied', 'ok'); } catch (_) { toast('Copy is blocked in this context'); }
  };
  demo.addEventListener('click', fire);
  demo.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fire(); } });
}

export function init() { modeToggle(); arc(); params(); copyDemo(); }
