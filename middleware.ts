// middleware.ts — PsicoFunnel (wildcard subdomains -> /_serve?slug=...)
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';
  const parts = host.split('.');
  const isRoot = host.endsWith('psicofunnel.com') && parts.length === 2;
  const isSub  = host.endsWith('psicofunnel.com') && parts.length > 2;

  if (isSub) {
    const slug = parts[0];
    const url = req.nextUrl.clone();
    url.pathname = '/_serve';
    url.searchParams.set('slug', slug);
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
