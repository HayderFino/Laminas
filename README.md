# Sitio Web Corte Láser & Láminas

Este proyecto es un sitio web estático para una empresa de servicios de corte láser y venta de materiales industriales.

## Estructura del Proyecto

- `index.html`: Página de inicio
- `nosotros.html`: Información sobre la empresa
- `servicios.html`: Detalle de servicios ofrecidos
- `productos.html`: Catálogo de productos
- `contacto.html`: Formulario de contacto y ubicación
- `cotizacion.html`: Formulario específico para cotizaciones
- `styles.css`: Estilos personalizados (con variables CSS)
- `script.js`: Lógica del frontend (navbar, validaciones, animaciones)
- `server.py`: Script de utilidad para ejecutar un servidor local

## Cómo ejecutar localmente

Para evitar problemas de recursos cruzados (CORS) y advertencias de seguridad al abrir archivos HTML directamente (`file://`), se recomienda usar un servidor local.

### Opción 1: Usando el script incluido (Recomendado)

Si tienes Python 3 instalado:

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta el script:
   ```bash
   python3 server.py
   ```
3. El navegador se abrirá automáticamente en `http://localhost:8000`.

### Opción 2: Servidor Python directo

```bash
python3 -m http.server 8000
```

## Solución de Problemas

### Error 403 en Formulario de Contacto
Si ves un error 403 al enviar el formulario de contacto, verifica lo siguiente en tu Google Apps Script:
1. Asegúrate de que el script esté desplegado como "Aplicación web".
2. En "Quién tiene acceso", debe estar seleccionado **"Cualquier persona" (Anyone)**.
3. Si cambiaste el código del script, debes crear una **nueva versión** del despliegue.

### Advertencia de "Slow Network"
Esta advertencia en la consola es normal si tienes una conexión lenta o si los recursos externos (fuentes, Bootstrap) tardan en cargar. El sitio funcionará correctamente usando fuentes del sistema como respaldo.