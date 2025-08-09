export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  try {
    const response = await fetch('https://foreshadow.parabl.io/api/forecast', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '2f04c9ea13d9529bf60694121a1012d7'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Proxy request failed' });
  }
}
