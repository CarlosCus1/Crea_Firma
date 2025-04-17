// Función para generar enlaces dinámicos con validación de URL
function generateLink(type, value, text, urlTemplate) {
  if (!value) return "";
  const cleanValue = value.replace(/\D/g, ""); // Limpia caracteres no numéricos
  try {
    const formattedUrl = urlTemplate
      .replace("{value}", cleanValue)
      .replace("{text}", encodeURIComponent(text)); // Codifica texto para evitar errores en URLs
    return `<a href="${formattedUrl}" style="color: #333333; text-decoration: none;">${value}</a>`;
  } catch (error) {
    console.error("Error al formatear el enlace:", error);
    return "";
  }
}

// Convertir imagen a base64 con manejo de errores mejorado
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => {
      console.error("Error al leer el archivo:", error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
}

// Mostrar mensaje temporal
function showMessage(message, type) {
  const msgBox = document.createElement('div');
  msgBox.style.position = 'fixed';
  msgBox.style.bottom = '20px';
  msgBox.style.right = '20px';
  msgBox.style.padding = '10px 20px';
  msgBox.style.borderRadius = '4px';
  msgBox.style.color = 'white';
  msgBox.style.zIndex = '1000';
  msgBox.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  if (type === 'success') {
    msgBox.style.backgroundColor = '#4CAF50';
  } else if (type === 'error') {
    msgBox.style.backgroundColor = '#F44336';
  } else if (type === 'info') {
    msgBox.style.backgroundColor = '#2196f3';
  }
  msgBox.textContent = message;
  document.body.appendChild(msgBox);
  setTimeout(() => {
    msgBox.style.transition = 'opacity 0.5s';
    msgBox.style.opacity = '0';
    setTimeout(() => document.body.removeChild(msgBox), 500);
  }, 5000);
}

// Generar firma con mejoras en la lógica condicional
async function generateSignature(type) {
  const fields = {
    name: document.getElementById("name").value.trim(),
    position: document.getElementById("position").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    extension: document.getElementById("extension").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    mobile2: document.getElementById("mobile2").value.trim(),
    whatsapp: document.getElementById("whatsapp").value.trim(),
    whatsapp2: document.getElementById("whatsapp2").value.trim(),
    telegram: document.getElementById("telegram").value.trim(),
    facebook: document.getElementById("facebook").value.trim(),
    instagram: document.getElementById("instagram").value.trim(),
    youtube: document.getElementById("youtube").value.trim(),
    tiktok: document.getElementById("tiktok").value.trim(),
    lineColor: document.getElementById("line-color").value,
    logo: "images/logo_cip.png", // Logo por defecto
  };

  // Manejar el logo con validación mejorada
  const logoInput = document.getElementById("logo-upload");
  if (logoInput.files && logoInput.files[0]) {
    try {
      fields.logo = await fileToBase64(logoInput.files[0]);
    } catch (error) {
      console.error("Error al convertir la imagen:", error);
      showMessage("Error al cargar el logo. Usando logo por defecto.", "error");
      fields.logo = "images/logo_cip.png";
    }
  } else if (logoInput.dataset.removed === "true") {
    fields.logo = null;
  }

  // Generar teléfono con formato correcto para href
  const phoneHref = fields.phone ? `01${fields.phone.replace(/\D/g, "")}` + (fields.extension ? `;${fields.extension}` : "") : "";
  const phoneHTML = fields.phone
    ? `Teléfono: ${generateLink("tel", fields.phone, fields.phone, "tel:{value}")}${
        fields.extension ? ` ext. ${fields.extension}` : ""
      }<br>`
    : "";

  const mobileHTML = fields.mobile
    ? `Celular: ${generateLink("tel", fields.mobile, fields.mobile, "tel:+51{value}")}`
        + (fields.whatsapp
            ? ` <a href="https://api.whatsapp.com/send?phone=+51${fields.mobile.replace(/\D/g, "")}&text=Hola,%20${encodeURIComponent(fields.name)}%20solicito%20informes%20sobre%20productos" style="text-decoration: none; margin-left: 5px; display: inline-block;"><img src="images/whatsapp.png" alt="Whatsapp" style="width: 16px; vertical-align: middle;"></a> `
            : "")
        + (fields.telegram
            ? `<a href="https://t.me/+51${fields.mobile.replace(/\D/g, "")}?text=Hola,%20${encodeURIComponent(fields.name)}%20solicito%20informes%20sobre%20productos" style="text-decoration: none; margin-left: 5px; display: inline-block;"><img src="images/telegram.png" alt="Telegram" style="width: 16px; vertical-align: middle;"></a>`
            : "")
    : "";

  const mobile2HTML = fields.mobile2
    ? `Celular 2: ${generateLink("tel", fields.mobile2, fields.mobile2, "tel:+51{value}")}`
        + (fields.whatsapp2
            ? ` <a href="https://api.whatsapp.com/send?phone=+51${fields.mobile2.replace(/\D/g, "")}&text=Hola,%20${encodeURIComponent(fields.name)}%20solicito%20informes%20sobre%20productos" style="text-decoration: none; margin-left: 5px; display: inline-block;"><img src="images/whatsapp.png" alt="Whatsapp 2" style="width: 16px; vertical-align: middle;"></a> `
            : "")
    : "";

  const socialHTML =
    type === "full" || type === "medium"
      ? `
          <tr>
              <td colspan="${fields.logo ? 2 : 1}" style="padding: 6px 0; background-color: transparent;">
                  <div style="display: flex; justify-content: flex-start; width: 50%;">
                      <a href="https://maps.app.goo.gl/5gHmxXAgRGwDr5jk6" target="_blank" rel="noopener" style="text-decoration: none; margin-right: 10px;">
                          <img src="images/ubicacion.png" alt="Ubicación" style="width: 20px; vertical-align: middle;">
                      </a>
                      ${fields.facebook ? `<a href="${fields.facebook}" target="_blank" rel="noopener" style="text-decoration: none; margin-right: 10px;"><img src="images/facebook.png" alt="Facebook" style="width: 20px; vertical-align: middle;"></a>` : ""}
                      ${fields.instagram ? `<a href="${fields.instagram}" target="_blank" rel="noopener" style="text-decoration: none; margin-right: 10px;"><img src="images/instagram.png" alt="Instagram" style="width: 20px; vertical-align: middle;"></a>` : ""}
                      ${fields.youtube ? `<a href="${fields.youtube}" target="_blank" rel="noopener" style="text-decoration: none; margin-right: 10px;"><img src="images/youtube.png" alt="YouTube" style="width: 20px; vertical-align: middle;"></a>` : ""}
                      ${fields.tiktok ? `<a href="${fields.tiktok}" target="_blank" rel="noopener" style="text-decoration: none; margin-right: 10px;"><img src="images/tiktok.png" alt="TikTok" style="width: 20px; vertical-align: middle;"></a>` : ""}
                  </div>
              </td>
          </tr>
      `
      : "";

  const bannerHTML = type === "full"
    ? `<tr><td colspan="${fields.logo ? 2 : 1}" style="background-color: transparent;"><img src="images/baner_lineas.jpg" alt="Líneas" style="width: 300px; max-width: 100%;"></td></tr>`
    : "";

  const ecoHTML = `
    <tr>
        <td colspan="${fields.logo ? 2 : 1}" style="font-size: 8pt; font-style: italic; color: #0b7935; background-color: transparent;">
            Piense en el medio ambiente antes de imprimir este correo. <img src="images/eco.png" alt="Eco" style="vertical-align: middle;">
        </td>
    </tr>
  `;

  const signatureHTML = `
      <div style="max-width: 315px; font-family: sans-serif; background-color: transparent;">
          <table cellpadding="0" cellspacing="0" border="0" style="width: 315px; border-color: transparent; background-color: transparent;">
              <tr style="background-color: transparent;">
                  ${
                    fields.logo
                      ? `<td width="80" style="padding-right: 4px; background-color: transparent;">
                          <img src="${fields.logo}" alt="Logo" style="width: 90px; height: auto;">
                        </td>`
                      : ""
                  }
                  <td style="border-left: 4px solid ${fields.lineColor}; padding-left: 8px; background-color: transparent;">
                      <p style="margin: 5px 0 3px; color: #333333; background-color: transparent; font-size: 12pt;">${fields.name}</p>
                      <p style="margin: 5px 0 3px; color: #333333; background-color: transparent; font-size: 10pt;">${fields.position}</p>
                      <p style="margin: 5px 0 3px; color: #333333; background-color: transparent; font-size: 9pt;">${phoneHTML}</p>
                      <p style="margin: 5px 0 3px; color: #333333; background-color: transparent; font-size: 9pt;">${mobileHTML}</p>
                      <p style="margin: 5px 0 3px; color: #333333; background-color: transparent; font-size: 9pt;">${mobile2HTML}</p>
                  </td>
              </tr>
              ${socialHTML}
              ${bannerHTML}
              ${ecoHTML} <!-- Mensaje ecológico incluido aquí -->
          </table>
      </div>
  `;

  document.getElementById("signatureOutput").innerHTML = signatureHTML;
}

// Toggle de tema con mejora visual
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  document.body.classList.toggle("light-theme");
  document.getElementById("theme-toggle").textContent = document.body.classList.contains("dark-theme") ? "🌙" : "☀️";
});

