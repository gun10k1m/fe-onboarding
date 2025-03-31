// ✅ api/confluence/page.ts (Vercel Node API Route)
// import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req, res) {
  const pageId = req.query.pageId;

  if (!pageId) {
    return res.status(400).send("Missing 'pageId' query");
  }

  const email = process.env.CONFLUENCE_EMAIL;
  const token = process.env.CONFLUENCE_TOKEN;

  if (!email || !token) {
    return res.status(500).send("Missing credentials");
  }

  const auth = Buffer.from(`${email}:${token}`).toString("base64");
  const url = `https://10t1m.atlassian.net/wiki/rest/api/content/${pageId}?expand=body.view`;

  try {
    const confluenceRes = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
    });

    if (!confluenceRes.ok) {
      console.error("❌ Confluence fetch failed", await confluenceRes.text());
      return res.status(500).send("Confluence API failed");
    }

    const data = await confluenceRes.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Confluence fetch error", err);
    return res.status(500).send("Internal Server Error");
  }
}
