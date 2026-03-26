const fs = require('fs');
const path = require('path');

const constantsPath = path.join(__dirname, 'constants.tsx');
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

const c = fs.readFileSync(constantsPath, 'utf8');
const lines = c.split('\n');
const services = [], blogs = [], industries = [];
let currentArr = '';

for (let line of lines) {
    if (line.includes('export const SERVICES')) currentArr = 'services';
    else if (line.includes('export const BLOGS')) currentArr = 'blogs';
    else if (line.includes('export const INDUSTRIES')) currentArr = 'industries';

    if (currentArr && line.includes('id:')) {
        const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
        if (idMatch && idMatch[1]) {
            if (currentArr === 'services') services.push(idMatch[1]);
            if (currentArr === 'blogs') blogs.push(idMatch[1]);
            if (currentArr === 'industries') industries.push(idMatch[1]);
        }
    }
}

const t = new Date().toISOString().split('T')[0];
let sm = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.qintellecttechnologies.com/</loc>
    <lastmod>${t}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.qintellecttechnologies.com/about</loc>
    <lastmod>${t}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.qintellecttechnologies.com/services</loc>
    <lastmod>${t}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.qintellecttechnologies.com/industries</loc>
    <lastmod>${t}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.qintellecttechnologies.com/portfolios</loc>
    <lastmod>${t}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.qintellecttechnologies.com/blog</loc>
    <lastmod>${t}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.qintellecttechnologies.com/contact</loc>
    <lastmod>${t}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

services.forEach(id => {
    sm += `  <url>
    <loc>https://www.qintellecttechnologies.com/service/${id}</loc>
    <lastmod>${t}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
});

blogs.forEach(id => {
    sm += `  <url>
    <loc>https://www.qintellecttechnologies.com/blog/${id}</loc>
    <lastmod>${t}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>\n`;
});

industries.forEach(id => {
    sm += `  <url>
    <loc>https://www.qintellecttechnologies.com/industries/${id}</loc>
    <lastmod>${t}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>\n`;
});

sm += `</urlset>`;

fs.writeFileSync(sitemapPath, sm);
console.log(`Generated sitemap with ${services.length} services, ${blogs.length} blogs, and ${industries.length} industries.`);
