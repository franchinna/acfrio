# acfrio

Sitio de **acfrio** — taller especializado en aire acondicionado y calefacción para el automotor
(Lavalleja 1279, Palermo, CABA). Se trabaja en conjunto con Camila.

Es un sitio estático: HTML + CSS + JS vanilla, sin build, sin dependencias externas.
Se sube tal cual está al hosting.

## Stack

- HTML5 semántico, una sola página con anclas (`#servicios`, `#sintomas`, `#proceso`, `#taller`, `#preguntas`).
- CSS propio en `res/css/style.css` (sistema de diseño con custom properties, sin framework).
- JS vanilla en `res/js/main.js` (menú mobile, reveals, sección activa, FAB de WhatsApp).
- Datos estructurados `AutoRepair` + `WebSite` + `WebPage` en JSON-LD, dentro del `<head>` de `index.html`.

**Se removió Bootstrap y jQuery** (~450 KB que no se usaban para nada) y también las fuentes
por CDN. Las tipografías están autoalojadas en `res/fonts` (subset latin, woff2).
Los archivos de `res/bootstrap/` quedaron en el repo pero ya no se cargan: se pueden borrar.

## Tipografías

| Uso | Familia | Archivo |
|---|---|---|
| Títulos | Saira Condensed 700 | `res/fonts/saira-condensed-700.woff2` |
| Texto | Archivo (variable 100–900) | `res/fonts/archivo-var.woff2` |
| Etiquetas / datos | IBM Plex Mono 400 | `res/fonts/plex-mono-400.woff2` |

## Carpetas

```
index.html          Página principal (incluye el JSON-LD)
robots.txt          Permite rastreo + apunta al sitemap
sitemap.xml         Sitemap (actualizar <lastmod> al publicar cambios)
res/
  css/style.css     Sistema de diseño completo
  js/main.js        Interacciones
  fonts/            Tipografías autoalojadas (woff2)
  imgs/             Logo, favicon, imagen de Open Graph
  bootstrap/        LEGACY: ya no se usa, se puede eliminar
docu/               Documentación y archivos editables (Ps, Ai, XD)
admin/             A futuro: backend para editar contenidos
```

## Al editar contenido, tener en cuenta

- **Los datos del taller viven en tres lugares y tienen que coincidir:** el HTML visible
  (sección "El taller" + footer), el JSON-LD del `<head>`, y el perfil de Google Business.
  Si cambia la dirección, el teléfono o los horarios, hay que actualizar los tres.
- El `<title>` conviene mantenerlo en 50–60 caracteres y la meta description en 150–160.
- Los `data-reveal` solo ocultan contenido si el JS arrancó (clase `js` en `<html>`).
  Nunca agregar contenido importante que dependa de JS para existir.
- Al publicar cambios grandes, actualizar `<lastmod>` en `sitemap.xml`.

## Documentación

- Bootstrap (legacy): https://getbootstrap.com/
- `docu/Git.pdf`: tutorial de GIT.
- Los iconos del sitio son SVG inline dentro de `index.html` (sprite `<symbol>` al inicio del `<body>`).
