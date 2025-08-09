export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;
  const ORIGIN = process.env.PROXY_ORIGIN || 'https://mozn-proxy.vercel.app';

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Only POST requests are allowed' });
    return;
  }

  try {
    const body = req.body;
    const upstream = await fetch('https://api.4shadow.io/v1/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': ORIGIN, // Important for domain-locked keys
        ...(API_KEY ? { 'x-api-key': API_KEY } : {})
      },
      body: JSON.stringify(body)
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy request failed', details: error.message });
  }
}

