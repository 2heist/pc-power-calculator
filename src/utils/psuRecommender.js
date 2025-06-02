'use strict';

const dataLoader = require('./dataLoader.js');

const recommendPsu = (totalPower) => {
  const componentsData = dataLoader.getComponentsData();
  
  const availablePsu = componentsData.psu
    .filter(psu => psu.power >= totalPower)
    .sort((a, b) => a.power - b.power);

  return availablePsu.length > 0 ? availablePsu[0] : null;
};

module.exports = {
  recommendPsu
};