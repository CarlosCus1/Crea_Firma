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

// Convertir imagen a base64 con manejo de errores y redimensionamiento
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
        resolve(canvas.toDataURL(file.type));
      };
      img.onerror = (error) => {
        console.error("Error al cargar la imagen para redimensionar:", error);
        reject(error);
      };
      img.src = event.target.result;
    };
    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

// Obtener archivo como Base64 desde una URL (para imágenes locales)
export async function getFileAsBase64(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Error al obtener la imagen ${url}:`, error);
    return null; // Retorna null en caso de error
  }
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
