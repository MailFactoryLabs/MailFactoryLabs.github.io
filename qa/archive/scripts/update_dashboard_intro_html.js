const fs = require('fs');

let html = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');

const oldQuiet = `<section class="sec quiet" id="s-quiet-1" data-theme="dark">
    <div class="quiet-inner">
      <i class="dot"></i>
      <p class="t-l5">Chapter 03</p>
      <p class="quiet-word">Dashboard</p>
      <p class="t-l8">The first live surface begins below.</p>
    </div>
  </section>`;

const newDashIntro = `<section class="sec dash-intro" id="s-dash-intro" data-chapter="dashboard" data-theme="dark">
    <div class="dash-intro-inner">
      <p class="t-l5 eo-eyebrow">Chapter 03</p>
      <h2 class="eo-title" aria-label="Dashboard">
        <span>D</span><span>A</span><span>S</span><span>H</span><span>B</span><span>O</span><span>A</span><span>R</span><span>D</span>
      </h2>
    </div>
  </section>`;

html = html.replace(oldQuiet, newDashIntro);

fs.writeFileSync('E:/Mail-Factory-Labs/site/index.html', html, 'utf8');
console.log('HTML updated with new Dashboard Intro.');
