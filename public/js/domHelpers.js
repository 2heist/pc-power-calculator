export function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

export function showError(message) {
  console.error('Error:', message);
  alert(`An error occurred: ${message}`);
}

export function getSelectedValues(className) {
  return Array.from(document.querySelectorAll(className))
    .map(select => select.value)
    .filter(value => value);
}

export function scrollToElement(element) {
  element.scrollIntoView({ behavior: 'smooth' });
}

export function showElement(element) {
  element.classList.remove('hidden');
}