import { NextRequest, NextResponse } from "next/server";

export const config = { matcher: ["/:path*"] };

export default function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  if (host.endsWith("psicofunnel.com")) {
    const sub = host.replace(".psicofunnel.com", "").replace(/^www\./, "");

    // Para subdominios tipo tumarca.psicofunnel.com
    if (sub && sub !== "psicofunnel") {
      const url = req.nextUrl.clone();
      url.pathname = "/_serve";           // ruta interna
      url.searchParams.set("slug", sub);  // pasamos el subdominio
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
