const fs = require('fs');
const c = fs.readFileSync('constants.tsx', 'utf8');

const t = new Date().toISOString().split('T')[0];
let sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

  <url><loc>https://www.qintellecttechnologies.com/</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/about</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/services</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/industries</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/portfolios</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/blog</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://www.qintellecttechnologies.com/contact</loc><lastmod>${t}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
`;

// Extract SERVICES, INDUSTRIES, BLOGS manually to avoid regex timeouts with large strings

// helper for capturing block by finding 'export const NAME = [' and scanning brackets
function extractIDs(varName) {
    const ids = [];
    const startIndex = c.indexOf(`export const ${varName} = [`);
    if (startIndex === -1) return ids;
    
    let depth = 0;
    let endIndex = -1;
    let started = false;
    for (let i = startIndex; i < c.length; i++) {
        if (c[i] === '[') {
            depth++;
            started = true;
        } else if (c[i] === ']') {
            depth--;
            if (started && depth === 0) {
                endIndex = i;
                break;
            }
        }
    }
    
    if (endIndex !== -1) {
        const block = c.substring(startIndex, endIndex);
        const matches = block.matchAll(/id:\s*['"]([^'"]+)['"]/g);
        for (const m of matches) {
            ids.push(m[1]);
        }
    }
    return ids;
}

const services = extractIDs('SERVICES');
const blogs = extractIDs('BLOGS');
const industries = extractIDs('INDUSTRIES');

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
console.log('Sitemap generated with ' + (7 + services.length + blogs.length + industries.length) + ' URLs.');
