import { SELECTORS } from './constants.js';
import { showError } from './domHelpers.js';
import { loadComponents, calculatePowerConsumption } from './componentsApi.js';
import { validateForm } from './validator.js';
import { initializeForm, collectFormData, displayResults } from './formHandler.js';

class PCComponentsApp {
  constructor() {
    this.elements = {};
    this.componentsData = null;
  }

  initializeElements() {
    this.elements = {
      form: document.querySelector(SELECTORS.FORM),
      cpuSelect: document.querySelector(SELECTORS.CPU_SELECT),
      gpuSelect: document.querySelector(SELECTORS.GPU_SELECT),
      ramContainer: document.querySelector(SELECTORS.RAM_CONTAINER),
      storageContainer: document.querySelector(SELECTORS.STORAGE_CONTAINER),
      coolerContainer: document.querySelector(SELECTORS.COOLER_CONTAINER),
      addRamButton: document.querySelector(SELECTORS.ADD_RAM_BUTTON),
      addStorageButton: document.querySelector(SELECTORS.ADD_STORAGE_BUTTON),
      addCoolerButton: document.querySelector(SELECTORS.ADD_COOLER_BUTTON),
      resultsDiv: document.querySelector(SELECTORS.RESULTS_DIV),
      totalPowerSpan: document.querySelector(SELECTORS.TOTAL_POWER_SPAN),
      recommendedPsuSpan: document.querySelector(SELECTORS.RECOMMENDED_PSU_SPAN)
    };
  }

  async loadAndInitializeComponents() {
    try {
      this.componentsData = await loadComponents();
      initializeForm(this.componentsData, this.elements);
    } catch (error) {
      showError(error.message);
    }
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm(this.elements.cpuSelect, this.elements.gpuSelect)) {
      return;
    }
    
    const components = collectFormData(this.elements);
    
    try {
      const results = await calculatePowerConsumption(components);
      displayResults(results, this.elements);
    } catch (error) {
      showError(error.message);
    }
  }

  initializeEventListeners() {
    this.elements.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
  }

  async init() {
    this.initializeElements();
    this.initializeEventListeners();
    await this.loadAndInitializeComponents();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new PCComponentsApp();
  app.init();
});