// app/api/publish/route.ts — Draft/Publish HTML to Vercel Blob
import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'edge';

type Body = {
  key?: string;
  slug?: string;
  html?: string;
  mode?: 'draft' | 'publish';
};

export async function POST(req: Request) {
  const { key, slug, html, mode }: Body = await req.json().catch(() => ({} as any));

  if (key !== process.env.PUBLISH_KEY) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  if (!slug || !html || (mode !== 'draft' && mode !== 'publish')) {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const path = mode === 'publish' ? `sites/${slug}/index.html` : `drafts/${slug}/index.html`;
  await put(path, new Blob([html], { type: 'text/html;charset=utf-8' }), { access: 'public' });

  const base = new URL(req.url);
  base.pathname = mode === 'publish' ? '/_serve' : '/preview';
  base.search = `?slug=${encodeURIComponent(slug)}`;

  return NextResponse.json({
    ok: true,
    mode,
    [mode === 'publish' ? 'published_url' : 'preview_url']: base.toString()
  });
}
