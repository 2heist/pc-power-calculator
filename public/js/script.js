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

async function loadComponents() {
  try {
    const response = await fetch('/api/components');
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.cpu || !data.gpu || !data.ram || !data.storage || !data.cooler) {
      throw new Error('Incomplete component data from server');
    }
    
    componentsData = data;
    initializeForm(data);
    
  } catch (error) {
    showError(`Failed to load component data: ${error.message}`);
  }
}

function initializeForm(data) {
 
  data.cpu.forEach(cpu => {
    const option = createOption(
      cpu.name, 
      `${cpu.brand} ${cpu.name} (${cpu.socket}, ${cpu.power}W)`
    );
    cpuSelect.appendChild(option);
  });
  
  data.gpu.forEach(gpu => {
    const option = createOption(
      gpu.name,
      `${gpu.brand} ${gpu.name} (${gpu.series}, ${gpu.power}W)`
    );
    gpuSelect.appendChild(option);
  });
}