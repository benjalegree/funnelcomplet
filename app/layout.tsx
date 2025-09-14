export const metadata = { title: "PsicoFunnel" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
