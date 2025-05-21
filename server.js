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

