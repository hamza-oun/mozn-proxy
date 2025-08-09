export default async function handler(req, res) {
  const apiKey = process.env.API_KEY;
  const origin = process.env.PROXY_ORIGIN || req.headers.origin || "";

  if (!apiKey) {
    return res.status(403).json({ error: "An API Key is required to make this request" });
  }

  try {
    const response = await fetch("https://api.4shadow.io/v1/parameters", {
      headers: {
        "X-Api-Key": apiKey,
        "Origin": origin,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Proxy request failed", details: err.message });
  }
}
