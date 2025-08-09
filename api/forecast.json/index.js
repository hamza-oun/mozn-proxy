// api/forecast.json/index.js
const UPSTREAM = process.env.UPSTREAM_URL || 'https://foreshadow.parabl.io/api/forecast';
const API_KEY = process.env.FORESHADOW_API_KEY || '2f04c9ea13d9529bf60694121a1012d7';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }
  try {
    // read raw body
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks).toString('utf8') || '{}';

    const upstream = await fetch(UPSTREAM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY ? { 'x-api-key': API_KEY } : {})
      },
      body: raw
    });

    const text = await upstream.text();
    res.status(upstream.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: String(err?.message || err) });
  }
}
