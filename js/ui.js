import { showMessage } from './utils.js';
import { generateSignature } from './generator.js';
import { validateFields } from './validation.js';

// Configuración global
export const config = {
  defaultLogo: "images/logo_cip.png",
  socialIcons: {
    ubicacion: "images/ubicacion.png",
    facebook: "images/facebook.png",
    instagram: "images/instagram.png",
    youtube: "images/youtube.png",
    tiktok: "images/tiktok.png",
    whatsapp: "images/whatsapp.png",
    telegram: "images/telegram.png",
    eco: "images/eco.png",
  },
  bannerImage: "images/baner_lineas.png",
  defaultLineColor: "#003366",
  base64Images: {},
};

// Cargar imágenes estáticas a Base64
export async function loadStaticImagesToBase64() {
  const { getFileAsBase64 } = await import('./utils.js');
  config.base64Images.defaultLogo = await getFileAsBase64(config.defaultLogo);
  config.base64Images.bannerImage = await getFileAsBase64(config.bannerImage);
  config.base64Images.eco = await getFileAsBase64(config.socialIcons.eco);

  for (const key in config.socialIcons) {
    if (key !== 'eco') {
      config.base64Images[key] = await getFileAsBase64(config.socialIcons[key]);
    }
  }
}

// Toggle de tema
export function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.textContent = document.body.classList.contains("dark-theme") ? "🌙" : "☀️";

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
    themeToggle.textContent = document.body.classList.contains("dark-theme") ? "🌙" : "☀️";
  });
}

// Generar firma según tipo
export function setupSignatureGeneration() {
  document.querySelectorAll(".button-40[data-type]").forEach((button) => {
    button.addEventListener("click", async () => {
      if (!validateFields()) {
        showMessage("Por favor, completa el campo obligatorio (Nombre).", "error");
        return;
      }

      document.querySelectorAll(".button-40[data-type]").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      if (!config.base64Images.defaultLogo) {
        await loadStaticImagesToBase64();
      }

      await generateSignature(button.dataset.type, config);
    });
  });
}

// Copiar firma como HTML
export async function setupCopyHTML() {
  document.getElementById("copy-html").addEventListener("click", async () => {
    const signatureOutput = document.getElementById("signatureOutput");
    const signatureHTML = signatureOutput.innerHTML;
    if (!signatureHTML) {
      showMessage("Por favor, genera una firma antes de copiar.", "error");
      return;
    }

    try {
      const blob = new Blob([signatureHTML], { type: 'text/html' });
      const clipboardItem = new ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([clipboardItem]);
      showMessage("Firma copiada como HTML al portapapeles.", "success");
    } catch (error) {
      console.error("Error al copiar HTML:", error);
      showMessage("Error al copiar la firma. Tu navegador podría no ser compatible.", "error");
    }
  });
}

// Copiar firma como texto
export function setupCopyText() {
  document.getElementById("copy-text").addEventListener("click", () => {
    const fields = {
      name: document.getElementById("name").value.trim(),
      position: document.getElementById("position").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      extension: document.getElementById("extension").value.trim(),
      mobile: document.getElementById("mobile").value.trim(),
      mobile2: document.getElementById("mobile2").value.trim(),
    };

    if (!fields.name && !fields.position) {
      showMessage("No hay información para copiar", "error");
      return;
    }

    let textToCopy = `${fields.name}\n${fields.position}\n`;

    if (fields.phone) {
      textToCopy += `Teléfono: ${fields.phone}`;
      if (fields.extension) {
        textToCopy += ` ext. ${fields.extension}`;
      }
      textToCopy += "\n";
    }

    if (fields.mobile) {
      textToCopy += `Celular: ${fields.mobile}\n`;
    }

    if (fields.mobile2) {
      textToCopy += `Celular 2: ${fields.mobile2}\n`;
    }

    navigator.clipboard.writeText(textToCopy.trim())
      .then(() => {
        showMessage("Información esencial copiada al portapapeles", "success");
      })
      .catch(err => {
        console.error("Error al copiar texto:", err);
        showMessage("Error al copiar la información", "error");
      });
  });
}

// Quitar logo
export function setupRemoveLogo() {
  document.getElementById("remove-logo").addEventListener("click", () => {
    const logoInput = document.getElementById("logo-upload");
    logoInput.value = "";
    logoInput.dataset.removed = "true";
    document.getElementById("logo-preview").style.display = "none";
    const activeButton = document.querySelector('.button-40[data-type].active');
    if (activeButton) {
      generateSignature(activeButton.dataset.type, config);
    }
  });
}

// Persistencia de datos en localStorage
export function saveFormData() {
  const formData = {
    name: document.getElementById("name").value,
    position: document.getElementById("position").value,
    phone: document.getElementById("phone").value,
    extension: document.getElementById("extension").value,
    mobile: document.getElementById("mobile").value,
    mobile2: document.getElementById("mobile2").value,
    addWhatsapp: document.getElementById("add-whatsapp").checked,
    addWhatsapp2: document.getElementById("add-whatsapp2").checked,
    addTelegram: document.getElementById("add-telegram").checked,
    facebook: document.getElementById("facebook").value,
    instagram: document.getElementById("instagram").value,
    youtube: document.getElementById("youtube").value,
    tiktok: document.getElementById("tiktok").value,
    lineColor: document.getElementById("line-color").value,
  };
  localStorage.setItem('signatureFormData', JSON.stringify(formData));
}

export function loadFormData() {
  const savedData = localStorage.getItem('signatureFormData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    Object.keys(formData).forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        if (element.type === 'checkbox') {
          element.checked = formData[key];
        } else {
          element.value = formData[key];
        }
      }
    });
  }
}


// Reiniciar formulario
export function setupResetForm() {
  document.getElementById("reset-form").addEventListener("click", () => {
    document.querySelector(".form-content").closest('form').reset();
    document.getElementById("line-color").value = config.defaultLineColor;
    const logoInput = document.getElementById("logo-upload");
    logoInput.dataset.removed = "false";
    document.getElementById("logo-preview").style.display = "none";
    document.getElementById("signatureOutput").innerHTML = "";
    localStorage.removeItem('signatureFormData'); // Limpiar datos guardados
  });
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", async () => {
  await loadStaticImagesToBase64();
  loadFormData();
  setupThemeToggle();
  setupSignatureGeneration();
  setupCopyHTML();
  setupCopyText();
  setupRemoveLogo();
  setupResetForm();

  // Guardar datos en cada cambio
  document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', saveFormData);
  });
});