const fs = require('fs');

let code = fs.readFileSync('constants.tsx', 'utf-8');
const blockStr = code.substring(code.indexOf('export const BLOGS: BlogPost[] = ['), code.indexOf('export const INDUSTRIES: Industry[] = ['));

let idsMatch = blockStr.match(/id:\s*'([a-zA-Z0-9-]+)'/g);
let ids = idsMatch ? idsMatch.map(s => s.split("'")[1]) : [];
let markdownLinks = ids.map(id => {
  return '- https://www.qintellecttechnologies.com/blog/' + id;
});

fs.writeFileSync('links_output.md', markdownLinks.join('\n'));
console.log('Total verified blogs count = ' + ids.length);
