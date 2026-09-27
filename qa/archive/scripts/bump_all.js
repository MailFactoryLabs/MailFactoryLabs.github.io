const fs = require('fs');
const path = require('path');

function bumpDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      bumpDir(p);
    } else if (p.endsWith('.js') || p.endsWith('.html')) {
      let content = fs.readFileSync(p, 'utf8');
      if (content.includes('20260926v') || content.includes('20260927v')) {
        content = content.replace(/20260926v|20260927v/g, '20260928v');
        fs.writeFileSync(p, content, 'utf8');
        console.log('Bumped', p);
      }
    }
  }
}

bumpDir('E:/Mail-Factory-Labs/site');
console.log('All files bumped to 20260928v');
