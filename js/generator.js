import { sanitize } from './validation.js';

// Recopilar valores del formulario
export function getFormValues() {
  return {
    name: sanitize(document.getElementById("name").value.trim()),
    position: sanitize(document.getElementById("position").value.trim()),
    phone: sanitize(document.getElementById("phone").value.trim()),
    extension: sanitize(document.getElementById("extension").value.trim()),
    mobile: sanitize(document.getElementById("mobile").value.trim()),
    mobile2: sanitize(document.getElementById("mobile2").value.trim()),
    addWhatsapp: document.getElementById("add-whatsapp").checked,
    addWhatsapp2: document.getElementById("add-whatsapp2").checked,
    addTelegram: document.getElementById("add-telegram").checked,
    facebook: sanitize(document.getElementById("facebook").value.trim()),
    instagram: sanitize(document.getElementById("instagram").value.trim()),
    youtube: sanitize(document.getElementById("youtube").value.trim()),
    tiktok: sanitize(document.getElementById("tiktok").value.trim()),
    lineColor: document.getElementById("line-color").value,
    logo: "images/logo_cip.png", // Logo por defecto
  };
}

// Generar HTML del logo
export function generateLogoHTML(logo, config) {
  const logoSrc = logo === config.defaultLogo ? config.base64Images.defaultLogo : logo;
  return logoSrc
    ? `<td width="90" valign="middle" style="padding-right: 8px; text-align: center; vertical-align: middle;">
        <img src="${logoSrc}" alt="Logo" width="90" height="auto" style="display: block; border: none; outline: none; text-decoration: none; max-width: 90px; margin: 0 auto;">
      </td>`
    : "";
}

// Generar HTML del teléfono
export function generatePhoneHTML(phone, extension) {
  if (!phone) return "";
  const formattedPhoneDisplay = `(01)${phone}`;
  let linkValue = `01${phone}`;
  let displayText = formattedPhoneDisplay;

  if (extension) {
    linkValue += `;${extension}`;
    displayText += ` ext. ${extension}`;
  }

  return `<p style="margin: 5px 0 3px; color: #333333; font-size: 9pt; background-color: transparent;">Teléfono: <a href="tel:${linkValue}" style="color: #333333; text-decoration: none;">${displayText}</a></p>`;
}

// Generar HTML del móvil
export function generateMobileHTML(mobile, addWhatsapp, addTelegram, name, config) {
  if (!mobile) return "";
  const whatsappIcon = addWhatsapp
    ? `<a href="https://api.whatsapp.com/send?phone=+51${mobile.replace(/\D/g, "")}&text=Hola,%20${encodeURIComponent(name)}%20solicito%20informes%20sobre%20productos" target="_blank" rel="noopener" style="text-decoration: none; margin-left: 5px;"><img src="${config.base64Images.whatsapp}" alt="Whatsapp" width="20" height="20" style="vertical-align: middle; border: none; outline: none; text-decoration: none;"></a>`
    : "";
  const telegramIcon = addTelegram
    ? `<a href="https://t.me/+51${mobile.replace(/\D/g, "")}" target="_blank" rel="noopener" style="text-decoration: none; margin-left: 5px;"><img src="${config.base64Images.telegram}" alt="Telegram" width="20" height="20" style="vertical-align: middle; border: none; outline: none; text-decoration: none;"></a>`
    : "";
  return `<p style="margin: 5px 0 3px; color: #333333; font-size: 9pt; background-color: transparent;">Celular: <a href="tel:+51${mobile.replace(/\D/g, "")}" style="color: #333333; text-decoration: none;">${mobile}</a>${whatsappIcon}${telegramIcon}</p>`;
}

