const fs = require('fs');
const path = require('path');

function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (p.endsWith('.tsx')) {
            let c = fs.readFileSync(p, 'utf8');
            // Adding loading="lazy" if not present
            let nc = c.replace(/<img(?![^>]*loading=)/g, '<img loading="lazy"');
            if (c !== nc) {
                fs.writeFileSync(p, nc);
                console.log('Updated ' + p);
            }
        }
    });
}

walk('pages');
walk('components');
