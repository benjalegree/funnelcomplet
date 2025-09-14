// app/_serve/route.ts — Serve published HTML from Vercel Blob (sites/{slug}/index.html)
import { NextResponse } from 'next/server';
import { get } from '@vercel/blob';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = (searchParams.get('slug') || '').trim();
  if (!slug) return new NextResponse('Missing slug', { status: 400 });

  try {
    const file = await get(`sites/${slug}/index.html`);
    const html = await (await fetch(file.url)).text();
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
