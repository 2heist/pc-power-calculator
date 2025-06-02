import { API_ENDPOINTS, MESSAGES } from './constants.js';

export async function loadComponents() {
  try {
    const response = await fetch(API_ENDPOINTS.COMPONENTS);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.cpu || !data.gpu || !data.ram || !data.storage || !data.cooler) {
      throw new Error(MESSAGES.INCOMPLETE_DATA);
    }
    
    return data;
    
  } catch (error) {
    throw new Error(`${MESSAGES.LOAD_ERROR}: ${error.message}`);
  }
}

export async function calculatePowerConsumption(components) {
  try {
    const response = await fetch(API_ENDPOINTS.CALCULATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(components)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
    
  } catch (error) {
    throw new Error(`${MESSAGES.CALC_ERROR}: ${error.message}`);
  }
}