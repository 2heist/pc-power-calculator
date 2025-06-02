import { createOption } from './domHelpers.js';
import { COMPONENT_TYPES, MESSAGES } from './constants.js';

function createRemoveButton(container, slot) {
  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.className = 'remove-button';
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    if (container.children.length > 1) {
      container.removeChild(slot);
    } else {
      alert(MESSAGES.MIN_ELEMENTS);
    }
  });
  return removeButton;
}

function createComponentSlot(componentType, options, container) {
  const slot = document.createElement('div');
  slot.className = 'component-item';
  
  const select = document.createElement('select');
  select.name = `${componentType}[]`;
  select.className = `${componentType}-select`;
  
  const defaultTexts = {
    [COMPONENT_TYPES.RAM]: '-- Select RAM --',
    [COMPONENT_TYPES.STORAGE]: '-- Select Storage --',
    [COMPONENT_TYPES.COOLER]: '-- Select Cooler --'
  };
  
  select.appendChild(createOption('', defaultTexts[componentType]));
  
  options.forEach(component => {
    const option = createOption(
      component.size || component.name,
      `${component.type || component.brand} ${component.size || component.name} (${component.power}W)`
    );
    select.appendChild(option);
  });
  
  const removeButton = createRemoveButton(container, slot);
  
  slot.appendChild(select);
  slot.appendChild(removeButton);
  
  return slot;
}

export function addRamSlot(ramOptions, container) {
  const ramSlot = createComponentSlot(COMPONENT_TYPES.RAM, ramOptions, container);
  container.appendChild(ramSlot);
}

export function addStorageSlot(storageOptions, container) {
  const storageSlot = createComponentSlot(COMPONENT_TYPES.STORAGE, storageOptions, container);
  container.appendChild(storageSlot);
}

export function addCoolerSlot(coolerOptions, container) {
  const coolerSlot = createComponentSlot(COMPONENT_TYPES.COOLER, coolerOptions, container);
  container.appendChild(coolerSlot);
}