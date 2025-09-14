# PsicoFunnel — Proyecto COMPLETO listo para subir (sin terminal)
Subí TODO este contenido a la **raíz** del repo desde GitHub Web (Add file → Upload files).

## Qué hace
- `/api/publish` guarda borradores o publica HTML en Vercel Blob.
- `/preview?slug=...` muestra borradores (noindex).
- `/_serve?slug=...` muestra publicados.
- `middleware.ts` habilita `https://{slug}.psicofunnel.com` (wildcard).

## Requisito en Vercel
- Variables de entorno (Production y Preview):
  - `PUBLISH_KEY = psico_pub_galo_millonario`

## Probar sin terminal
- Abrí `/publish-tester` en tu dominio y usá el formulario para crear `draft` o `publish`.
- Luego:
  - Draft: `https://TU_DOMINIO/preview?slug=demo`
  - Publish: `https://TU_DOMINIO/_serve?slug=demo` y `https://demo.psicofunnel.com`

## Importante
- Esta carpeta ya incluye `package.json` (Next 14 + React + @vercel/blob) y TypeScript en devDependencies.
- Si tu repo tenía otros archivos, dejalos. Vercel usará este `package.json` para construir.
- Cuando termines las pruebas, borra la página `/publish-tester`.
