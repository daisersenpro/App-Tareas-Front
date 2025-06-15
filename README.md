# GestorTareasFront

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.9.

## Integración de Bootstrap

Para usar los estilos de [Bootstrap](https://getbootstrap.com/) globalmente en este proyecto:

1. Instala Bootstrap con npm:
   ```bash
   npm install bootstrap
   ```
2. Agrega la ruta del CSS de Bootstrap en el arreglo `styles` del archivo `angular.json`:
   ```json
   "styles": [
     "node_modules/bootstrap/dist/css/bootstrap.min.css",
     "src/styles.css"
   ]
   ```
   > **Nota:** Los archivos JSON no permiten comentarios. Documenta cualquier cambio importante en este README.

3. Si el servidor de desarrollo estaba corriendo, reinícialo para que tome los cambios.

## Problema y solución con assets en Angular

**¿Qué hicimos?**

- Corregimos la configuración de `assets` en `angular.json`:
  - Antes, el proyecto buscaba archivos estáticos en una carpeta llamada `public`, que no existía ni usabas.
  - Cambiamos la configuración para que Angular copie todo lo que está en `src/assets` (y el favicon) al directorio de salida (`dist`) cuando compila o sirve la app.

- Reiniciamos el servidor de Angular:
  - Cuando cambias la configuración de `angular.json`, Angular necesita que reinicies el servidor (`ng serve`) para aplicar los cambios.
  - Al reiniciar, Angular ahora sí copió correctamente la carpeta `src/assets` (y tu imagen) al build, y la imagen estuvo disponible en la ruta `assets/SenProLogo.png`.

**¿Por qué no funcionaba antes?**

- Angular no encontraba la imagen porque nunca la copiaba al build, ya que la configuración de `assets` apuntaba a una carpeta equivocada (`public`).
- Aunque la imagen estaba en `src/assets`, Angular solo copia lo que le indicas en `angular.json`.
- El reinicio del servidor fue necesario para que Angular leyera la nueva configuración.

**Resumen**
- Configuración correcta en `angular.json` → Angular sabe de dónde copiar los archivos estáticos.
- Reiniciar el servidor → Angular aplica la nueva configuración y copia los archivos correctamente.

## Ediciones comunes en `angular.json`

- **Agregar estilos globales:** Usa el arreglo `styles` como se muestra arriba.
- **Agregar scripts globales:** Usa el arreglo `scripts` para librerías JS externas (por ejemplo, jQuery, Popper).
- **Assets:** El arreglo `assets` es para archivos estáticos (imágenes, fuentes, etc.).
- **Polyfills:** Para compatibilidad con navegadores antiguos, edita el arreglo `polyfills`.

## Servidor de desarrollo

Para iniciar el servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Una vez iniciado, abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente cada vez que modifiques los archivos fuente.

## Generación de código

Angular CLI incluye herramientas para generar código automáticamente. Para crear un nuevo componente, ejecuta:

```bash
ng generate component nombre-del-componente
```

Para ver la lista completa de esquemas disponibles (como `components`, `directives` o `pipes`), ejecuta:

```bash
ng generate --help
```

## Compilar el proyecto

Para compilar el proyecto ejecuta:

```bash
ng build
```

Esto compilará tu proyecto y guardará los archivos en la carpeta `dist/`. Por defecto, la compilación en modo producción optimiza tu aplicación para mayor rendimiento y velocidad.

## Ejecutar pruebas unitarias

Para ejecutar pruebas unitarias con [Karma](https://karma-runner.github.io), usa el siguiente comando:

```bash
ng test
```

## Pruebas end-to-end

Para pruebas end-to-end (e2e), ejecuta:

```bash
ng e2e
```

Angular CLI no incluye un framework de pruebas e2e por defecto. Puedes elegir el que mejor se adapte a tus necesidades.

## Recursos adicionales

Para más información sobre Angular CLI y referencias detalladas de comandos, visita