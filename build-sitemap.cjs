const fs = require('fs');
const c = fs.readFileSync('constants.tsx', 'utf8');

function getIDs(startStr) {
    const idx = c.indexOf(startStr);
    if (idx === -1) return [];
    
    // Find the matching closing bracket for this array
    let blockStart = c.indexOf('[', idx);
    if (blockStart === -1) return [];
    
    let depth = 0;
    let endIdx = -1;
    for (let i = blockStart; i < c.length; i++) {
        if (c[i] === '[') depth++;
        if (c[i] === ']') depth--;
        if (depth === 0) {
            endIdx = i;
            break;
        }
    }
    
    if (endIdx === -1) return [];
    
    const block = c.substring(blockStart, endIdx + 1);
    const ids = [];
    const regex = /id:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(block)) !== null) {
        ids.push(match[1]);
    }
    return ids;
}

const services = getIDs('export const SERVICES');
const blogs = getIDs('export const BLOGS');
const industries = getIDs('export const INDUSTRIES');

console.log('Services:', services.length);
console.log('Blogs:', blogs.length);
console.log('Industries:', industries.length);

const t = new Date().toISOString().split('T')[0];
let sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url><loc>https://www.qintellecttechnologies.com/</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/about</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/services</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/industries</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/portfolios</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/blog</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/contact</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
`;

services.forEach(id => {
    sm += `  <url><loc>https://www.qintellecttechnologies.com/service/${id}</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>\n`;
});

blogs.forEach(id => {
    sm += `  <url><loc>https://www.qintellecttechnologies.com/blog/${id}</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.75</priority></url>\n`;
});

industries.forEach(id => {
    sm += `  <url><loc>https://www.qintellecttechnologies.com/industries/${id}</loc><lastmod>${t}</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>\n`;
});

sm += '</urlset>';
fs.writeFileSync('public/sitemap.xml', sm);
console.log('Sitemap successfully rebuilt!');