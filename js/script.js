function generateSignature(type) {
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const phone = document.getElementById("phone").value;
    const extension = document.getElementById("extension").value;
    const mobile = document.getElementById("mobile").value;
    const mobile2 = document.getElementById("mobile2").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const whatsapp2 = document.getElementById("whatsapp2").value;
    const telegram = document.getElementById("telegram").value;
    const facebook = document.getElementById("facebook").value;
    const instagram = document.getElementById("instagram").value;
    const youtube = document.getElementById("youtube").value;
    const tiktok = document.getElementById("tiktok").value;
  
    let phoneHTML = "";
    if (phone) {
      phoneHTML = `Teléfono:&nbsp;(01)<a href="tel:01${phone.replace(
        /\D/g,
        ""
      )}${extension ? `;${extension.replace(/\D/g, "")}` : ""}">${phone}</a>`;
      if (extension) {
        phoneHTML += ` ext. ${extension}`;
      }
      phoneHTML += `<br>`;
    }
  
    let mobileHTML = "";
    if (mobile) {
      mobileHTML = `Celular:&nbsp;<a href="tel:+51${mobile.replace(
        /\D/g,
        ""
      )}">${mobile}</a> `;
      if (whatsapp) {
        mobileHTML += `<a href="https://api.whatsapp.com/send?phone=+51${mobile.replace(
          /\D/g,
          ""
        )}&text=Hola,%20${name}%20solicito%20informes%20de%20productos"><img class="mensajer" src="images/whatsapp.png" alt="Whatsapp"/></a> `;
      }
      if (telegram) {
        mobileHTML += `<a href="https://t.me/+51${mobile.replace(
          /\D/g,
          ""
        )}?text=Hola,%20${name}%20solicito%20informes%20de%20productos"><img class="mensajer" src="images/Telegram.png" alt="Telegram"/></a>`;
      }
      mobileHTML += `<br>`;
    }
  
    let mobile2HTML = "";
    if (mobile2) {
      mobile2HTML = `Celular 2:&nbsp;<a href="tel:+51${mobile2.replace(
        /\D/g,
        ""
      )}">${mobile2}</a> `;
      if (whatsapp2) {
        mobile2HTML += `<a href="https://api.whatsapp.com/send?phone=+51${mobile2.replace(
          /\D/g,
          ""
        )}&text=Hola,%20${name}%20solicito%20informes%20de%20productos"><img class="mensajer" src="images/whatsapp.png" alt="Whatsapp 2"/></a>`;
      }
      mobile2HTML += `<br>`;
    }
  
    let socialHTML = "";
    if (type === "full" || type === "medium") {
      socialHTML = `
        <tr>
          <td colspan="2" class="social_link">
            <a href="https://maps.app.goo.gl/5gHmxXAgRGwDr5jk6" target="_blank" rel="noopener">
              <img class="social_link" src="images/ubicacion.png" alt="Av. Los Frutales 419 Ate - Lima" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;">
            </a>`;
      if (facebook) {
        socialHTML += `&nbsp;<a href="${facebook}" target="_blank" rel="noopener"><img class="social_link" src="images/Facebook.png" alt="facebook" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></a>`;
      }
      if (instagram) {
        socialHTML += `&nbsp;<a href="${instagram}" target="_blank" rel="noopener"><img class="social_link" src="images/Instagram.png" alt="instagram" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></a>`;
      }
      if (youtube) {
        socialHTML += `&nbsp;<a href="${youtube}" target="_blank" rel="noopener"><img class="social_link" src="images/Youtube.png" alt="youtube" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></a>`;
      }
      if (tiktok) {
        socialHTML += `&nbsp;<a href="${tiktok}" target="_blank" rel="noopener"><img class="social_link" src="images/tiktok.png" alt="tiktok" style="width: 20px; height: 20px; vertical-align: middle; margin-right: 5px;"></a>`;
      }
      socialHTML += `</td>
        </tr>`;
    }
  
    let bannerHTML = "";
    if (type === "full") {
      bannerHTML = `
        <tr>
          <td colspan="2">
            <div>
              <img src="images/baner lineas.jpg" alt= "lineas" style="width:300px;">
            </div>
          </td>
        </tr>`;
    }
  
    let ecoHTML = `
      <tr>
        <td colspan="2" class="eco_mail" style="font-size: 8pt; font-weight: 300; font-style: italic; color: #0b7935;">
          <img src="images/bandera.png" alt="PE" style="width: 19px; vertical-align: sub;">
          “Before printing an email, let's consider the environment.”<img src="images/eco.png" alt="eco">
        </td>
      </tr>`;
  
    let signatureHTML = `
      <table class="signature" cellpadding="0" cellspacing="0" style="font-family: 'Roboto', sans-serif;">
       <tr>
       <td style="height: auto; width: 90px; padding-right: 3px;">
        <img src="images/LOGO CIP.png" alt="www.Cipsa.com.pe" style="width: 90px; height : 94px;">
      </td>
      <td style="border-left: 4px solid #00225e; padding-left: 8px;">
        <p style="font-size: 11pt; font-weight: bold; margin-top: 5px; margin-bottom: 3px;">${name}</p>
        <p style="font-size: 10pt;margin-top: 5px; margin-bottom: 3px;">${position}</p>
        <p style="margin-top: 5px; margin-bottom: 3px;">${phoneHTML}</p>
        <p style="margin-top: 5px; margin-bottom: 3px;">${mobileHTML}</p>
        <p style="margin-top: 5px; margin-bottom: 3px;">${mobile2HTML}</p>
      </td>
        </tr>
        ${socialHTML}
        ${bannerHTML}
        ${ecoHTML}
      </table>`;
  
    document.getElementById("signatureOutput").innerHTML = signatureHTML;
  }
