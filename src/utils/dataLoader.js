'use strict';

const fs = require('fs');
const path = require('path');

let componentsData = null;
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

const loadComponentsData = () => {
  try {
    const dataPath = path.join(__dirname, '..', '..', 'data', 'components.json');
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (error) {
    console.error('Error loading components data:', error);
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

componentsData = loadComponentsData();

setInterval(() => {
  componentsData = loadComponentsData();
  console.log('Components data refreshed');
}, REFRESH_INTERVAL);

const getComponentsData = () => {
  return componentsData;
};

module.exports = {
  getComponentsData,
  loadComponentsData
};