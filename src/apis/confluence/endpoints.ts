export const ConfluenceEndpoints = {
  SEARCH: "/api/confluence/search",
  PAGE: (id: string) => `/api/confluence?pageId=${id}`,
};
