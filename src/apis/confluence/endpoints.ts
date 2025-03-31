const getBaseUrl = () => {
  return import.meta.env.DEV
    ? "/api/confluence" // ✅ 로컬 개발 서버 → 프록시 사용
    : import.meta.env.VITE_CONFLUENCE_API; // ✅ 배포 시 → 직접 호출
};

export const ConfluenceEndpoints = {
  SEARCH: (q: string) => `${getBaseUrl()}/search?q=${q}`,
  PAGE: (id: string) => `${getBaseUrl()}/page?pageId=${id}`,
};
