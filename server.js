const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
    '.ogg': 'video/ogg',
    '.mov': 'video/quicktime',
    '.m4v': 'video/mp4',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.m4a': 'audio/mp4',
    '.aac': 'audio/aac'
};

const server = http.createServer((req, res) => {
    // Strip query string from URL (e.g., ?v=4 for cache busting)
    const urlPath = req.url.split('?')[0];
    let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);
    const ext = path.extname(filePath).toLowerCase();
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Serve custom 404 page with game
            const notFoundPath = path.join(__dirname, '404.html');
            fs.readFile(notFoundPath, (err404, data404) => {
                if (err404) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end('<h1>404 Not Found</h1>');
                    return;
                }
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(data404);
            });
            return;
        }
        // Performance optimization: Cache headers
        const cacheMaxAge = {
            '.html': 3600, // 1 hour for HTML
            '.css': 31536000, // 1 year for static assets (with versioned queries in index.html)
            '.js': 31536000,
            '.jpg': 31536000,
            '.jpeg': 31536000,
            '.png': 31536000,
            '.gif': 31536000,
            '.svg': 31536000,
            '.ico': 31536000
        };
        const maxAge = cacheMaxAge[ext];
        if (maxAge !== undefined) {
            res.setHeader('Cache-Control', `public, max-age=${maxAge}${maxAge > 3600 ? ', immutable' : ''}`);
        }

        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
