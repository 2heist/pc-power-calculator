'use strict'

const http = requier('http');
const fs = requier('fs');
const path = requier('path');
const url = requier('url');


const contentTypes = {
  '.html' : 'text/html',
  '.css' : 'text/css',
  '.js' : 'application/javascript',
  '.json' : 'application/json',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.gif' : 'image/gif'
};


const loadComponentsData = () => {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'components.json'), 'utf8'));
  } catch (error) {
    console.error('Error loading components data', error);
    return {
      cpu: [],
      gpu: [],
      ram: [],
      storage: [],
      cooler: [],
      psu: []
    };
  }
};

let componentsData = loadComponentsData();

const REFRESH_INTERVAL = 5*60*1000 // 5 minutes
setInterval(() => {
  componentsData = loadComponentsData();
  console.log('Components data refreshed');
}, REFRESH_INTERVAL);

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  if (pathname === '/') {
    pathname = '/index.html';
  }

  const filePath = path.join(__dirname, pathname.startsWith('/public') ? '.' : './public', pathname);
  const extname = path.extname(filePath);

  fs.readFile(filePath, (err, content) => {
    if(err) {
      if(err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'public', '404.html' ), (err, content) => {

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

        res.writeHead(200, {'Content-type': contentTypes[extname] || 'text/plain' });
        res.end(content, 'utf8');
      }
  });


const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
