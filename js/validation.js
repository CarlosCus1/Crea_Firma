// Validación de campos del formulario
export function validateFields() {
  const nameInput = document.getElementById("name");
  const positionInput = document.getElementById("position");

  let isValid = true;

  if (!nameInput.value.trim()) {
    nameInput.classList.add("error");
    isValid = false;
  } else {
    nameInput.classList.remove("error");
  }

  if (positionInput) {
    positionInput.classList.remove("error");
  }

  return isValid;
}

// Sanitizar entrada para prevenir XSS
export function sanitize(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}