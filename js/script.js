(function() {
  'use strict';

  // --- UTILITY FUNCTIONS ---

  function generateLink(type, value, text, urlTemplate) {
    if (!value) return "";
    const cleanValue = value.replace(/\D/g, "");
    try {
      const formattedUrl = urlTemplate
        .replace("{value}", cleanValue)
        .replace("{text}", encodeURIComponent(text));
      return `<a href="${formattedUrl}" style="color: #333333; text-decoration: none;">${value}</a>`;
    } catch (error) {
      console.error("Error formatting link:", error);
      return "";
    }
  }

  async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }

  function showMessage(message, type) {
    const container = document.getElementById('notification-container');
    if (!container) {
        console.error('Notification container not found!');
        return;
    }

    const msgBox = document.createElement('div');

    // Styling via classes would be better, but for now, JS is fine.
    msgBox.style.padding = '10px 20px';
    msgBox.style.borderRadius = '4px';
    msgBox.style.color = 'white';
    msgBox.style.marginBottom = '10px';
    msgBox.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    msgBox.style.transition = 'opacity 0.5s, transform 0.5s';
    msgBox.style.opacity = '0';
    msgBox.style.transform = 'translateX(100%)'; // Start off-screen

    if (type === 'success') {
      msgBox.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
      msgBox.style.backgroundColor = '#F44336';
    } else if (type === 'info') {
      msgBox.style.backgroundColor = '#2196f3';
    }
    msgBox.textContent = message;

    container.appendChild(msgBox);

    // Animate in
    setTimeout(() => {
      msgBox.style.opacity = '1';
      msgBox.style.transform = 'translateX(0)';
    }, 10);

    // Animate out and remove
    setTimeout(() => {
      msgBox.style.opacity = '0';
      msgBox.style.transform = 'translateX(100%)';
      setTimeout(() => {
          if (container.contains(msgBox)) {
            container.removeChild(msgBox)
          }
        }, 500); // Remove after animation
    }, 5000);
  }

  // --- SIGNATURE HTML GENERATION ---

  function getFormFields() {
    return {
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
      logo: "images/logo_cip.png", // Default logo
    };
  }

  function createContactInfoHTML(fields) {
    const phoneHTML = fields.phone
      ? `Teléfono: ${generateLink("tel", fields.phone, fields.phone, "tel:{value}")}${fields.extension ? ` ext. ${fields.extension}` : ""}<br>`
      : "";

    const createMobileLink = (mobile, whatsapp, name) => {
        let link = generateLink("tel", mobile, mobile, "tel:+51{value}");
        if (whatsapp) {
            link += ` <a href="https://api.whatsapp.com/send?phone=+51${mobile.replace(/\D/g, "")}&text=Hola,%20${encodeURIComponent(name)}%20solicito%20informes%20sobre%20productos" style="text-decoration: none; margin-left: 5px; display: inline-block;"><img src="images/whatsapp.png" alt="Whatsapp" style="width: 16px; vertical-align: middle;"></a>`;
        }
        return link;
    };

    const mobileHTML = fields.mobile ? `Celular: ${createMobileLink(fields.mobile, fields.whatsapp, fields.name)}` : "";
    const mobile2HTML = fields.mobile2 ? `Celular 2: ${createMobileLink(fields.mobile2, fields.whatsapp2, fields.name)}` : "";

    return `
      <p style="margin: 5px 0 3px; color: #333333; background-color: transparent; font-size: 9pt;">${phoneHTML}</p>
      <p style="margin: 5px 0 3px; color: #333333; background-color: transparent; font-size: 9pt;">${mobileHTML}</p>
      <p style="margin: 5px 0 3px; color: #333333; background-color: transparent; font-size: 9pt;">${mobile2HTML}</p>
    `;
  }

  function createSocialLinksHTML(fields) {
    return `
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
    `;
  }

  function createBannerHTML(logo) {
      return `<tr><td colspan="${logo ? 2 : 1}" style="background-color: transparent;"><img src="images/baner_lineas.jpg" alt="Líneas" style="width: 300px; max-width: 100%;"></td></tr>`;
  }

  function createEcoMessageHTML(logo) {
      return `
      <tr>
          <td colspan="${logo ? 2 : 1}" style="font-size: 8pt; font-style: italic; color: #0b7935; background-color: transparent;">
              Piense en el medio ambiente antes de imprimir este correo. <img src="images/eco.png" alt="Eco" style="vertical-align: middle;">
          </td>
      </tr>
    `;
  }

  async function generateSignature(type) {
    const fields = getFormFields();

    if (!fields.name || !fields.position) {
      showMessage("Por favor, complete los campos Nombre y Cargo.", "error");
      return;
    }

    const logoInput = document.getElementById("logo-upload");
    if (logoInput.files && logoInput.files[0]) {
      try {
        fields.logo = await fileToBase64(logoInput.files[0]);
      } catch (error) {
        showMessage("Error al cargar el logo. Usando logo por defecto.", "error");
        fields.logo = "images/logo_cip.png";
      }
    } else if (logoInput.dataset.removed === "true") {
      fields.logo = null;
    }

    const contactInfoHTML = createContactInfoHTML(fields);
    const socialHTML = (type === "full" || type === "medium") ? createSocialLinksHTML(fields) : "";
    const bannerHTML = (type === "full") ? createBannerHTML(fields.logo) : "";
    const ecoHTML = createEcoMessageHTML(fields.logo);

    const signatureHTML = `
      <div style="max-width: 315px; font-family: sans-serif; background-color: transparent;">
        <table cellpadding="0" cellspacing="0" border="0" style="width: 315px; border-color: transparent; background-color: transparent;">
          <tr style="background-color: transparent;">
            ${fields.logo ? `<td width="80" style="padding-right: 4px; background-color: transparent;"><img src="${fields.logo}" alt="Logo" style="width: 90px; height: auto;"></td>` : ""}
            <td style="border-left: 4px solid ${fields.lineColor}; padding-left: 8px; background-color: transparent;">
              <p style="margin: 5px 0 3px; color: #333333; background-color: transparent; font-size: 12pt;">${fields.name}</p>
              <p style="margin: 5px 0 3px; color: #333333; background-color: transparent; font-size: 10pt;">${fields.position}</p>
              ${contactInfoHTML}
            </td>
          </tr>
          ${socialHTML}
          ${bannerHTML}
          ${ecoHTML}
        </table>
      </div>
    `;

    document.getElementById("signatureOutput").innerHTML = signatureHTML;
  }

  // --- EVENT LISTENERS ---

  document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
    document.getElementById("theme-toggle").textContent = document.body.classList.contains("dark-theme") ? "🌙" : "☀️";
  });

  document.querySelectorAll(".button-40[data-type]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".button-40[data-type]").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      generateSignature(button.dataset.type);
    });
  });

  document.getElementById("copy-html").addEventListener("click", () => {
    const signatureOutput = document.getElementById("signatureOutput");
    if (!signatureOutput.innerHTML) {
      showMessage("Por favor, genera una firma antes de copiar.", "error");
      return;
    }

    const htmlContent = signatureOutput.innerHTML;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const clipboardItem = new ClipboardItem({ "text/html": blob });

    navigator.clipboard.write([clipboardItem]).then(() => {
      showMessage("Firma copiada como HTML al portapapeles.", "success");
    }).catch(err => {
      console.error("Error al copiar HTML:", err);
      showMessage("Error al copiar la firma como HTML.", "error");
    });
  });

  document.getElementById("copy-text").addEventListener("click", () => {
    const fields = getFormFields();
    if (!fields.name && !fields.position) {
      showMessage("No hay información para copiar", "error");
      return;
    }

    let textToCopy = `${fields.name}\n${fields.position}\n`;
    if (fields.phone) {
      textToCopy += `Teléfono: ${fields.phone}${fields.extension ? ` ext. ${fields.extension}` : ""}\n`;
    }
    if (fields.mobile) textToCopy += `Celular: ${fields.mobile}\n`;
    if (fields.mobile2) textToCopy += `Celular 2: ${fields.mobile2}\n`;

    navigator.clipboard.writeText(textToCopy.trim()).then(() => {
      showMessage("Información esencial copiada al portapapeles", "success");
    }).catch(err => {
      console.error("Error al copiar texto:", err);
      showMessage("Error al copiar la información", "error");
    });
  });

  document.getElementById("remove-logo").addEventListener("click", () => {
    const logoInput = document.getElementById("logo-upload");
    logoInput.value = "";
    logoInput.dataset.removed = "true";
    const activeButton = document.querySelector('.button-40[data-type].active');
    if (activeButton) {
      generateSignature(activeButton.dataset.type);
    }
  });

  document.getElementById("reset-form").addEventListener("click", () => {
    const inputs = document.querySelectorAll(".input-35");
    inputs.forEach((input) => {
      if (input.id === "facebook" || input.id === "instagram" || input.id === "youtube" || input.id === "tiktok") {
        input.value = input.defaultValue;
      } else if (input.id === "line-color") {
        input.value = "#00225e";
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

})();
