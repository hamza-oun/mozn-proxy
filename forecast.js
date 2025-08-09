export default async function handler(req, res) {
  const response = await fetch("https://foreshadow.parabl.io/api/forecast", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.FORESHADOW_API_KEY,
    },
    body: JSON.stringify(req.body),
  });

  const data = await response.text(); // use text to pass raw
  res.status(response.status).send(data);
}
