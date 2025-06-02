export const SELECTORS = {
  FORM: '#pc-components-form',
  CPU_SELECT: '#cpu-select',
  GPU_SELECT: '#gpu-select',
  RAM_CONTAINER: '#ram-container',
  STORAGE_CONTAINER: '#storage-container',
  COOLER_CONTAINER: '#cooler-container',
  ADD_RAM_BUTTON: '#add-ram',
  ADD_STORAGE_BUTTON: '#add-storage',
  ADD_COOLER_BUTTON: '#add-cooler',
  RESULTS_DIV: '#results',
  TOTAL_POWER_SPAN: '#total-power',
  RECOMMENDED_PSU_SPAN: '#recommended-psu'
};

export const API_ENDPOINTS = {
  COMPONENTS: '/api/components',
  CALCULATE: '/api/calculate'
};

export const COMPONENT_TYPES = {
  RAM: 'ram',
  STORAGE: 'storage',
  COOLER: 'cooler'
};

export const MIN_COMPONENTS = {
  RAM: 1,
  STORAGE: 0,
  COOLER: 0
};

export const MESSAGES = {
  SELECT_CPU: 'Please select a processor',
  SELECT_GPU: 'Please select a graphics card',
  SELECT_RAM: 'Please select at least one RAM module',
  MIN_ELEMENTS: 'At least one element must remain',
  LOAD_ERROR: 'Failed to load component data',
  CALC_ERROR: 'Failed to calculate power consumption',
  INCOMPLETE_DATA: 'Incomplete component data from server',
  NO_PSU_FOUND: 'No suitable power supply found in database'
};