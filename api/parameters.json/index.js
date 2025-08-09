export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY;
  const ORIGIN = process.env.PROXY_ORIGIN || 'https://mozn-proxy.vercel.app';
  
  // Build the URL for 4Shadow
  const url = new URL('https://api.4shadow.io/v1/parameters');
  
  try {
    const upstream = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Origin': ORIGIN, // Important for domain-locked keys
        ...(API_KEY ? { 'x-api-key': API_KEY } : {})
      }
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy request failed', details: error.message });
  }
}
