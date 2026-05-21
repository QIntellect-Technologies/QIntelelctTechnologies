import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        var filePath = path.join(currentDirPath, name);
        var stat = fs.statSync(filePath);
        if (stat.isFile() && filePath.endsWith('.tsx')) {
            callback(filePath, stat);
        } else if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('dist')) {
            walkSync(filePath, callback);
        }
    });
}

let updated = 0;
walkSync(__dirname, function(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // React allows newlines in tags, e.g. <img \n src="..." />
    // We split by "<img" instead of "<img " 
    let parts = content.split('<img');
    for (let i = 1; i < parts.length; i++) {
        let tagEnd = parts[i].indexOf('>');
        let tagContent = parts[i].substring(0, tagEnd);
        if (!tagContent.includes('alt=')) {
            parts[i] = ' alt="QIntellect Technologies - AI Automation and Software Solutions"' + parts[i];
        }
    }
    content = parts.join('<img');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log('Fixed missing ALT tags in: ' + filePath);
        updated++;
    }
});

console.log('Total files heavily optimized with image SEO: ' + updated);
