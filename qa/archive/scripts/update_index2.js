const fs = require('fs');
let html = fs.readFileSync('E:/Mail-Factory-Labs/site/index.html', 'utf8');
const search = /<article class="sc-card"><span class="si-n">STATE \/ 04<\/span>[\s\S]*?<div class="si-bar"><i><\/i><\/div><\/article>/;
const replace = `<article class="sc-card"><span class="si-n">STATE / 04</span>
        <h3>Disconnecting</h3><p>The session is winding down. The interface returns to rest and telemetry resets.</p>
        <div class="si-tele st-wait"><div class="sit-row"><span>PING</span><b>···</b></div><div class="sit-row"><span>DOWN</span><b>···</b></div><div class="sit-row"><span>UP</span><b>···</b></div><div class="sit-row"><span>SESSION</span><b>stopping</b></div></div>
        <div class="si-bar"><i></i></div></article>
    <article class="sc-card"><span class="si-n">STATE / 05</span>
        <h3>Emergency stop</h3><p>“Immediately end the simulated session?” — a confirmation step guards the hard exit.</p>
        <div class="si-tele st-stop"><div class="sit-row"><span>PING</span><b>—</b></div><div class="sit-row"><span>DOWN</span><b>—</b></div><div class="sit-row"><span>UP</span><b>—</b></div><div class="sit-row"><span>SESSION</span><b>ended</b></div></div>
        <div class="si-bar"><i></i></div></article>`;
if(search.test(html)) {
    html = html.replace(search, replace);
    fs.writeFileSync('E:/Mail-Factory-Labs/site/index.html', html);
    console.log("Success");
} else {
    console.log("Could not find block");
}
