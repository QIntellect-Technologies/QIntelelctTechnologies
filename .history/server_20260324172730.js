import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = join(__dirname, 'dist');

// Enable Gzip Compression for all responses (Huge Core Web Vitals boost)
app.use(compression());

// Middleware for aggressive caching of immutable assets (Core Web Vitals Optimization)
app.use((req, res, next) => {
    if (req.url.match(/\.(js|css|woff2?|png|jpe?g|gif|ico|svg)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    next();
});

// Serve static files from dist, but skip index.html so we can inject meta tags
app.use(express.static(distPath, { index: false }));

// Import the dynamically built constants for SEO
let siteData = { SERVICES: [], BLOGS: [], INDUSTRIES: [] };
try {
    siteData = await import('./dist/constants.js');
} catch (e) {
    console.warn('Could not load dist/constants.js for SEO generation. Make sure you run build script first.');
}

// Allowed static frontend routes
const staticRoutes = ['/', '/about', '/services', '/industries', '/portfolios', '/blog', '/contact'];

// SPA fallback & Server-Side Meta Injection for Social platforms
app.get('*', (req, res) => {
    // If the request is for a known static file (that wasn't caught by express.static), handle it safely
    const filePath = join(distPath, req.path);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return res.sendFile(filePath);
    }
    
    // Otherwise, it's a route. Find index.html
    const indexPath = join(distPath, 'index.html');
    if (!fs.existsSync(indexPath)) {
        return res.status(404).send('Not found');
    }
    
    let html = fs.readFileSync(indexPath, 'utf8');
    
    // Default fallback metadata
    let title = 'QIntellect - AI Automation Platform for Business | QIntellect Technologies';
    let description = 'QIntellect is an AI-powered automation platform offering industry-specific solutions for finance, healthcare, SaaS, and manufacturing. Accelerate operations with smart AI workflows.';
    let image = 'https://www.qintellecttechnologies.com/og-image.png';
    let url = 'https://www.qintellecttechnologies.com' + req.path;

    // Detect dynamic routes via Regex
    const serviceMatch = req.path.match(/^\/service\/([^/]+)/);
    const blogMatch = req.path.match(/^\/blog\/([^/]+)/);
    const industryMatch = req.path.match(/^\/industries\/([^/]+)/);

    let routeIsValid = false;

    if (staticRoutes.includes(req.path) || req.path === '') {
        routeIsValid = true;
    } else if (serviceMatch) {
        const item = siteData.SERVICES?.find(s => s.id === serviceMatch[1]);
        if (item) {
            title = `${item.title} | QIntellect Services`;
            description = item.shortDescription || description;
            routeIsValid = true;
        }
    } else if (blogMatch) {
        const item = siteData.BLOGS?.find(b => b.id === blogMatch[1]);
        if (item) {
            title = `${item.title} | QIntellect Blog`;
            description = item.excerpt || description;
            image = item.image || image;
            routeIsValid = true;
        }
    } else if (industryMatch) {
        const item = siteData.INDUSTRIES?.find(i => i.id === industryMatch[1]);
        if (item) {
            title = `${item.title} | QIntellect Industries`;
            description = item.shortDescription || description;
            routeIsValid = true;
        }
    }

    // Set proper HTTP Status Code
    // If not a valid route, return a 404 status (Soft 404 Prevention for Google)
    if (!routeIsValid) {
        res.status(404);
        title = 'Page Not Found | QIntellect Technologies';
        description = 'The page you are looking for does not exist.';
    } else {
        res.status(200);
    }

    // Inject Meta Tags directly into the HTML string before sending to client
    html = html.replace(/<title>.*?<\/title>/gi, `<title>${title}</title>`);
    html = html.replace(/<meta name="title" content="[^"]*"/gi, `<meta name="title" content="${title}"`);
    html = html.replace(/<meta name="description" content="[^"]*"/gi, `<meta name="description" content="${description}"`);
    
    // OpenGraph Injections
    html = html.replace(/<meta property="og:title" content="[^"]*"/gi, `<meta property="og:title" content="${title}"`);
    html = html.replace(/<meta property="og:description" content="[^"]*"/gi, `<meta property="og:description" content="${description}"`);
    html = html.replace(/<meta property="og:image" content="[^"]*"/gi, `<meta property="og:image" content="${image}"`);
    html = html.replace(/<meta property="og:url" content="[^"]*"/gi, `<meta property="og:url" content="${url}"`);
    
    // Twitter Card Injections
    html = html.replace(/<meta name="twitter:title" content="[^"]*"/gi, `<meta name="twitter:title" content="${title}"`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*"/gi, `<meta name="twitter:description" content="${description}"`);
    html = html.replace(/<meta name="twitter:image" content="[^"]*"/gi, `<meta name="twitter:image" content="${image}"`);

    // Disable caching for the HTML document so dynamic injections and 404s are always fresh
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(html);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
