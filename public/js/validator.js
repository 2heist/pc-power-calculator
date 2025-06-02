import { MESSAGES } from './constants.js';
import { getSelectedValues } from './domHelpers.js';

export function validateForm(cpuSelect, gpuSelect) {
  if (!cpuSelect.value) {
    alert(MESSAGES.SELECT_CPU);
    return false;
  }
  
  if (!gpuSelect.value) {
    alert(MESSAGES.SELECT_GPU);
    return false;
  }
  
  const selectedRam = getSelectedValues('.ram-select');
  if (selectedRam.length === 0) {
    alert(MESSAGES.SELECT_RAM);
    return false;
  }
  
  return true;
}