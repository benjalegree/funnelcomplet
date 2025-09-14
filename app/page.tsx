export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>PsicoFunnel — Publicación por Subdominios</h1>
      <p>Proyecto mínimo listo para Draft/Publish y wildcard <code>*.psicofunnel.com</code>.</p>
      <ul>
        <li><a href="/publish-tester">Tester para publicar/guardar borrador (solo pruebas)</a></li>
        <li><a href="/preview?slug=demo">Preview de ejemplo (si existe el draft)</a></li>
      </ul>
    </main>
  );
}
