const fs = require('fs');

let html = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');

const regex = /<section class="sec dash-state" id="s-dash-state" data-chapter="dashboard" data-chapter-label="Dashboard" data-theme="dark">[\s\S]*?<\/section>/;

const oldHtml = `<section class="sec dash-state" id="s-dash-state" data-chapter="dashboard" data-chapter-label="Dashboard" data-theme="dark">
    <div class="wrap dash-state-grid">
      <div>
        <p class="eyebrow"><span class="n">08</span> Dashboard — stage 1</p>
        <h2 class="t-l2" data-reveal="lines">The first screen is a <em class="serif">status board.</em></h2>
      </div>
      <div class="dash-state-copy">
        <p class="t-l4" data-reveal="lines">The Dashboard opens with the wordmark, an animated core and a single line of state: <strong>SYSTEM STATUS — ONLINE</strong>. Two entry points follow — <strong>OPEN FACTORY</strong>, which leads to the Engine, and <strong>OPEN LIBRARY</strong>. Beneath them sit the four capability tiles.</p>
        <p class="t-l4" data-reveal="lines" data-reveal-delay=".1">It is the only screen with the warp-streak canvas — light rushing past the emblem — and the app treats its visual language as protected: unchanged from source.</p>
      </div>
    </div>
  </section>`;

html = html.replace(regex, oldHtml);

fs.writeFileSync('E:/Mail-Factory-Labs/site/index.html', html, 'utf8');
console.log('HTML restored.');
