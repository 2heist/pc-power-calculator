'use strict'

const http = require('http');
const routes = require('./src/routes');

const server = http.createServer(routes.handleRequest);

const PORT = process.env.PORT || 3000; 
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
