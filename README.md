# Generador de Firmas de Correo Electrónico

Un generador web moderno y eficiente para crear firmas de correo electrónico personalizadas con soporte completo para imágenes embebidas y copiado universal.

## 🚀 Características Principales

### ✨ Generación de Firmas
- **3 tipos de firma**: Completa, Media y Corta
- **Logos personalizables**: Logo 1 (relleno sólido) y Logo 2 (contorno grueso)
- **Colores dinámicos**: Personalización de colores para logos y líneas
- **Subida de imágenes**: Soporte para logos personalizados con compresión automática

### 🎨 Elementos de Firma
- Información personal (Nombre, Cargo, Teléfono, Extensión)
- Contactos múltiples (Móvil, Móvil 2 con WhatsApp/Telegram)
- Redes sociales (Facebook, Instagram, YouTube, TikTok, Ubicación)
- Banner institucional
- Mensaje ecológico
- Líneas divisorias personalizables

### 📋 Copiado Inteligente
- **HTML embebido**: Copia firmas con imágenes base64 para compatibilidad universal
- **Texto plano**: Copia información esencial incluyendo redes sociales
- **Fallback automático**: Compatibilidad con navegadores antiguos
- **Compresión optimizada**: Reduce tamaño de firmas para mejor rendimiento

### 🎯 Compatibilidad
- **Clientes de correo**: Outlook, Gmail, Thunderbird, Apple Mail
- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, tablet, móvil
- **Accesibilidad**: Soporte para lectores de pantalla

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript ES6+** - Lógica modular
- **Canvas API** - Procesamiento de imágenes
- **Base64** - Embebido de imágenes
- **LocalStorage** - Persistencia de datos

## 📁 Estructura del Proyecto

```
Crear_Firmas/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos y temas
├── js/
│   ├── script.js       # Punto de entrada
│   ├── ui.js           # Interfaz de usuario
│   ├── generator.js    # Generación de firmas
│   ├── utils.js        # Utilidades (compresión, base64)
│   └── validation.js   # Validación de datos
├── images/             # Recursos gráficos
│   ├── logo_cip.png    # Logo por defecto
│   ├── baner_lineas.png # Banner institucional
│   └── [íconos sociales]
└── README.md           # Esta documentación
```

## 🚀 Instalación y Uso

### Opción 1: Servidor Local
```bash
# Clonar repositorio
git clone https://github.com/CarlosCus1/Crea_Firma.git
cd Crea_Firma

# Ejecutar servidor local
python -m http.server 8000

# Abrir en navegador
# http://localhost:8000
```

### Opción 2: GitHub Pages
- El proyecto está configurado para desplegarse automáticamente en GitHub Pages
- URL: `https://carloscus1.github.io/Crea_Firma/`

## 📖 Guía de Uso

1. **Configuración básica**:
   - Ingresa nombre y cargo (campos obligatorios)
   - Agrega teléfono y extensión si aplica

2. **Información de contacto**:
   - Móvil principal con opciones de WhatsApp/Telegram
   - Móvil secundario opcional
   - Enlaces a redes sociales

3. **Personalización visual**:
   - Selecciona tipo de logo (1: relleno, 2: contorno)
   - Elige colores para logo y línea divisoria
   - Ajusta ancho de línea divisoria

4. **Generación y copiado**:
   - Selecciona tipo de firma (Completa/Media/Corta)
   - Copia como HTML (para emails) o texto plano
   - La firma se pega automáticamente en cualquier cliente de correo

## 🔧 Características Técnicas

### Compresión de Imágenes
- **Redimensionamiento automático**: Máximo 90x90px manteniendo proporción
- **Compresión inteligente**: Calidad 0.7-0.8 según formato
- **Conversión SVG**: Logos vectoriales convertidos a PNG optimizado

### Copiado Avanzado
- **ClipboardItem API**: Para navegadores modernos
- **Fallback execCommand**: Compatibilidad con navegadores antiguos
- **Base64 embebido**: Imágenes incluidas en el HTML copiado

### Optimizaciones de Rendimiento
- **Lazy loading**: Carga diferida de imágenes
- **Compresión**: Reducción de tamaño de archivos
- **Cache inteligente**: Reutilización de conversiones base64

## 🎨 Personalización

### Colores del Tema
```css
:root {
  --primary-color-dark: #E0E0E0;
  --primary-color-light: #212121;
  --button-bg: #005792;
  --success-color: #4CAF50;
  /* ... más variables */
}
```

### Tipos de Logo
- **Logo 1**: Relleno sólido con color dinámico
- **Logo 2**: Contorno grueso (stroke-width: 200px) sin relleno
- **Subir imagen**: Logo personalizado con compresión automática

## 📱 Responsive Design

- **Mobile-first**: Optimizado para dispositivos móviles
- **Breakpoints**: Adaptable a diferentes tamaños de pantalla
- **Touch-friendly**: Controles optimizados para touch

## 🔒 Privacidad y Seguridad

- **Sin datos externos**: Todo funciona localmente
- **No tracking**: Sin analytics ni datos enviados
- **LocalStorage**: Datos guardados solo en el navegador
- **Base64 seguro**: Imágenes embebidas, no enlaces externos

## 🐛 Solución de Problemas

### Copiado no funciona
- **Navegadores antiguos**: Usa fallback automático
- **Permisos**: Asegura permisos de clipboard en el navegador
- **HTTPS**: Requiere conexión segura para algunas APIs

### Imágenes no se muestran
- **Formato**: Verifica formato PNG/JPG válido
- **Tamaño**: Máximo recomendado 2MB
- **Compresión**: Automática, pero puede afectar calidad extrema

### Logo borroso
- **SVG convertido**: Los logos SVG se convierten a PNG optimizado
- **Compresión**: Ajustable en `utils.js` (parámetro `quality`)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcion`)
3. Commit tus cambios (`git commit -am 'Agrega nueva función'`)
4. Push a la rama (`git push origin feature/nueva-funcion`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Carlos Cusi**
- GitHub: [@CarlosCus1](https://github.com/CarlosCus1)
- Email: [tu-email@ejemplo.com]

## 🙏 Agradecimientos

- **Potrace**: Para conversión de imágenes a SVG
- **Animate.css**: Para animaciones suaves
- **Google Fonts**: Para tipografía Roboto

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!