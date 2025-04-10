function generateLink(type, value, text, urlTemplate) {
  if (!value) return "";
  const cleanValue = value.replace(/\D/g, "");
  return `<a href="${urlTemplate.replace("{value}", cleanValue).replace("{text}", text)}" style="color: #333333; text-decoration: none;">${value}</a>`;
}

// Función para convertir una imagen a base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

async function generateSignature(type) {
  const fields = {
    name: document.getElementById("name").value,
    position: document.getElementById("position").value,
    phone: document.getElementById("phone").value,
    extension: document.getElementById("extension").value,
    mobile: document.getElementById("mobile").value,
    mobile2: document.getElementById("mobile2").value,
    whatsapp: document.getElementById("whatsapp").value,
    whatsapp2: document.getElementById("whatsapp2").value,
    telegram: document.getElementById("telegram").value,
    facebook: document.getElementById("facebook").value,
    instagram: document.getElementById("instagram").value,
    youtube: document.getElementById("youtube").value,
    tiktok: document.getElementById("tiktok").value,
    lineColor: document.getElementById("line-color").value,
    logo: "images/logo cip.png" // Logo por defecto
  };

  // Verificar si se cargó una nueva imagen
  const logoInput = document.getElementById("logo-upload");
  if (logoInput.files && logoInput.files[0]) {
    try {
      // Convertir la imagen a base64
      fields.logo = await fileToBase64(logoInput.files[0]);
    } catch (error) {
      console.error("Error al convertir la imagen a base64:", error);
      alert("Hubo un error al cargar el logo. Por favor, intenta de nuevo.");
      fields.logo = "images/logo cip.png"; // Volver al logo por defecto en caso de error
    }
  } else if (logoInput.dataset.removed === "true") {
    fields.logo = null; // Si se quitó el logo explícitamente, no mostramos ningún logo
  }

  let phoneHTML = fields.phone
    ? `Teléfono: (01)${generateLink("tel", fields.phone, fields.phone, "tel:01{value}" + (fields.extension ? ";{extension}" : ""))}${
        fields.extension ? ` ext. ${fields.extension}` : ""
      }<br>`
    : "";

  let mobileHTML = fields.mobile
    ? `Celular: ${generateLink("tel", fields.mobile, fields.mobile, "tel:+51{value}")}${
        fields.whatsapp
          ? ` <a href="https://api.whatsapp.com/send?phone=+51${fields.mobile.replace(/\D/g, "")}&text=Hola,%20${fields.name}%20solicito%20informes%20sobre%20productos" style="text-decoration: none;"><img src="images/whatsapp.png" alt="Whatsapp" style="width: 16px; vertical-align: middle;"></a>`
          : ""
      }${
        fields.telegram
          ? ` <a href="https://t.me/+51${fields.mobile.replace(/\D/g, "")}?text=Hola,%20${fields.name}%20solicito%20informes%20sobre%20productos" style="text-decoration: none;"><img src="images/telegram.png" alt="Telegram" style="width: 16px; vertical-align: middle;"></a>`
          : ""
      }<br>`
    : "";

  let mobile2HTML = fields.mobile2
    ? `Celular 2: ${generateLink("tel", fields.mobile2, fields.mobile2, "tel:+51{value}")}${
        fields.whatsapp2
          ? ` <a href="https://api.whatsapp.com/send?phone=+51${fields.mobile2.replace(/\D/g, "")}&text=Hola,%20${fields.name}%20solicito%20informes%20sobre%20productos" style="text-decoration: none;"><img src="images/whatsapp.png" alt="Whatsapp 2" style="width: 16px; vertical-align: middle;"></a>`
          : ""
      }<br>`
    : "";

  let socialHTML = (type === "full" || type === "medium")
    ? `<tr><td colspan="${fields.logo ? 2 : 1}" style="padding: 6px 0; background-color: transparent;">
        <a href="https://maps.app.goo.gl/5gHmxXAgRGwDr5jk6" target="_blank" rel="noopener" style="text-decoration: none;"><img src="images/ubicacion.png" alt="Ubicación" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></a>${
          fields.facebook ? ` <a href="${fields.facebook}" target="_blank" rel="noopener" style="text-decoration: none;"><img src="images/facebook.png" alt="Facebook" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></a>` : ""
        }${
          fields.instagram ? ` <a href="${fields.instagram}" target="_blank" rel="noopener" style="text-decoration: none;"><img src="images/instagram.png" alt="Instagram" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></a>` : ""
        }${
          fields.youtube ? ` <a href="${fields.youtube}" target="_blank" rel="noopener" style="text-decoration: none;"><img src="images/youtube.png" alt="YouTube" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></a>` : ""
        }${
          fields.tiktok ? ` <a href="${fields.tiktok}" target="_blank" rel="noopener" style="text-decoration: none;"><img src="images/tiktok.png" alt="TikTok" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></a>` : ""
        }</td></tr>`
    : "";

  let bannerHTML = type === "full"
    ? `<tr><td colspan="${fields.logo ? 2 : 1}" style="background-color: transparent;"><img src="images/baner lineas.jpg" alt="Líneas" style="width: 300px; max-width: 100%;"></td></tr>`
    : "";

  let ecoHTML = `<tr><td colspan="${fields.logo ? 2 : 1}" style="font-size: 8pt; font-weight: 300; font-style: italic; color: #0b7935; background-color: transparent;">
    <img src="images/bandera.png" alt="PE" style="width: 19px; vertical-align: sub;"> "Before printing an email, let's consider the environment." <img src="images/eco.png" alt="Eco" style="vertical-align: middle;">
  </td></tr>`;

  // Agregamos background-color: transparent al div principal y a la tabla para asegurar que no haya fondos heredados
  let signatureHTML = `
    <div style="max-width: 315px; font-family: 'Roboto', sans-serif; background-color: transparent;">
      <table cellpadding="0" cellspacing="0" border="0" style="width: 315px; border-color: transparent; background-color: transparent;">
        <tr style="background-color: transparent;">
          ${
            fields.logo
              ? `
                <td width="80" style="padding-right: 4px; background-color: transparent;">
                  <img src="${fields.logo}" alt="Logo" style="width: 90px; height: auto;">
                </td>
                <td style="border-left: 4px solid ${fields.lineColor}; padding-left: 8px; background-color: transparent;">
                  <p style="font-size: 12pt; font-weight: bold; margin: 5px 0 3px; color: #333333; background-color: transparent;">${fields.name}</p>
                  <p style="font-size: 10pt; margin: 5px 0 3px; color: #333333; background-color: transparent;">${fields.position}</p>
                  <p style="font-size: 9pt; margin: 5px 0 3px; color: #333333; background-color: transparent;">${phoneHTML}</p>
                  <p style="font-size: 9pt; margin: 5px 0 3px; color: #333333; background-color: transparent;">${mobileHTML}</p>
                  <p style="font-size: 9pt; margin: 5px 0 3px; color: #333333; background-color: transparent;">${mobile2HTML}</p>
                </td>
              `
              : `
                <td style="border-left: 4px solid ${fields.lineColor}; padding-left: 8px; background-color: transparent;">
                  <p style="font-size: 12pt; font-weight: bold; margin: 5px 0 3px; color: #333333; background-color: transparent;">${fields.name}</p>
                  <p style="font-size: 10pt; margin: 5px 0 3px; color: #333333; background-color: transparent;">${fields.position}</p>
                  <p style="font-size: 9pt; margin: 5px 0 3px; color: #333333; background-color: transparent;">${phoneHTML}</p>
                  <p style="font-size: 9pt; margin: 5px 0 3px; color: #333333; background-color: transparent;">${mobileHTML}</p>
                  <p style="font-size: 9pt; margin: 5px 0 3px; color: #333333; background-color: transparent;">${mobile2HTML}</p>
                </td>
              `
          }
        </tr>
        ${socialHTML}
        ${bannerHTML}
        ${ecoHTML}
      </table>
    </div>
  `;

  document.getElementById("signatureOutput").innerHTML = signatureHTML;
}

