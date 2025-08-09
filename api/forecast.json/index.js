// api/forecast.json/index.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  try {
    // Read raw request body (works reliably on Vercel serverless)
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8') || '{}';

    const upstream = await fetch('https://foreshadow.parabl.io/api/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // use your key (or swap to process.env.FORESHADOW_API_KEY if you set it in Vercel)
        'x-api-key': '2f04c9ea13d9529bf60694121a1012d7'
      },
      body: raw
    });

    const text = await upstream.text();
    res
      .status(upstream.status)
      .setHeader('Content-Type', 'application/json')
      .send(text);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: String(err?.message || err) });
  }
}
