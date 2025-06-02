'use strict';

const dataLoader = require('./dataLoader.js');

const validateComponents = (components) => {
  if (!components || typeof components !== 'object') {
    return 'Invalid components data';
  }

  const componentsData = dataLoader.getComponentsData();

  if (components.cpu && !componentsData.cpu.some(c => c.name === components.cpu)) {
    return `CPU "${components.cpu}" not found in available components`;
  }

  if (components.gpu && !componentsData.gpu.some(g => g.name === components.gpu)) {
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
};

module.exports = {
  validateComponents
};