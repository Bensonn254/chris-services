const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT) || 5501;
const root = __dirname;

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

function safeJoin(base, target) {
    const targetPath = path.normalize(path.join(base, target));
    if (!targetPath.startsWith(base)) {
        return null;
    }
    return targetPath;
}

function serveFile(filePath, res) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    const requestedPath = urlPath === '/' ? '/index.html' : urlPath;
    const filePath = safeJoin(root, requestedPath);

    if (!filePath) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            serveFile(filePath, res);
            return;
        }

        if (!err && stats.isDirectory()) {
            const indexPath = path.join(filePath, 'index.html');
            if (fs.existsSync(indexPath)) {
                serveFile(indexPath, res);
                return;
            }
        }

        const fallback = path.join(root, 'index.html');
        if (fs.existsSync(fallback)) {
            serveFile(fallback, res);
            return;
        }

        res.writeHead(404);
        res.end('Not Found');
    });
});

server.listen(port, () => {
    console.log(`Local dev server running at http://127.0.0.1:${port}`);
});
