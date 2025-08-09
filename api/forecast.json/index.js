export default async function handler(req, res) {
  const apiKey = process.env.API_KEY || process.env.FORESHADOW_API_KEY;
  const origin = process.env.PROXY_ORIGIN || 'https://mozn-proxy.vercel.app';

  if (!apiKey) return res.status(403).json({ error: "An API Key is required to make this request" });
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const r = await fetch("https://api.4shadow.io/v1/forecast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
        "Origin": origin,
        "Accept": "application/json"
      },
      body: JSON.stringify(req.body || {})
    });
    const txt = await r.text();
    res.status(r.status).setHeader("Content-Type","application/json").send(txt);
  } catch (e) {
    res.status(500).json({ error: "Proxy request failed", details: String(e?.message||e) });
  }
}
