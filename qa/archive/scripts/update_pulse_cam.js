const fs = require('fs');

let js = fs.readFileSync('E:/Mail-Factory-Labs/site/js/scenes/pulse.js', 'utf8');

// Change camera position to shift object to the right
js = js.replace('camera.position.x = damp(camera.position.x, (env.finePointer ? state.global.nx : 0) * .5 + (portrait ? 0 : 1.6), 2, dt);', 
                'camera.position.x = damp(camera.position.x, (env.finePointer ? state.global.nx : 0) * .5 + (portrait ? 0 : -2.6), 2, dt);');

js = js.replace('camera.lookAt(portrait ? 0 : 0.9, portrait ? 1.2 : 0, 0);',
                'camera.lookAt(portrait ? 0 : -1.6, portrait ? 1.2 : 0, 0);');

fs.writeFileSync('E:/Mail-Factory-Labs/site/js/scenes/pulse.js', js, 'utf8');
console.log('pulse.js updated.');
