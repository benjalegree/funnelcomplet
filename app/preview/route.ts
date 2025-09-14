// app/preview/route.ts — Serve draft HTML from Vercel Blob (drafts/{slug}/index.html)
import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = (searchParams.get('slug') || '').trim();
  if (!slug) return new NextResponse('Missing slug', { status: 400 });

  try {
    const { blobs } = await list({ prefix: `drafts/${slug}/index.html` });
    if (!blobs.length) return new NextResponse('Draft not found', { status: 404 });
    const html = await (await fetch(blobs[0].url)).text();
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'no-store'
      }
    });
  } catch {
    return new NextResponse('Draft not found', { status: 404 });
  }
}
