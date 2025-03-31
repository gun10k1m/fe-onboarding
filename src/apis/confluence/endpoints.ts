// 클라이언트에서 호출할 서버리스 API 경로
export const ConfluenceEndpoints = {
  SEARCH: (q: string) => `/api/confluence/search?q=${q}`,
  PAGE: (id: string) => `/api/confluence/page?pageId=${id}`,
};