// Toggle de tema
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  themeToggle.textContent = document.body.classList.contains("dark-theme") ? "🌙" : "☀️";
});

// Generar firma
document.querySelectorAll(".button-40[data-type]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".button-40[data-type]").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    generateSignature(button.dataset.type);
  });
});

// Copiar firma como imagen (con fondo transparente y tamaño ajustado)
document.getElementById("copy-signature").addEventListener("click", () => {
  const signatureOutput = document.getElementById("signatureOutput");

  // Verificar si hay contenido para copiar
  if (!signatureOutput.innerHTML) {
    alert("Por favor, genera una firma antes de copiar.");
    return;
  }

  // Guardar el fondo original del contenedor
  const originalBackground = signatureOutput.style.backgroundColor;

  // Establecer el fondo como transparente temporalmente
  signatureOutput.style.backgroundColor = "transparent";

  // Usar html2canvas para convertir el elemento en una imagen con fondo transparente
  html2canvas(signatureOutput, {
    scale: 1.5, // Escala ajustada para un tamaño adecuado
    useCORS: true, // Permitir cargar imágenes externas (si las hay)
    backgroundColor: null // Fondo transparente
  }).then(canvas => {
    // Restaurar el fondo original del contenedor
    signatureOutput.style.backgroundColor = originalBackground;

    // Convertir el canvas a un blob (formato PNG con transparencia)
    canvas.toBlob(blob => {
      // Crear un item para el portapapeles
      const item = new ClipboardItem({ "image/png": blob });
      // Copiar la imagen al portapapeles
      navigator.clipboard.write([item]).then(() => {
        alert("Firma copiada como imagen PNG (sin fondo) al portapapeles! Ahora puedes pegarla en tu cliente de correo.");
      }).catch(err => {
        console.error("Error al copiar la imagen: ", err);
        alert("Hubo un error al copiar la firma como imagen. Intenta de nuevo o usa un navegador compatible (Chrome, Edge).");
      });
    }, "image/png");
  }).catch(err => {
    // Restaurar el fondo en caso de error
    signatureOutput.style.backgroundColor = originalBackground;
    console.error("Error al generar la imagen: ", err);
    alert("Hubo un error al generar la imagen de la firma.");
  });
});

