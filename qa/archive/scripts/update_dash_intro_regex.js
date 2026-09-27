const fs = require('fs');
let html = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');

const regex = /<section class="sec quiet" id="s-quiet-1" data-theme="dark">[\s\S]*?<\/section>/;

const newDashIntro = `<section class="sec dash-intro" id="s-dash-intro" data-chapter="dashboard" data-theme="dark">
    <div class="dash-intro-inner">
      <p class="t-l5 eo-eyebrow">Chapter 03</p>
      <h2 class="eo-title" aria-label="Dashboard">
        <span>D</span><span>A</span><span>S</span><span>H</span><span>B</span><span>O</span><span>A</span><span>R</span><span>D</span>
      </h2>
    </div>
  </section>`;

if (regex.test(html)) {
  html = html.replace(regex, newDashIntro);
  fs.writeFileSync('E:/Mail-Factory-Labs/site/index.html', html, 'utf8');
  console.log('HTML updated successfully with regex!');
} else {
  console.log('Regex did not match!');
}
