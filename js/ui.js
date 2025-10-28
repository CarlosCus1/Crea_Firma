import { showMessage } from './utils.js';
import { generateSignature } from './generator.js';
import { validateFields } from './validation.js';

// Configuración global
export const config = {
  defaultLogo: "images/logo_cip.png",
  socialIcons: {
    ubicacion: "images/ubicacion.svg",
    facebook: "images/facebook.svg",
    instagram: "images/instagram.svg",
    youtube: "images/youtube.svg",
    tiktok: "images/tiktok.svg",
    whatsapp: "images/whatsapp.svg",
    telegram: "images/telegram.svg",
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

// Toggle de tema (removido por no funcionar)
export function setupThemeToggle() {
  // Función vacía - toggle removido del HTML
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
      // Intentar usar ClipboardItem para navegadores modernos
      if (navigator.clipboard && window.ClipboardItem) {
        const blob = new Blob([signatureHTML], { type: 'text/html' });
        const clipboardItem = new ClipboardItem({ 'text/html': blob });
        await navigator.clipboard.write([clipboardItem]);
        showMessage("Firma copiada como HTML al portapapeles.", "success");
      } else {
        // Fallback para navegadores que no soportan ClipboardItem
        const textArea = document.createElement("textarea");
        textArea.value = signatureHTML;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          showMessage("Firma copiada como HTML al portapapeles.", "success");
        } catch (err) {
          console.error("Error en fallback de copiado:", err);
          showMessage("Error al copiar la firma. Intenta manualmente.", "error");
        }
        document.body.removeChild(textArea);
      }
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
      facebook: document.getElementById("facebook").value.trim(),
      instagram: document.getElementById("instagram").value.trim(),
      youtube: document.getElementById("youtube").value.trim(),
      tiktok: document.getElementById("tiktok").value.trim(),
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

    // Agregar redes sociales si están presentes
    const socialLinks = [];
    if (fields.facebook) socialLinks.push(`Facebook: ${fields.facebook}`);
    if (fields.instagram) socialLinks.push(`Instagram: ${fields.instagram}`);
    if (fields.youtube) socialLinks.push(`YouTube: ${fields.youtube}`);
    if (fields.tiktok) socialLinks.push(`TikTok: ${fields.tiktok}`);

    if (socialLinks.length > 0) {
      textToCopy += "\nRedes Sociales:\n" + socialLinks.join("\n");
    }

    navigator.clipboard.writeText(textToCopy.trim())
      .then(() => {
        showMessage("Información completa copiada al portapapeles", "success");
      })
      .catch(err => {
        console.error("Error al copiar texto:", err);
        showMessage("Error al copiar la información", "error");
      });
  });
}

// Quitar logo (si existe)
export function setupRemoveLogo() {
  const removeButton = document.getElementById("remove-logo");
  if (removeButton) {
    removeButton.addEventListener("click", async () => {
      const logoInput = document.getElementById("logo-upload");
      logoInput.value = "";
      logoInput.dataset.removed = "true";
      document.getElementById("logo-preview").style.display = "none";
      const activeButton = document.querySelector('.button-40[data-type].active');
      if (activeButton) {
        await generateSignature(activeButton.dataset.type, config);
      }
    });
  }
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
    "add-whatsapp": document.getElementById("add-whatsapp").checked,
    "add-whatsapp2": document.getElementById("add-whatsapp2").checked,
    "add-telegram": document.getElementById("add-telegram").checked,
    facebook: document.getElementById("facebook").value,
    instagram: document.getElementById("instagram").value,
    youtube: document.getElementById("youtube").value,
    tiktok: document.getElementById("tiktok").value,
    "line-color": document.getElementById("line-color").value,
    "line-width": document.getElementById("line-width").value,
    "logo-type": document.getElementById("logo-type").value,
    "logo-color": document.getElementById("logo-color").value,
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
      } else {
        console.warn(`Elemento con ID "${key}" no encontrado para cargar datos.`);
      }
    });
  }
}

