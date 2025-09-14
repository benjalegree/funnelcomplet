export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", lineHeight: 1.6 }}>
      <h1>PsicoFunnel</h1>
      <p>Wildcards listos. Este proyecto sirve cada landing según el subdominio.</p>
      <ol>
        <li>Make guarda <code>drafts/SLUG/index.html</code> (borrador).</li>
        <li>Al publicar, guarda <code>sites/SLUG/index.html</code>.</li>
        <li>Entrando a <code>https://SLUG.psicofunnel.com</code> se sirve la landing publicada.</li>
      </ol>
      <p>
        Preview de borradores: <code>/preview?slug=SLUG</code>
      </p>
    </main>
  );
}
