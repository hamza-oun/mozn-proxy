const BASE = process.env.UPSTREAM_BASE || 'https://api.4shadow.io/v1';
const API_KEY = process.env.FORESHADOW_API_KEY || '';

export default async function handler(req, res) {
  try {
    const url = new URL('/parameters', BASE);
    if (API_KEY) url.searchParams.set('api-key', API_KEY);

    const upstream = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
    const text = await upstream.text();

    res.status(upstream.status)
       .setHeader('Content-Type', 'application/json')
       .send(text);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
}
