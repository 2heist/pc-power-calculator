'use strict';

const url = require('url');
const componentsController = require('./controllers/componentsController');
const calculatorController = require('./controllers/calculatorController');
const staticFileHandler = require('./utils/staticFileHandler');

const handleRequest = (req, res) => {

  const handleRequest = (req, res) => {
    console.log(`Incoming request: ${req.method} ${req.url}`); 
  
    const parsedUrl = url.parse(req.url, true);
    let pathname = parsedUrl.pathname;
  };

  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  if (pathname === '/') {
    pathname = '/html/index.html';
  }

  if (pathname === '/api/components') {
    return componentsController.getComponents(req, res);
  }

  if (pathname === '/api/calculate') {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Method not allowed. Use POST for this endpoint.' }));
      return;
    }
    return calculatorController.calculatePower(req, res);
  }

  staticFileHandler.serveFile(req, res, pathname);
};

module.exports = {
  handleRequest
};