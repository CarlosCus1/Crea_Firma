// Función para generar enlaces dinámicos con validación de URL
export function generateLink(type, value, text, urlTemplate) {
  if (!value) return "";
  let cleanValue = value;
  if (type === "tel") {
    // Para teléfonos, permite números y el punto y coma para extensiones
    cleanValue = value.replace(/[^0-9;]/g, "");
  } else {
    // Para otros tipos, limpia todos los no dígitos
    cleanValue = value.replace(/\D/g, "");
  }
  
  try {
    const formattedUrl = urlTemplate
      .replace("{value}", cleanValue)
      .replace("{text}", encodeURIComponent(text)); // Codifica texto para evitar errores en URLs
    return `<a href="${formattedUrl}" class="signature-link">${value}</a>`;
  } catch (error) {
    console.error("Error al formatear el enlace:", error);
    return "";
  }
}

// Convertir imagen a base64 con manejo de errores, redimensionamiento y compresión
export async function fileToBase64(file, maxWidth = 90, maxHeight = 90) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calcular nuevas dimensiones manteniendo la proporción
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Optimizar: usar calidad reducida para reducir tamaño
        let quality = 0.7; // Calidad más baja para mejor compresión
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          quality = 0.7;
        } else if (file.type === 'image/png') {
          quality = 0.8; // PNG puede mantener mejor calidad
        }
        resolve(canvas.toDataURL(file.type, quality));
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = event.target.result;
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

// Obtener archivo como Base64 desde una URL (para imágenes locales) con compresión
export async function getFileAsBase64(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();

    // Comprimir imagen antes de convertir a base64
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Mantener tamaño original pero comprimir calidad
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Usar compresión para reducir tamaño
        const compressedBase64 = canvas.toDataURL('image/png', 0.8);
        resolve(compressedBase64);
      };
      img.onerror = reject;

      const reader = new FileReader();
      reader.onloadend = () => {
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    return null; // Retorna null en caso de error
  }
}

// Convertir SVG string a PNG base64 para mejor compatibilidad con compresión
export function svgToPngBase64(svgString, width = 90, height = 90) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      // Usar compresión para reducir tamaño
      resolve(canvas.toDataURL('image/png', 0.8));
    };

    img.onerror = reject;

    // Crear una URL de datos para el SVG
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.src = url;
  });
}

// Mostrar mensaje temporal utilizando el elemento #status-message
export function showMessage(message, type) {
  const statusMessageElement = document.getElementById("status-message");
  if (!statusMessageElement) {
    console.error("Elemento #status-message no encontrado.");
    return;
  }

  statusMessageElement.textContent = message;
  statusMessageElement.className = "status-message show"; // Reset classes
  statusMessageElement.classList.add(type);

  // Auto-hide after 5 seconds
  setTimeout(() => {
    statusMessageElement.classList.remove("show");
    statusMessageElement.classList.add("auto-hide"); // Add class for fadeOut animation
    setTimeout(() => {
      statusMessageElement.className = "status-message"; // Clean up classes after animation
      statusMessageElement.textContent = "";
    }, 500); // Match fadeOut animation duration
  }, 5000);
}
