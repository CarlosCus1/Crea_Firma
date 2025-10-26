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
    lineWidth: parseInt(document.getElementById("line-width").value),
    logoType: document.getElementById("logo-type").value,
    logoColor: document.getElementById("logo-color").value,
    logo: "images/logo_cip.png", // Logo por defecto
  };
}

// Generar HTML del logo (SVG personalizado o imagen)
export async function generateLogoHTML(logo, config, fields) {
  // Si hay una imagen subida, usar esa
  if (logo && logo !== config.defaultLogo) {
    return `<td width="90" valign="middle" style="padding-right: 8px; text-align: center; vertical-align: middle;">
        <img src="${logo}" alt="Logo" width="90" height="auto" style="display: block; border: none; outline: none; text-decoration: none; max-width: 90px; margin: 0 auto;">
      </td>`;
  }

  // Si no hay imagen subida, usar SVG personalizado basado en logoType, convertido a PNG base64
  if (fields.logoType === 'logo1') {
    const svgString = generateSvgHTML1(fields.logoColor);
    const { svgToPngBase64 } = await import('./utils.js');
    const pngBase64 = await svgToPngBase64(svgString);
    return `<td width="90" valign="middle" style="padding-right: 8px; text-align: center; vertical-align: middle;">
        <img src="${pngBase64}" alt="Logo" width="90" height="auto" style="display: block; border: none; outline: none; text-decoration: none; max-width: 90px; margin: 0 auto;">
      </td>`;
  } else if (fields.logoType === 'logo2') {
    const svgString = generateSvgHTML2(fields.logoColor);
    const { svgToPngBase64 } = await import('./utils.js');
    const pngBase64 = await svgToPngBase64(svgString);
    return `<td width="90" valign="middle" style="padding-right: 8px; text-align: center; vertical-align: middle;">
        <img src="${pngBase64}" alt="Logo" width="90" height="auto" style="display: block; border: none; outline: none; text-decoration: none; max-width: 90px; margin: 0 auto;">
      </td>`;
  } else if (fields.logoType === 'none') {
    return '';
  } else if (fields.logoType === 'upload') {
    return `<td width="90" valign="middle" style="padding-right: 8px; text-align: center; vertical-align: middle;">
        <img src="${config.base64Images.defaultLogo}" alt="Logo" width="90" height="auto" style="display: block; border: none; outline: none; text-decoration: none; max-width: 90px; margin: 0 auto;">
      </td>`;
  }

  return '';
}

