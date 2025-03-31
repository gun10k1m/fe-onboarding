// Vercel API Route (api/confluence/search.ts)
// import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req, res) {
  const q = req.query.q;
  const spaceKey = "P10K1M";

  if (!q) {
    return res.status(400).send("Query is required");
  }

  const email = process.env.CONFLUENCE_EMAIL;
  const token = process.env.CONFLUENCE_TOKEN;

  if (!email || !token) {
    return res.status(500).send("Missing credentials");
  }

  const auth = Buffer.from(`${email}:${token}`).toString("base64");
  const url = `https://10t1m.atlassian.net/wiki/rest/api/content/search?cql=title~"${q}" AND space="${spaceKey}"`;

  try {
    const confluenceRes = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
    });

    const data = await confluenceRes.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Confluence fetch error", err);
    return res.status(500).send("Internal Server Error");
  }
}
