// app/api/publish/route.ts — guardar DRAFT o PUBLISH en Vercel Blob
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
export const runtime = 'edge';
type Body = { key?: string; slug?: string; html?: string; mode?: 'draft' | 'publish' };

export async function POST(req: Request) {
  let body: Body = {};
  try { body = await req.json(); } catch {}
  const { key, slug, html, mode } = body;

  if (key !== process.env.PUBLISH_KEY) {
    return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  }
  if (!slug || !html || (mode !== 'draft' && mode !== 'publish')) {
    return NextResponse.json({ ok:false, error:'bad_request' }, { status:400 });
  }

  const path = mode === 'publish' ? `sites/${slug}/index.html` : `drafts/${slug}/index.html`;
  try {
    const result = await put(path, new Blob([html], { type:'text/html;charset=utf-8' }), { access:'public' });
    const base = new URL(req.url);
    base.pathname = mode === 'publish' ? '/_serve' : '/preview';
    base.search = `?slug=${encodeURIComponent(slug)}`;
    return NextResponse.json({
      ok:true,
      mode,
      [mode === 'publish' ? 'published_url' : 'preview_url']: base.toString(),
      blob: result.url
    });
  } catch (err: any) {
    return NextResponse.json({ ok:false, error:'blob_put_failed', message: String(err) }, { status:500 });
  }
}