// Generar HTML de redes sociales
export function generateSocialHTML(fields, type, config) {
  if (type !== "full" && type !== "medium") return "";
  const socialLinks = [
    { href: "https://maps.app.goo.gl/5gHmxXAgRGwDr5jk6", imgKey: "ubicacion", alt: "Ubicación" },
    { href: fields.facebook, imgKey: "facebook", alt: "Facebook" },
    { href: fields.instagram, imgKey: "instagram", alt: "Instagram" },
    { href: fields.youtube, imgKey: "youtube", alt: "YouTube" },
    { href: fields.tiktok, imgKey: "tiktok", alt: "TikTok" },
  ];

  const socialIcons = socialLinks
    .filter(link => link.href)
    .map(link => `<a href="${link.href}" target="_blank" rel="noopener" style="text-decoration: none; margin-right: 5px; display: inline-block;"><img src="${config.base64Images[link.imgKey]}" alt="${link.alt}" width="20" height="20" style="vertical-align: middle; border: none; outline: none; text-decoration: none;"></a>`)
    .join("");

  return `
        <tr>
            <td colspan="${fields.logo ? 2 : 1}" style="padding: 6px 0; background-color: transparent;">
                <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; background-color: transparent;">
                    <tr>
                        <td style="text-align: left; background-color: transparent;">
                            ${socialIcons}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `;
}

// Generar HTML del banner
export function generateBannerHTML(type, logo, config) {
  return type === "full"
    ? `<tr><td colspan="${logo ? 2 : 1}" style="background-color: transparent;"><img src="${config.base64Images.bannerImage}" alt="Líneas" width="300" height="auto" style="display: block; border: none; outline: none; text-decoration: none; max-width: 100%;"></td></tr>`
    : "";
}

// Generar HTML del mensaje eco
export function generateEcoHTML(logo, config) {
  return `
  <tr>
      <td colspan="${logo ? 2 : 1}" style="background-color: transparent; padding-top: 8px;">
          <p style="margin: 0; font-size: 8pt; font-style: italic; color: #0b7935; background-color: transparent; text-align: left; line-height: 1.2;">
              Think of the environment before printing this email.
              <img src="${config.base64Images.eco}" alt="Eco icon" width="16" height="16" style="vertical-align: middle; margin-left: 4px; border: none; outline: none; text-decoration: none;">
          </p>
      </td>
  </tr>
 `;
}

// Generar firma completa
export async function generateSignature(type, config) {
  const fields = getFormValues();

  // Manejar logo
  const logoInput = document.getElementById("logo-upload");
  if (logoInput.files && logoInput.files[0]) {
    try {
      fields.logo = await import('./utils.js').then(module => module.fileToBase64(logoInput.files[0]));
    } catch (error) {
      console.error("Error al convertir la imagen:", error);
      import('./utils.js').then(module => module.showMessage("Error al cargar el logo. Usando logo por defecto.", "error"));
      fields.logo = config.defaultLogo;
    }
  } else if (logoInput.dataset.removed === "true") {
    fields.logo = null;
  }

  const phoneHTML = generatePhoneHTML(fields.phone, fields.extension);
  const mobileHTML = generateMobileHTML(fields.mobile, fields.addWhatsapp, fields.addTelegram, fields.name, config);
  const mobile2HTML = generateMobileHTML(fields.mobile2, fields.addWhatsapp2, false, fields.name, config);

  const socialHTML = generateSocialHTML(fields, type, config);
  const bannerHTML = generateBannerHTML(type, fields.logo, config);
  const ecoHTML = generateEcoHTML(fields.logo, config);

  const signatureHTML = `
      <div class="signature-wrapper">
          <table cellpadding="0" cellspacing="0" border="0" class="signature-table">
              <tr class="signature-main-row">
                  ${generateLogoHTML(fields.logo, config)}
                  <td class="signature-info-cell" style="border-left: 4px solid ${fields.lineColor};">
                      <p style="margin: 5px 0 3px; color: #333333; font-size: 12pt; background-color: transparent;">${fields.name}</p>
                      <p style="margin: 5px 0 3px; color: #333333; font-size: 10pt; background-color: transparent;">${fields.position}</p>
                      ${phoneHTML}
                      ${mobileHTML}
                      ${mobile2HTML}
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