// Generar HTML del SVG personalizado (Logo 1)
export function generateSvgHTML1(fillColor) {
  console.log(`Generando SVG1: fill=${fillColor}`);
  const svgContent = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 1024 1024" preserveAspectRatio="xMidYMid meet" style="max-width: 90px; max-height: 90px;">
    <g transform="translate(0,1024) scale(0.1,-0.1)" fill="${fillColor}">
      <path d="M2930 9982 c0 -5 -42 -12 -92 -15 -170 -11 -524 -75 -538 -97 -3 -4 -25 -13 -50 -20 -69 -18 -224 -71 -230 -79 -5 -7 -73 -37 -162 -72 -32 -13 -58 -26 -58 -30 0 -4 -42 -28 -94 -54 -52 -26 -97 -53 -100 -61 -3 -8 -12 -14 -19 -14 -8 0 -33 -13 -55 -30 -23 -16 -45 -30 -49 -30 -5 0 -21 -14 -37 -30 -16 -17 -33 -30 -38 -30 -9 0 -85 -56 -103 -76 -5 -7 -30 -27 -55 -45 -82 -61 -342 -331 -395 -408 -16 -24 -35 -45 -42 -48 -7 -3 -13 -9 -13 -15 0 -9 -45 -74 -64 -93 -12 -11 -27 -36 -63 -103 -13 -24 -30 -51 -39 -59 -8 -8 -28 -45 -45 -81 -16 -37 -33 -69 -37 -72 -5 -3 -24 -41 -43 -85 -18 -44 -39 -86 -46 -92 -6 -7 -26 -59 -44 -115 -17 -57 -35 -105 -38 -108 -9 -7 -35 -98 -57 -195 -10 -44 -21 -82 -25 -85 -10 -7 -47 -247 -59 -380 -13 -149 -13 -404 0 -550 15 -156 48 -364 60 -368 6 -2 10 -11 10 -20 0 -29 60 -256 69 -262 5 -3 13 -21 19 -40 18 -62 65 -185 72 -190 4 -3 22 -39 40 -80 18 -41 36 -77 40 -80 4 -3 24 -40 45 -82 21 -43 41 -78 45 -78 5 0 18 -19 31 -42 12 -24 27 -52 33 -63 6 -11 23 -33 38 -49 14 -16 32 -40 40 -55 7 -14 30 -44 50 -66 21 -21 38 -43 38 -49 0 -5 15 -23 32 -40 18 -17 60 -62 93 -100 62 -71 130 -139 163 -162 11 -7 35 -28 54 -46 33 -32 83 -74 143 -122 17 -13 45 -31 63 -40 17 -9 32 -20 32 -25 0 -9 93 -67 133 -83 9 -4 17 -11 17 -16 0 -5 39 -28 88 -52 48 -24 89 -48 92 -52 7 -9 211 -98 228 -98 6 0 12 -4 12 -8 0 -8 184 -72 253 -88 15 -3 27 -9 27 -14 0 -17 363 -84 518 -96 51 -4 92 -11 92 -15 0 -5 1276 -9 2851 -9 l2852 0 -6 28 c-3 15 -9 55 -13 90 -3 34 -11 62 -15 62 -5 0 -9 11 -9 23 0 32 -67 259 -79 266 -5 4 -19 33 -31 65 -12 32 -30 66 -39 76 -14 15 -33 47 -78 132 -8 16 -18 28 -22 28 -5 0 -21 19 -37 42 -32 48 -205 218 -235 232 -10 5 -19 13 -19 17 0 5 -26 25 -57 45 -32 20 -62 41 -68 48 -10 13 -161 87 -202 100 -13 4 -23 11 -23 15 0 15 -259 91 -309 91 -12 0 -21 4 -21 9 0 5 -17 12 -37 16 -21 4 -1005 11 -2188 15 -1550 4 -2164 10 -2200 18 -27 6 -85 19 -127 28 -43 10 -78 21 -78 26 0 4 -6 8 -14 8 -12 0 -35 8 -171 62 -27 11 -55 26 -60 33 -6 7 -26 20 -45 29 -59 27 -98 52 -132 85 -17 17 -37 31 -43 31 -6 0 -24 14 -40 30 -16 17 -34 30 -41 30 -7 0 -14 4 -16 9 -4 11 -127 148 -155 174 -13 12 -23 25 -23 29 0 10 -51 81 -62 86 -3 2 -23 38 -44 80 -21 42 -41 79 -44 82 -11 8 -70 170 -70 191 0 10 -4 19 -9 19 -10 0 -34 103 -50 217 -14 92 -14 309 -1 410 14 104 40 223 49 223 4 0 12 19 18 43 14 56 53 161 62 167 4 3 25 41 46 85 22 44 44 85 50 90 17 15 65 83 65 91 0 4 10 16 23 28 17 17 134 146 157 175 3 3 27 22 54 41 27 19 59 45 73 57 31 29 123 89 151 97 12 4 22 11 22 17 0 10 96 55 180 85 30 10 57 22 60 25 21 28 314 78 453 79 l77 0 0 695 0 695 -155 0 c-85 0 -155 -4 -155 -8z"/>
      <path d="M3731 9520 l3 -470 43 45 c24 25 43 48 43 52 0 7 221 221 279 271 21 17 44 32 50 32 6 0 11 5 11 10 0 6 24 26 54 45 29 19 62 42 71 52 10 9 27 23 39 29 12 6 44 23 71 38 28 15 55 32 60 39 11 13 177 97 193 97 6 0 12 5 14 10 3 11 154 80 175 80 6 0 18 7 27 15 15 15 175 71 274 96 28 7 52 16 52 21 0 4 -329 8 -731 8 l-731 0 3 -470z"/>
      <path d="M5440 9672 c0 -4 -30 -13 -67 -20 -114 -21 -348 -83 -351 -93 -2 -5 -9 -9 -15 -9 -20 0 -272 -83 -277 -91 -3 -5 -45 -24 -94 -44 -91 -37 -127 -54 -136 -64 -3 -3 -39 -23 -80 -45 -41 -21 -80 -45 -86 -52 -6 -8 -14 -14 -18 -14 -22 0 -156 -108 -248 -202 -60 -59 -108 -111 -108 -114 0 -3 -13 -24 -29 -47 -15 -23 -31 -52 -35 -64 -4 -13 -11 -23 -16 -23 -9 0 -70 -141 -70 -163 0 -9 -4 -17 -10 -19 -11 -4 -34 -88 -56 -209 -14 -73 -17 -259 -21 -1361 l-6 -1278 1874 -3 1874 -2 110 -28 c61 -15 112 -32 113 -37 2 -6 9 -10 14 -10 22 0 228 -83 228 -92 0 -5 19 -17 43 -28 55 -26 109 -57 116 -68 3 -5 33 -26 65 -48 33 -21 66 -43 73 -49 29 -21 223 -214 223 -222 0 -4 20 -28 45 -52 25 -24 45 -50 45 -56 0 -7 12 -25 27 -41 14 -15 40 -53 56 -84 17 -30 36 -59 42 -65 10 -9 57 -109 69 -147 8 -25 27 -22 61 9 16 15 54 45 85 65 80 55 217 177 350 313 38 39 83 85 101 103 18 18 45 53 60 78 16 24 33 44 39 44 5 0 18 17 29 38 10 20 30 48 43 62 14 14 32 39 40 55 34 68 54 100 64 107 6 4 26 41 44 83 18 41 36 75 40 75 4 0 22 42 41 93 18 50 36 93 41 95 8 4 35 92 65 212 10 41 21 77 24 80 12 9 49 252 59 395 11 143 7 336 -11 480 -16 129 -42 280 -49 285 -3 3 -16 48 -29 100 -27 115 -53 203 -62 210 -6 5 -55 133 -67 175 -3 11 -9 22 -13 25 -4 3 -24 41 -44 85 -20 44 -39 82 -43 85 -4 3 -25 40 -47 83 -21 42 -42 77 -47 77 -4 0 -19 21 -35 48 -15 26 -42 63 -60 82 -18 19 -33 40 -33 46 0 6 -20 31 -45 55 -25 24 -45 47 -45 52 0 11 -182 187 -193 187 -5 0 -18 11 -28 24 -10 13 -41 38 -68 55 -27 18 -52 38 -55 46 -3 8 -10 15 -16 15 -6 0 -31 14 -55 30 -24 17 -48 30 -54 30 -6 0 -18 8 -28 19 -10 10 -63 38 -118 62 -55 24 -106 49 -113 56 -13 12 -228 83 -255 83 -8 0 -17 4 -19 9 -7 22 -447 101 -557 101 -23 0 -41 5 -44 13 -5 16 -675 17 -685 0 -4 -5 -52 -13 -107 -17 -217 -16 -656 -80 -663 -98 -2 -4 -12 -8 -23 -8 -32 0 -374 -82 -379 -91 -3 -4 -26 -13 -50 -18 -25 -6 -63 -17 -85 -25 -22 -9 -45 -15 -51 -16 -7 0 -20 33 -29 73 -10 39 -21 74 -25 77 -5 5 -19 57 -68 275 -9 39 -19 72 -22 75 -4 3 -17 49 -29 103 -19 84 -31 117 -31 89z m1970 -2033 c70 -11 202 -47 210 -58 3 -3 40 -24 84 -45 43 -22 83 -48 89 -58 7 -10 16 -18 22 -18 25 -1 175 -161 204 -218 11 -22 26 -46 34 -53 28 -29 87 -214 87 -273 0 -14 5 -26 10 -26 6 0 10 -42 10 -105 0 -63 -4 -105 -10 -105 -5 0 -10 -11 -10 -24 0 -56 -59 -253 -80 -266 -4 -3 -19 -29 -34 -58 -15 -29 -38 -62 -51 -74 -14 -12 -25 -27 -25 -34 0 -7 -26 -34 -57 -61 -32 -26 -60 -51 -63 -55 -10 -13 -95 -68 -106 -68 -5 0 -20 -9 -32 -21 -28 -25 -143 -66 -240 -85 -89 -17 -246 -18 -345 -3 -71 11 -237 64 -247 79 -3 4 -30 21 -60 38 -31 17 -67 41 -80 54 -96 85 -128 117 -148 148 -13 19 -29 40 -36 45 -16 13 -86 153 -86 171 0 8 -4 14 -9 14 -12 0 -37 105 -51 210 -8 61 -8 114 -1 187 11 105 38 223 52 223 4 0 13 17 20 38 26 83 69 142 179 251 105 104 107 105 190 147 41 21 77 41 80 45 7 9 97 36 160 48 30 6 64 13 75 15 42 8 203 5 265 -5z"/>
      <path d="M3980 2128 l0 -1878 145 0 c80 0 145 4 145 9 0 4 34 11 75 14 135 12 406 76 433 104 7 7 25 16 40 20 44 11 152 61 152 71 0 6 8 12 18 15 34 12 107 57 137 85 17 16 37 33 47 38 24 13 188 171 188 181 0 5 16 26 35 47 19 21 50 66 68 100 17 33 35 63 38 66 11 9 38 66 60 127 12 32 25 60 29 63 9 8 39 139 50 227 7 50 10 522 8 1331 l-3 1252 -833 3 -832 2 0 -1877z"/>
    </g>
  </svg>`;
  return svgContent;
}

// Generar HTML del SVG personalizado (Logo 2)
export function generateSvgHTML2(fillColor) {
  console.log(`Generando SVG2 (borde): stroke=${fillColor}`);
  // Ajustamos stroke-width a 200 (más grueso para máxima visibilidad)
  const strokeWidth = 200;
  const pathStyle = `fill="none" stroke="${fillColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"`;

  const svgContent = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 1024 1024" preserveAspectRatio="xMidYMid meet" style="max-width: 90px; max-height: 90px;">
    <g transform="translate(0,1024) scale(0.1,-0.1)">
      <path ${pathStyle} d="M2930 9982 c0 -5 -42 -12 -92 -15 -170 -11 -524 -75 -538 -97 -3 -4 -25 -13 -50 -20 -69 -18 -224 -71 -230 -79 -5 -7 -73 -37 -162 -72 -32 -13 -58 -26 -58 -30 0 -4 -42 -28 -94 -54 -52 -26 -97 -53 -100 -61 -3 -8 -12 -14 -19 -14 -8 0 -33 -13 -55 -30 -23 -16 -45 -30 -49 -30 -5 0 -21 -14 -37 -30 -16 -17 -33 -30 -38 -30 -9 0 -85 -56 -103 -76 -5 -7 -30 -27 -55 -45 -82 -61 -342 -331 -395 -408 -16 -24 -35 -45 -42 -48 -7 -3 -13 -9 -13 -15 0 -9 -45 -74 -64 -93 -12 -11 -27 -36 -63 -103 -13 -24 -30 -51 -39 -59 -8 -8 -28 -45 -45 -81 -16 -37 -33 -69 -37 -72 -5 -3 -24 -41 -43 -85 -18 -44 -39 -86 -46 -92 -6 -7 -26 -59 -44 -115 -17 -57 -35 -105 -38 -108 -9 -7 -35 -98 -57 -195 -10 -44 -21 -82 -25 -85 -10 -7 -47 -247 -59 -380 -13 -149 -13 -404 0 -550 15 -156 48 -364 60 -368 6 -2 10 -11 10 -20 0 -29 60 -256 69 -262 5 -3 13 -21 19 -40 18 -62 65 -185 72 -190 4 -3 22 -39 40 -80 18 -41 36 -77 40 -80 4 -3 24 -40 45 -82 21 -43 41 -78 45 -78 5 0 18 -19 31 -42 12 -24 27 -52 33 -63 6 -11 23 -33 38 -49 14 -16 32 -40 40 -55 7 -14 30 -44 50 -66 21 -21 38 -43 38 -49 0 -5 15 -23 32 -40 18 -17 60 -62 93 -100 62 -71 130 -139 163 -162 11 -7 35 -28 54 -46 33 -32 83 -74 143 -122 17 -13 45 -31 63 -40 17 -9 32 -20 32 -25 0 -9 93 -67 133 -83 9 -4 17 -11 17 -16 0 -5 39 -28 88 -52 48 -24 89 -48 92 -52 7 -9 211 -98 228 -98 6 0 12 -4 12 -8 0 -8 184 -72 253 -88 15 -3 27 -9 27 -14 0 -17 363 -84 518 -96 51 -4 92 -11 92 -15 0 -5 1276 -9 2851 -9 l2852 0 -6 28 c-3 15 -9 55 -13 90 -3 34 -11 62 -15 62 -5 0 -9 11 -9 23 0 32 -67 259 -79 266 -5 4 -19 33 -31 65 -12 32 -30 66 -39 76 -14 15 -33 47 -78 132 -8 16 -18 28 -22 28 -5 0 -21 19 -37 42 -32 48 -205 218 -235 232 -10 5 -19 13 -19 17 0 5 -26 25 -57 45 -32 20 -62 41 -68 48 -10 13 -161 87 -202 100 -13 4 -23 11 -23 15 0 15 -259 91 -309 91 -12 0 -21 4 -21 9 0 5 -17 12 -37 16 -21 4 -1005 11 -2188 15 -1550 4 -2164 10 -2200 18 -27 6 -85 19 -127 28 -43 10 -78 21 -78 26 0 4 -6 8 -14 8 -12 0 -35 8 -171 62 -27 11 -55 26 -60 33 -6 7 -26 20 -45 29 -59 27 -98 52 -132 85 -17 17 -37 31 -43 31 -6 0 -24 14 -40 30 -16 17 -34 30 -41 30 -7 0 -14 4 -16 9 -4 11 -127 148 -155 174 -13 12 -23 25 -23 29 0 10 -51 81 -62 86 -3 2 -23 38 -44 80 -21 42 -41 79 -44 82 -11 8 -70 170 -70 191 0 10 -4 19 -9 19 -10 0 -34 103 -50 217 -14 92 -14 309 -1 410 14 104 40 223 49 223 4 0 12 19 18 43 14 56 53 161 62 167 4 3 25 41 46 85 22 44 44 85 50 90 17 15 65 83 65 91 0 4 10 16 23 28 17 17 134 146 157 175 3 3 27 22 54 41 27 19 59 45 73 57 31 29 123 89 151 97 12 4 22 11 22 17 0 10 96 55 180 85 30 10 57 22 60 25 21 28 314 78 453 79 l77 0 0 695 0 695 -155 0 c-85 0 -155 -4 -155 -8z"/>
      <path ${pathStyle} d="M3731 9520 l3 -470 43 45 c24 25 43 48 43 52 0 7 221 221 279 271 21 17 44 32 50 32 6 0 11 5 11 10 0 6 24 26 54 45 29 19 62 42 71 52 10 9 27 23 39 29 12 6 44 23 71 38 28 15 55 32 60 39 11 13 177 97 193 97 6 0 12 5 14 10 3 11 154 80 175 80 6 0 18 7 27 15 15 15 175 71 274 96 28 7 52 16 52 21 0 4 -329 8 -731 8 l-731 0 3 -470z"/>
      <path ${pathStyle} d="M5440 9672 c0 -4 -30 -13 -67 -20 -114 -21 -348 -83 -351 -93 -2 -5 -9 -9 -15 -9 -20 0 -272 -83 -277 -91 -3 -5 -45 -24 -94 -44 -91 -37 -127 -54 -136 -64 -3 -3 -39 -23 -80 -45 -41 -21 -80 -45 -86 -52 -6 -8 -14 -14 -18 -14 -22 0 -156 -108 -248 -202 -60 -59 -108 -111 -108 -114 0 -3 -13 -24 -29 -47 -15 -23 -31 -52 -35 -64 -4 -13 -11 -23 -16 -23 -9 0 -70 -141 -70 -163 0 -9 -4 -17 -10 -19 -11 -4 -34 -88 -56 -209 -14 -73 -17 -259 -21 -1361 l-6 -1278 1874 -3 1874 -2 110 -28 c61 -15 112 -32 113 -37 2 -6 9 -10 14 -10 22 0 228 -83 228 -92 0 -5 19 -17 43 -28 55 -26 109 -57 116 -68 3 -5 33 -26 65 -48 33 -21 66 -43 73 -49 29 -21 223 -214 223 -222 0 -4 20 -28 45 -52 25 -24 45 -50 45 -56 0 -7 12 -25 27 -41 14 -15 40 -53 56 -84 17 -30 36 -59 42 -65 10 -9 57 -109 69 -147 8 -25 27 -22 61 9 16 15 54 45 85 65 80 55 217 177 350 313 38 39 83 85 101 103 18 18 45 53 60 78 16 24 33 44 39 44 5 0 18 17 29 38 10 20 30 48 43 62 14 14 32 39 40 55 34 68 54 100 64 107 6 4 26 41 44 83 18 41 36 75 40 75 4 0 22 42 41 93 18 50 36 93 41 95 8 4 35 92 65 212 10 41 21 77 24 80 12 9 49 252 59 395 11 143 7 336 -11 480 -16 129 -42 280 -49 285 -3 3 -16 48 -29 100 -27 115 -53 203 -62 210 -6 5 -55 133 -67 175 -3 11 -9 22 -13 25 -4 3 -24 41 -44 85 -20 44 -39 82 -43 85 -4 3 -25 40 -47 83 -21 42 -42 77 -47 77 -4 0 -19 21 -35 48 -15 26 -42 63 -60 82 -18 19 -33 40 -33 46 0 6 -20 31 -45 55 -25 24 -45 47 -45 52 0 11 -182 187 -193 187 -5 0 -18 11 -28 24 -10 13 -41 38 -68 55 -27 18 -52 38 -55 46 -3 8 -10 15 -16 15 -6 0 -31 14 -55 30 -24 17 -48 30 -54 30 -6 0 -18 8 -28 19 -10 10 -63 38 -118 62 -55 24 -106 49 -113 56 -13 12 -228 83 -255 83 -8 0 -17 4 -19 9 -7 22 -447 101 -557 101 -23 0 -41 5 -44 13 -5 16 -675 17 -685 0 -4 -5 -52 -13 -107 -17 -217 -16 -656 -80 -663 -98 -2 -4 -12 -8 -23 -8 -32 0 -374 -82 -379 -91 -3 -4 -26 -13 -50 -18 -25 -6 -63 -17 -85 -25 -22 -9 -45 -15 -51 -16 -7 0 -20 33 -29 73 -10 39 -21 74 -25 77 -5 5 -19 57 -68 275 -9 39 -19 72 -22 75 -4 3 -17 49 -29 103 -19 84 -31 117 -31 89z m1970 -2033 c70 -11 202 -47 210 -58 3 -3 40 -24 84 -45 43 -22 83 -48 89 -58 7 -10 16 -18 22 -18 25 -1 175 -161 204 -218 11 -22 26 -46 34 -53 28 -29 87 -214 87 -273 0 -14 5 -26 10 -26 6 0 10 -42 10 -105 0 -63 -4 -105 -10 -105 -5 0 -10 -11 -10 -24 0 -56 -59 -253 -80 -266 -4 -3 -19 -29 -34 -58 -15 -29 -38 -62 -51 -74 -14 -12 -25 -27 -25 -34 0 -7 -26 -34 -57 -61 -32 -26 -60 -51 -63 -55 -10 -13 -95 -68 -106 -68 -5 0 -20 -9 -32 -21 -28 -25 -143 -66 -240 -85 -89 -17 -246 -18 -345 -3 -71 11 -237 64 -247 79 -3 4 -30 21 -60 38 -31 17 -67 41 -80 54 -96 85 -128 117 -148 148 -13 19 -29 40 -36 45 -16 13 -86 153 -86 171 0 8 -4 14 -9 14 -12 0 -37 105 -51 210 -8 61 -8 114 -1 187 11 105 38 223 52 223 4 0 13 17 20 38 26 83 69 142 179 251 105 104 107 105 190 147 41 21 77 41 80 45 7 9 97 36 160 48 30 6 64 13 75 15 42 8 203 5 265 -5z"/>
      <path ${pathStyle} d="M3980 2128 l0 -1878 145 0 c80 0 145 4 145 9 0 4 34 11 75 14 135 12 406 76 433 104 7 7 25 16 40 20 44 11 152 61 152 71 0 6 8 12 18 15 34 12 107 57 137 85 17 16 37 33 47 38 24 13 188 171 188 181 0 5 16 26 35 47 19 21 50 66 68 100 17 33 35 63 38 66 11 9 38 66 60 127 12 32 25 60 29 63 9 8 39 139 50 227 7 50 10 522 8 1331 l-3 1252 -833 3 -832 2 0 -1877z"/>
    </g>
  </svg>`;
  return svgContent;
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

  const logoHTML = await generateLogoHTML(fields.logo, config, fields);

  const signatureHTML = `
       <div class="signature-wrapper">
           <table cellpadding="0" cellspacing="0" border="0" class="signature-table">
               <tr class="signature-main-row">
                   ${logoHTML}
                   <td class="signature-info-cell" style="border-left: ${fields.lineWidth}px solid ${fields.lineColor};">
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