import { createOption, getSelectedValues, showElement, scrollToElement } from './domHelpers.js';
import { addRamSlot, addStorageSlot, addCoolerSlot } from './componentBuilder.js';
import { MESSAGES } from './constants.js';

export function initializeForm(data, elements) {
  const {
    cpuSelect,
    gpuSelect,
    ramContainer,
    storageContainer,
    coolerContainer,
    addRamButton,
    addStorageButton,
    addCoolerButton
  } = elements;

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

  addRamSlot(data.ram, ramContainer);
  addStorageSlot(data.storage, storageContainer);
  addCoolerSlot(data.cooler, coolerContainer);

  addRamButton.addEventListener('click', () => addRamSlot(data.ram, ramContainer));
  addStorageButton.addEventListener('click', () => addStorageSlot(data.storage, storageContainer));
  addCoolerButton.addEventListener('click', () => addCoolerSlot(data.cooler, coolerContainer));
}

export function collectFormData(elements) {
  const { cpuSelect, gpuSelect } = elements;
  
  return {
    cpu: cpuSelect.value,
    gpu: gpuSelect.value,
    ram: getSelectedValues('.ram-select'),
    storage: getSelectedValues('.storage-select'),
    cooler: getSelectedValues('.cooler-select')
  };
}

export function displayResults(data, elements) {
  const { totalPowerSpan, recommendedPsuSpan, resultsDiv } = elements;
  
  totalPowerSpan.textContent = `${data.totalPower}W`;
  
  if (data.recommendedPsu) {
    recommendedPsuSpan.textContent = 
      `${data.recommendedPsu.brand} ${data.recommendedPsu.model} (${data.recommendedPsu.power}W, ${data.recommendedPsu.modularity})`;
  } else {
    recommendedPsuSpan.textContent = MESSAGES.NO_PSU_FOUND;
  }
  
  showElement(resultsDiv);
  scrollToElement(resultsDiv);
}