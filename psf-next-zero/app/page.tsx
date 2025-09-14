export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>PsicoFunnel — Proyecto Base</h1>
      <p>Listo para usar Draft/Publish y wildcard <code>*.psicofunnel.com</code>.</p>
      <ul>
        <li><a href="/publish-tester">Abrir tester</a></li>
        <li><a href="/preview?slug=demo">Ver preview (si hay draft)</a></li>
      </ul>
    </main>
  );
}
