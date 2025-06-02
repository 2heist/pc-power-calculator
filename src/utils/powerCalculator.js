'use strict';

const dataLoader = require('./dataLoader.js');

const calculateTotalPower = (components) => {
  let totalPower = 0;
  const componentsData = dataLoader.getComponentsData();

  if (components.cpu) {
    const cpuComponent = componentsData.cpu.find(c => c.name === components.cpu);
    if (cpuComponent) {
      totalPower += cpuComponent.power;
    }
  }

  if (components.gpu) {
    const gpuComponent = componentsData.gpu.find(g => g.name === components.gpu);
    if (gpuComponent) {
      totalPower += gpuComponent.power;
    }
  }

  if (components.ram && Array.isArray(components.ram)) {
    components.ram.forEach(ram => {
      const ramComponent = componentsData.ram.find(r => r.size === ram);
      if (ramComponent) {
        totalPower += ramComponent.power;
      }
    });
  }

  if (components.storage && Array.isArray(components.storage)) {
    components.storage.forEach(storage => {
      const storageComponent = componentsData.storage.find(s => s.size === storage);
      if (storageComponent) {
        totalPower += storageComponent.power;
      }
    });
  }

  if (components.cooler && Array.isArray(components.cooler)) {
    components.cooler.forEach(cooler => {
      const coolerComponent = componentsData.cooler.find(c => c.size === cooler);
      if (coolerComponent) {
        totalPower += coolerComponent.power;
      }
    });
  }

  // 30% safety margin
  totalPower = Math.round(totalPower * 1.3);
  
  return totalPower;
};

module.exports = {
  calculateTotalPower
};