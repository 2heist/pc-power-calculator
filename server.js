'use strict'

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');


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

  if (pathname === '/api/components'){
    res.writeHead(200, {'contentType' : 'application/json' });
    res.end(JSON.stringify(componentsData));
    return;
  } 

  if (pathname === '/api/calculate' && req.method === 'POST') {
    let body = '';
    let bodySize = 0;
    const MAX_BODY_SIZE = 1024 * 1024; // Limit to 1 MB
    
    req.on('data', chunk => {
      bodySize += chunk.length;
          
      if (bodySize > MAX_BODY_SIZE) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Request body too large' }));
        req.destroy();
        return;
      }

      body += chunk.toString();

    });
  }
  
  req.on('end', ()=> {
    try {
      
      const components = JSON.parse(body);
      const totalPower = calculateTotalPower(components);
      const recommendedPcu = recommendPcu(totalPower);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ totalPower, recommendedPsu }));

      } catch (error) {

        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request' }));
        return;
      }

    
  });


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
});

function validateComponents(components) {

  if (components.cpu && !componentsData.cpu.some(c => c.name === components.cpu)){
    return `CPU "${components.cpu}" not found in available components`;
  }

  if (components.gpu && !componentsData.gpu.some(g => g.name === components.gpu)){
    return `GPU "${components.gpu}" not found in available components`;
  }

  if (components.ram) {
    if (!Array.isArray(components.ram)) {
      return 'RAM should be an array';
    }

    for (const ram of components.ram) {
      if (!componentsData.ram.some(r => r.size === ram)) {
         return `RAM with size "${ram}" not found in available components`;
      }
    }

  }

if (components.storage) {

  if (!Array.isArray(components.storage)) {
      return 'Storage should be an array';
  }

 for (const storage of components.storage) {

      if (!componentsData.storage.some(s => s.size === storage)) {
         return `Storage with size "${storage}" not found in available components`;
      }  
  }
}

if (components.cooler) {
    if (!Array.isArray(components.cooler)) {
      return 'Coolers should be an array';
    }
    
    for (const cooler of components.cooler) {
      if (!componentsData.cooler.some(c => c.size === cooler)) {
        return `Cooler with size "${cooler}" not found in available components`;
      }
    }
  }

  return null;
  
}

function calculateTotalPower(components) {

  let totalPower = 0;

  if (components.cpu) {

    const cpuComponent = componentsData.cpu.find(c => c.name === components.cpu);
    if (cpuComponent) totalPower += cpuComponent.power

  }

  if (components.gpu) {
    const gpuComponent = componentsData.gpu.find(g => g.name === components.gpu);
    if (gpuComponent) totalPower += gpuComponent.power;
  }

   if (components.ram && Array.isArray(components.ram)) {
    components.ram.forEach(ram => {
      const ramComponent = componentsData.ram.find(r => r.size === ram);
      if (ramComponent) totalPower += ramComponent.power;
    });
  }

   if (components.storage && Array.isArray(components.storage)) {
    components.storage.forEach(storage => {
      const storageComponent = componentsData.storage.find(s => s.size === storage);
      if (storageComponent) totalPower += storageComponent.power;
    });
  }

  if (components.cooler && Array.isArray(components.cooler)) {
    components.cooler.forEach(cooler => {
      const coolerComponent = componentsData.cooler.find(c => c.size === cooler);
      if (coolerComponent) totalPower += coolerComponent.power;
    });
  }

  totalPower = Math.round(totalPower * 1.3);
  
return totalPower;
}

function recommendPcu(totalPower) {

  const availablePsu = componentsData.psu
    .filter(psu => psu.power >= totalPower)
    .sort((a, b) => a.power - b.power);

  return availablePsu.length > 0 ? availablePsu[0] : null;

}




const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
