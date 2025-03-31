export const formatTitle = (title: string): string => {
  const cleaned = title.replace(/\[.*?\]\s*/, ""); // [Frontend] 제거
  const match = cleaned.match(/^(.+?)\s+service/i); // "service"에서 앞부분만 추출
  return match ? match[1].toLocaleUpperCase() : cleaned.toLocaleUpperCase();
};
