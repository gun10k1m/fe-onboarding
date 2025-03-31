import { ConfluenceEndpoints } from "./endpoints";

export const fetchConfluenceSearch = async (q: string) => {
  const res = await fetch(`${ConfluenceEndpoints.SEARCH}?q=${q}`);
  if (!res.ok) throw new Error("Search fetch failed");
  return res.json();
};

export const fetchConfluencePage = async (pageId: string) => {
  const res = await fetch(ConfluenceEndpoints.PAGE(pageId));
  if (!res.ok) throw new Error("Page fetch failed");
  return res.json();
};
