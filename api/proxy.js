export default async function handler(req, res) {
  const gasUrl = "https://script.google.com/macros/s/AKfycbz2W0zMmtUhm8bW2Opb9OpTb_s1P8tOSaCO_HnWMq94fx5125mLFTDnYUpdvqjgugzX/exec";

  const url =
    req.method === "GET"
      ? `${gasUrl}?${new URLSearchParams(req.query)}`
      : gasUrl;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        req.method === "POST"
          ? JSON.stringify(req.body)
          : undefined,
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy error" });
  }
}
