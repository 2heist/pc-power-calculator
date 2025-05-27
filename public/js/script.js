document.addEventListener('DOMContentLoaded', () => {
 
  const form = document.getElementById('pc-components-form');
  const cpuSelect = document.getElementById('cpu-select');
  const gpuSelect = document.getElementById('gpu-select');
  const ramContainer = document.getElementById('ram-container');
  const storageContainer = document.getElementById('storage-container');
  const coolerContainer = document.getElementById('cooler-container');
  const addRamButton = document.getElementById('add-ram');
  const addStorageButton = document.getElementById('add-storage');
  const addCoolerButton = document.getElementById('add-cooler');
  const resultsDiv = document.getElementById('results');
  const totalPowerSpan = document.getElementById('total-power');
  const recommendedPsuSpan = document.getElementById('recommended-psu');
  
  let componentsData = null;
});

function showError(message) {
  console.error('Error:', message);
  alert(`An error occurred: ${message}`);
}

function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}
