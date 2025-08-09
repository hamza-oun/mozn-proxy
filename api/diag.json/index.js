export default function handler(req, res) {
  res.json({
    hasAPI_KEY: !!process.env.API_KEY,
    hasFORESHADOW_API_KEY: !!process.env.FORESHADOW_API_KEY,
    origin: process.env.PROXY_ORIGIN || null
  });
}
