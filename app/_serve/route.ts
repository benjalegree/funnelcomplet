export const runtime = "edge";

import { list } from "@vercel/blob";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = (searchParams.get("slug") || "").toLowerCase();
  if (!slug) return new Response("Missing slug", { status: 400 });

  const key = `sites/${slug}/index.html`;
  const { blobs } = await list({ prefix: key, limit: 1 });
  if (!blobs.length) return new Response("Landing no encontrada", { status: 404 });

  const resp = await fetch(blobs[0].url);
  const html = await resp.text();
  return new Response(html, {
    headers: { "content-type": "text/html; charset=UTF-8" }
  });
}
