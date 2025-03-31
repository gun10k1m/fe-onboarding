// ✅ api/confluence/search.ts (Vercel API Route)

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const spaceKey = "P10K1M";

  if (!query) {
    return new Response("Missing 'q' query", { status: 400 });
  }

  const response = await fetch(
    `https://10t1m.atlassian.net/wiki/rest/api/content/search?cql=title~"${query}" AND space="${spaceKey}"`,
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
