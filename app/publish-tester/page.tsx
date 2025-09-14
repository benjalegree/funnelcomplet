'use client'
import { useState } from 'react';

export default function PublishTester() {
  const [slug, setSlug] = useState('demo');
  const [mode, setMode] = useState<'draft'|'publish'>('draft');
  const [key, setKey] = useState('');
  const [html, setHtml] = useState('<!doctype html><html><body><h1>Hola PsicoFunnel</h1><p>Versión de prueba.</p></body></html>');
  const [out, setOut] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOut(null);
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, slug, html, mode })
      });
      const json = await res.json();
      setOut({ status: res.status, ...json });
    } catch (err: any) {
      setError(err?.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 860, margin: '40px auto', padding: '0 16px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Tester de Publicación — PsicoFunnel</h1>
      <p style={{ color: '#555' }}>Usa este formulario para <b>guardar borradores</b> o <b>publicar</b> tu HTML en Vercel Blob y probar las rutas sin terminal.</p>
      <div style={{ padding: 12, background: '#fff8e1', border: '1px solid #ffecb3', borderRadius: 8, marginBottom: 16 }}>
        <b>Seguridad:</b> El campo <code>PUBLISH_KEY</code> es sensible. Úsalo solo para pruebas y <b>borra esta página</b> cuando termines.
      </div>

      <form onSubmit={send} style={{ display: 'grid', gap: 12 }}>
        <label>
          <div>Slug (subdominio)</div>
          <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="ej: demo" required
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
        </label>

        <label>
          <div>Modo</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <label><input type="radio" name="mode" checked={mode==='draft'} onChange={() => setMode('draft')} /> Draft</label>
            <label><input type="radio" name="mode" checked={mode==='publish'} onChange={() => setMode('publish')} /> Publish</label>
          </div>
        </label>

        <label>
          <div>PUBLISH_KEY (la que configuraste en Vercel)</div>
          <input value={key} onChange={e => setKey(e.target.value)} placeholder="psico_pub_galo_millonario" required
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc' }} />
        </label>

        <label>
          <div>HTML a guardar</div>
          <textarea value={html} onChange={e => setHtml(e.target.value)} rows={12}
            style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ccc', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }} />
        </label>

        <button type="submit" disabled={loading}
          style={{ padding: '12px 16px', borderRadius: 10, border: 'none', background: '#0ea5e9', color: 'white', fontWeight: 700, cursor: 'pointer' }}>
          {loading ? 'Enviando…' : (mode === 'draft' ? 'Guardar DRAFT' : 'PUBLICAR')}
        </button>
      </form>

      {!!error && <p style={{ color: 'crimson', marginTop: 16 }}>⚠️ {error}</p>}
      {!!out && (
        <div style={{ marginTop: 20, padding: 12, background: '#f3f4f6', borderRadius: 8 }}>
          <div><b>Status:</b> {out.status}</div>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{JSON.stringify(out, null, 2)}</pre>
          {out.preview_url && <p><a href={out.preview_url} target="_blank" rel="noreferrer">Abrir preview</a></p>}
          {out.published_url && <p><a href={out.published_url} target="_blank" rel="noreferrer">Abrir publicado</a></p>}
        </div>
      )}
    </main>
  );
}
