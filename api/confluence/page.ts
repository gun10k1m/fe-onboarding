// ✅ api/confluence/page.ts (Vercel API Route)

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get("pageId");

  if (!pageId) {
    return new Response("Missing 'pageId' query", { status: 400 });
  }

  const response = await fetch(
    `https://10t1m.atlassian.net/wiki/rest/api/content/${pageId}?expand=body.view`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.CONFLUENCE_EMAIL}:${process.env.CONFLUENCE_TOKEN}`
        ).toString("base64")}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    return new Response("Confluence API failed", { status: 500 });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}
