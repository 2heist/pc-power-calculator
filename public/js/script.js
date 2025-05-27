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

  addRamSlot(data.ram);
  addStorageSlot(data.storage);
  addCoolerSlot(data.cooler);

  addRamButton.addEventListener('click', () => addRamSlot(data.ram));
  addStorageButton.addEventListener('click', () => addStorageSlot(data.storage));
  addCoolerButton.addEventListener('click', () => addCoolerSlot(data.cooler));
}

function createRemoveButton(container, slot) {
  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'remove-button';
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    // Ensure at least one element remains
    if (container.children.length > 1) {
      container.removeChild(slot);
    } else {
      alert('At least one element must remain');
    }
  });
  return removeButton;
}

function addRamSlot(ramOptions) {
  const ramSlot = document.createElement('div');
  ramSlot.className = 'component-item';
  
  const select = document.createElement('select');
  select.name = 'ram[]';
  select.className = 'ram-select';
  
  select.appendChild(createOption('', '-- Select RAM --'));
  
  ramOptions.forEach(ram => {
    const option = createOption(
      ram.size,
      `${ram.type} ${ram.size} (${ram.power}W)`
    );
    select.appendChild(option);
  });
  
  const removeButton = createRemoveButton(ramContainer, ramSlot);
  
  ramSlot.appendChild(select);
  ramSlot.appendChild(removeButton);
  ramContainer.appendChild(ramSlot);
}

function addStorageSlot(storageOptions) {
  const storageSlot = document.createElement('div');
  storageSlot.className = 'component-item';
  
  const select = document.createElement('select');
  select.name = 'storage[]';
  select.className = 'storage-select';
  
  select.appendChild(createOption('', '-- Select Storage --'));
  
  storageOptions.forEach(storage => {
    const option = createOption(
      storage.size,
      `${storage.type} ${storage.size} (${storage.power}W)`
    );
    select.appendChild(option);
  });
  
  const removeButton = createRemoveButton(storageContainer, storageSlot);
  
  storageSlot.appendChild(select);
  storageSlot.appendChild(removeButton);
  storageContainer.appendChild(storageSlot);
}

function addCoolerSlot(coolerOptions) {
  const coolerSlot = document.createElement('div');
  coolerSlot.className = 'component-item';
  
  const select = document.createElement('select');
  select.name = 'cooler[]';
  select.className = 'cooler-select';
  
  select.appendChild(createOption('', '-- Select Cooler --'));
  
  coolerOptions.forEach(cooler => {
    const option = createOption(
      cooler.size,
      `${cooler.type} ${cooler.size} (${cooler.power}W)`
    );
    select.appendChild(option);
  });
  
  const removeButton = createRemoveButton(coolerContainer, coolerSlot);
  
  coolerSlot.appendChild(select);
  coolerSlot.appendChild(removeButton);
  coolerContainer.appendChild(coolerSlot);
}