export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const upstreamRes = await fetch("https://foreshadow.parabl.io/api/forecast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "2f04c9ea13d9529bf60694121a1012d7"
      },
      body: JSON.stringify(req.body)
    });

    const data = await upstreamRes.json();
    res.status(upstreamRes.status).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Proxy error", details: error.message });
  }
}
