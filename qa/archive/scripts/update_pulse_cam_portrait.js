const fs = require('fs');

let js = fs.readFileSync('E:/Mail-Factory-Labs/site/js/scenes/pulse.js', 'utf8');

js = js.replace('camera.lookAt(portrait ? 0 : -1.6, portrait ? 1.2 : 0, 0);',
                'camera.lookAt(portrait ? 0 : -1.6, portrait ? -1.5 : 0, 0);');

fs.writeFileSync('E:/Mail-Factory-Labs/site/js/scenes/pulse.js', js, 'utf8');
console.log('pulse.js camera updated for portrait.');
