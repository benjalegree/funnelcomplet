export const runtime = "edge";

import { put } from "@vercel/blob";

function slugify(s: string) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 63);
}

export async function POST(req: Request) {
  try {
    const { key, slug, html, mode = "draft" } = await req.json();

    if (key !== process.env.PUBLISH_KEY) {
      return new Response(JSON.stringify({ ok: false, error: "forbidden" }), { status: 403 });
    }

    const s = slugify(slug);
    if (!s || !html) {
      return new Response(JSON.stringify({ ok: false, error: "slug/html required" }), { status: 400 });
    }

    const base = mode === "publish" ? "sites" : "drafts";
    const path = `${base}/${s}/index.html`;

    const { url } = await put(path, html, {
      access: "public",
      contentType: "text/html; charset=UTF-8"
    });

    if (mode === "publish") {
      return new Response(
        JSON.stringify({ ok: true, path, url, published_url: `https://${s}.psicofunnel.com` }),
        { headers: { "content-type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ ok: true, path, url, preview_url: `/preview?slug=${encodeURIComponent(s)}` }),
        { headers: { "content-type": "application/json" } }
      );
    }
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: String(e?.message || e) }), { status: 500 });
  }
}