// Seleccionar contenido para copiar como HTML (asegurando fondo transparente)
document.getElementById("copy-html").addEventListener("click", () => {
  const signatureOutput = document.getElementById("signatureOutput");

  // Verificar si hay contenido para seleccionar
  if (!signatureOutput.innerHTML) {
    alert("Por favor, genera una firma antes de seleccionar.");
    return;
  }

  // Guardar el fondo original del contenedor
  const originalBackground = signatureOutput.style.backgroundColor;

  // Establecer el fondo como transparente temporalmente para la selección
  signatureOutput.style.backgroundColor = "transparent";

  // Seleccionar todo el contenido del elemento
  const range = document.createRange();
  range.selectNodeContents(signatureOutput);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  // Mostrar un mensaje al usuario indicando ambas opciones
  alert("Contenido seleccionado. Haz clic derecho y selecciona 'Copiar' o presiona Ctrl+C (Cmd+C en Mac) para copiar la firma con formato.");

  // Restaurar el fondo original después de seleccionar (puede que no sea necesario, pero lo hacemos por seguridad)
  setTimeout(() => {
    signatureOutput.style.backgroundColor = originalBackground;
  }, 0);
});

// Quitar logo
document.getElementById("remove-logo").addEventListener("click", () => {
  const logoInput = document.getElementById("logo-upload");
  logoInput.value = ""; // Limpiar el input
  logoInput.dataset.removed = "true"; // Marcar que el logo fue quitado explícitamente
  // Generar la firma de nuevo para reflejar el cambio
  const activeButton = document.querySelector('.button-40[data-type].active');
  if (activeButton) {
    generateSignature(activeButton.dataset.type);
  }
});

// Reiniciar formulario (restaurar al estado inicial, incluyendo el logo por defecto)
document.getElementById("reset-form").addEventListener("click", () => {
  const inputs = document.querySelectorAll(".input-35");
  inputs.forEach(input => {
    // Restaurar valores predeterminados para los campos de redes sociales
    if (input.id === "facebook" || input.id === "instagram" || input.id === "youtube" || input.id === "tiktok") {
      input.value = input.defaultValue;
    } else if (input.id === "line-color") {
      // Restaurar el valor predeterminado del selector de color
      input.value = "#2e4053"; // Azul Pizarra
    } else {
      // Limpiar los demás campos
      input.value = "";
    }
  });
  // Limpiar el input del logo y restaurar el comportamiento por defecto
  const logoInput = document.getElementById("logo-upload");
  logoInput.value = "";
  logoInput.dataset.removed = "false"; // Restaurar el logo por defecto
  document.getElementById("signatureOutput").innerHTML = ""; // Limpiar el área de firma
});
