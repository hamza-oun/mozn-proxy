export default async function handler(req, res) {
  const apiKey = process.env.API_KEY || process.env.FORESHADOW_API_KEY;
  const origin = process.env.PROXY_ORIGIN || 'https://mozn-proxy.vercel.app';

  if (!apiKey) return res.status(403).json({ error: "Missing API key in env" });

  try {
    const r = await fetch("https://api.4shadow.io/v1/parameters", {
      headers: { "X-Api-Key": apiKey, "Origin": origin, "Accept": "application/json" }
    });
    const txt = await r.text();
    res.status(r.status).setHeader("Content-Type","application/json").send(txt);
  } catch (e) {
    res.status(500).json({ error: "Proxy request failed", details: String(e?.message||e) });
  }
}
