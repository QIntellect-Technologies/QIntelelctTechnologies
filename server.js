import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = join(__dirname, 'dist');

// Serve static files from dist (includes sitemap.xml, robots.txt, etc.)
app.use(express.static(distPath));

// SPA fallback — serve index.html for all non-file routes
app.get('*', (req, res) => {
    // If the request is for a known static file, let express.static handle it
    const filePath = join(distPath, req.path);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        return res.sendFile(filePath);
    }
    // Otherwise serve the SPA
    res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
