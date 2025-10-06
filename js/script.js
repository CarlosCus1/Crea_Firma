import {
  loadStaticImagesToBase64,
  setupThemeToggle,
  setupSignatureGeneration,
  setupCopyHTML,
  setupCopyText,
  setupRemoveLogo,
  setupResetForm
} from './ui.js';

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", async () => {
  await loadStaticImagesToBase64();
  setupThemeToggle();
  setupSignatureGeneration();
  setupCopyHTML();
  setupCopyText();
  setupRemoveLogo();
  setupResetForm();
});