// Generar firma según tipo con manejo de estado activo
document.querySelectorAll(".button-40[data-type]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".button-40[data-type]").forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    generateSignature(button.dataset.type);
  });
});

// Copiar firma como HTML con manejo de errores mejorado
document.getElementById("copy-html").addEventListener("click", () => {
  const signatureOutput = document.getElementById("signatureOutput");
  if (!signatureOutput.innerHTML) {
    showMessage("Por favor, genera una firma antes de copiar.", "error");
    return;
  }

  const range = document.createRange();
  range.selectNodeContents(signatureOutput);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    document.execCommand("copy");
    showMessage("Firma copiada como HTML al portapapeles.", "success");
  } catch (err) {
    console.error("Error al copiar HTML:", err);
    showMessage("Error al copiar la firma como HTML.", "error");
  } finally {
    selection.removeAllRanges();
  }
});

// Copiar firma como texto plano con solo valores importantes
document.getElementById("copy-text").addEventListener("click", () => {
  const fields = {
    name: document.getElementById("name").value.trim(),
    position: document.getElementById("position").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    extension: document.getElementById("extension").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    mobile2: document.getElementById("mobile2").value.trim()
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

// Quitar logo con actualización de interfaz
document.getElementById("remove-logo").addEventListener("click", () => {
  const logoInput = document.getElementById("logo-upload");
  logoInput.value = "";
  logoInput.dataset.removed = "true";
  const activeButton = document.querySelector('.button-40[data-type].active');
  if (activeButton) {
    generateSignature(activeButton.dataset.type);
  }
});

// Reiniciar formulario
document.getElementById("reset-form").addEventListener("click", () => {
  const inputs = document.querySelectorAll(".input-35");
  inputs.forEach((input) => {
    if (input.id === "facebook" || input.id === "instagram" || input.id === "youtube" || input.id === "tiktok") {
      input.value = input.defaultValue;
    } else if (input.id === "line-color") {
      input.value = "#2e4053";
    } else {
      input.value = "";
    }
  });

  const logoInput = document.getElementById("logo-upload");
  logoInput.value = "";
  logoInput.dataset.removed = "false";
  document.getElementById("logo-preview").style.display = "none";
  document.getElementById("signatureOutput").innerHTML = "";
});
