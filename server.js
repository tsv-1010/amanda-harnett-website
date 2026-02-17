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
    '.ogg': 'video/ogg'
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
        
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/plain' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