// Actualizar previsualización del SVG en vivo
export async function updateSvgPreview() {
  const logoType = document.getElementById("logo-type").value;
  const logoColor = document.getElementById("logo-color").value;

  // Log de valores seleccionados
  console.log(`Tipo de Logo: ${logoType}, Color Logo: ${logoColor}`);

  const { generateSvgHTML1, generateSvgHTML2 } = await import('./generator.js');
  let svgHTML;
  if (logoType === 'logo1') {
    svgHTML = generateSvgHTML1(logoColor);
  } else if (logoType === 'logo2') {
    svgHTML = generateSvgHTML2(logoColor);
  } else {
    svgHTML = '';
  }

  const previewElement = document.getElementById("svg-preview");
  if (previewElement) {
    previewElement.innerHTML = svgHTML;
    if (svgHTML) {
      previewElement.classList.add("show");
    } else {
      previewElement.classList.remove("show");
    }
  }
}

// Función para loggear el color de línea
export function logLineColor() {
  const lineColor = document.getElementById("line-color").value;
  console.log(`Color Línea: ${lineColor}`);
}

// Actualizar display del ancho de línea
export function updateLineWidthDisplay() {
  const slider = document.getElementById("line-width");
  const display = document.getElementById("line-width-value");
  if (slider && display) {
    display.textContent = slider.value + "px";
    console.log(`Ancho Línea Actualizado: ${slider.value}px`);
  }
}


// Reiniciar formulario
export function setupResetForm() {
  document.getElementById("reset-form").addEventListener("click", () => {
    document.querySelector(".form-content").closest('form').reset();
    const lineColorPicker = document.getElementById("line-color");
    if (lineColorPicker) {
      lineColorPicker.value = config.defaultLineColor;
    }
    const lineWidthSlider = document.getElementById("line-width");
    if (lineWidthSlider) {
      lineWidthSlider.value = "4";
    }
    const logoTypeSelect = document.getElementById("logo-type");
    if (logoTypeSelect) {
      logoTypeSelect.value = "logo1";
    }
    const logoColorPicker = document.getElementById("logo-color");
    if (logoColorPicker) {
      logoColorPicker.value = "#FF0000";
    }
    const logoInput = document.getElementById("logo-upload");
    if (logoInput) {
      logoInput.dataset.removed = "false";
    }
    const logoPreview = document.getElementById("logo-preview");
    if (logoPreview) {
      logoPreview.style.display = "none";
    }
    const signatureOutput = document.getElementById("signatureOutput");
    if (signatureOutput) {
      signatureOutput.innerHTML = "";
    }
    localStorage.removeItem('signatureFormData'); // Limpiar datos guardados
  });
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", async () => {
  await loadStaticImagesToBase64();
  loadFormData();
  // setupThemeToggle(); // Removido: toggle de tema no funciona
  setupSignatureGeneration();
  setupCopyHTML();
  setupCopyText();
  setupRemoveLogo();
  setupResetForm();

  // Configurar previsualización del SVG si los elementos existen
  const logoTypeSelect = document.getElementById("logo-type");
  const logoColorPicker = document.getElementById("logo-color");
  if (logoTypeSelect && logoColorPicker) {
    await updateSvgPreview();

    // Eventos para actualizar previsualización en vivo
    logoTypeSelect.addEventListener('change', async () => {
      console.log(`Tipo de Logo Cambiado: ${logoTypeSelect.value}`);
      await updateSvgPreview();
    });
    logoColorPicker.addEventListener('input', async () => {
      console.log(`Color Logo Cambiado: ${logoColorPicker.value}`);
      await updateSvgPreview();
    });
  }

  // Configurar slider de línea
  const lineWidthSlider = document.getElementById("line-width");
  if (lineWidthSlider) {
    updateLineWidthDisplay();
    lineWidthSlider.addEventListener('input', async () => {
      updateLineWidthDisplay();
      // Regenerar firma si está activa
      const activeButton = document.querySelector('.button-40[data-type].active');
      if (activeButton) {
        await generateSignature(activeButton.dataset.type, config);
      }
    });
  }

  // Guardar datos en cada cambio
  document.querySelectorAll('input, select').forEach(input => {
    const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
    input.addEventListener(eventType, () => {
      if (input.id === 'line-color') {
        console.log(`Color Línea Cambiado: ${input.value}`);
      }
      saveFormData();
    });
  });

  // Agregar log específico para el color de línea
  const lineColorPicker = document.getElementById("line-color");
  if (lineColorPicker) {
    lineColorPicker.addEventListener('input', logLineColor);
  }
});