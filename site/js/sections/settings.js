/* Chapter 08: interactive settings system tree. */
import { gsap } from '../core/scroll.js';
import { $, $$ } from '../core/ui.js';

function tree() {
  const t = $('[data-tree]'); if (!t) return;
  const labels = $$('.tl', t);
  new IntersectionObserver(([en], io) => { if (!en.isIntersecting) return; io.disconnect(); gsap.from(labels, { opacity: 0, x: -8, duration: .6, stagger: .05, ease: 'power2.out' }); }, { threshold: .1 }).observe(t);
  /* owner note 36: the settings tree is an INTERACTIVE system map — every node opens
     the real destination inside the live application. */
  const go = (node) => {
    const act = node.dataset.treeAct || '';
    const frame = document.getElementById('app-frame');
    const w = frame && frame.contentWindow;
    window.__mf && window.__mf.stage && window.__mf.stage.showScreen('settings');
    setTimeout(() => {
      if (!w) return;
      try {
        if (act === 'sub:backup') { w.openBackupScreen && w.openBackupScreen(); }
        else if (act.startsWith('sub:')) { w.openSettingsSubpage && w.openSettingsSubpage(act.slice(4)); }
      } catch (err) { console.warn('[tree] navigation failed', err); }
    }, 260);
    labels.forEach((l) => l.classList.toggle('is-active', l === node));
    $$('.tl.node', t).forEach((x) => x.setAttribute('aria-expanded', x === node ? 'true' : 'false'));
  };
  $$('.tl.node', t).forEach((n) => {
    n.addEventListener('click', () => go(n));
    n.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(n); } });
  });
}

export function init() { tree(); }
