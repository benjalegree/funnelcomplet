# PsicoFunnel — Proyecto mínimo (SIN terminal)

Subí TODO este contenido a tu repo usando **GitHub Web → Add file → Upload files** en la raíz.

## Luego, en Vercel
- Project → Settings → Environment Variables (Production y Preview):
  - `PUBLISH_KEY = psico_pub_galo_millonario`

## Qué incluye
- `package.json`, `next.config.mjs`, `tsconfig.json`, `next-env.d.ts`
- `app/layout.tsx`, `app/page.tsx`
- `middleware.ts`
- `app/api/publish/route.ts`, `app/_serve/route.ts`, `app/preview/route.ts`

Con esto, Vercel va a hacer build solo. Después podés usar:
- POST `/api/publish` (draft/publish)
- `https://TU_DOMINIO/preview?slug=demo`
- `https://TU_DOMINIO/_serve?slug=demo`
- y, con wildcard DNS, `https://demo.psicofunnel.com`
