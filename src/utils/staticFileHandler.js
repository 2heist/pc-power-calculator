'use strict';

const fs = require('fs');
const path = require('path');

const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif'
};

const serveFile = (req, res, pathname) => {
  const filePath = path.join(__dirname, '..', '..', 'public', pathname);
  const extname = path.extname(filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        
        const notFoundPath = path.join(__dirname, '..', '..', 'public', 'html', '404.html');
        
        fs.readFile(notFoundPath, (err, content) => {
          if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentTypes[extname] || 'text/plain' });
      res.end(content, 'utf8');
    }
  });
};

module.exports = {
  serveFile
};