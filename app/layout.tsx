export const metadata = { title: 'PsicoFunnel', description: 'Publicación por subdominios' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background:'#f7fafc' }}>{children}</body>
    </html>
  );
}
