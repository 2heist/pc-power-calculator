'use strict';

const dataLoader = require('../utils/dataLoader.js');

const getComponents = (req, res) => {
  try {
    const componentsData = dataLoader.getComponentsData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(componentsData));
  } catch (error) {
    console.error('Error serving components data:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal server error' }));
  }
};

module.exports = {
  getComponents
};